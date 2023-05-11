window.onload = () => {
    fetchData();
}

function fetchData() {

    console.log(arguments.callee.caller)
    fetch("/getData")
        .then((response) => response.json())
        .then((info) => {
            for (chunk in info) {
                console.log(info[chunk]);
                createNote(info[chunk]);
            }
        })
}
//add note button
var launcher = document.getElementById("appendNote");

//main div
var container = document.getElementById("main");

//textarea where new note added
var noteInput = document.getElementById("noteInput");

function deleteNote(f) {
    const id = f.target.parentElement.id;
    console.log(id)
    fetch(`/deleteData/${id}`, {
        method: "DELETE"
    }).then((response) => {
        if (response.ok) {
            console.log("deleted sucessfully");
        }
        else {
            console.log("error deleting")
        }
    }).catch(() => {
        console.log("Error occurred");
    })
    container.removeChild(f.target.parentElement)
}

function createDeleteButton() {
    // delete note button
    var delButton = document.createElement("img")
    delButton.setAttribute("src", "bin.png")
    delButton.addEventListener("click", deleteNote)
    delButton.style.width = "59px"
    delButton.style.height = "54px"
    delButton.style.backgroundColor = "#fef68a"
    return delButton
}

// called when user done writing new note
function createNote(data) {
    //note parent element
    var note = document.createElement("div")
    note.setAttribute("class", "Note")

    note.setAttribute("id", `${data['_id']}`);

    //append the data the which received when user pressed add note
    note.innerHTML = data["data"];

    var delButton = createDeleteButton();
    // appending the elements created
    note.appendChild(delButton)
    container.prepend(note);
    updateNote(note, delButton)
}

function updateNote(elem, delButton) {
    // adding click listener on the already present note in-order to update functionality
    elem.addEventListener("click", function (e) {
        e.stopPropagation()
        // content initially present inside the note 
        content = e.target.innerText;

        // making the content editable
        var inputBox = document.createElement("textarea");
        inputBox.setAttribute("cols", "30");
        inputBox.setAttribute("rows", "10");
        var launcherButton = document.createElement("button");
        launcherButton.innerHTML = "update"
        e.target.innerHTML = "";
        inputBox.value = content;
        e.target.appendChild(inputBox);
        e.target.appendChild(launcherButton)
        e.target.style.backgroundColor = "black"

        // auto focus when clicked on the note
        e.target.firstChild.focus()

        // implementing click event on the update button
        launcherButton.addEventListener("click", function () {

            var localData = inputBox.value;
            e.target.innerHTML = localData;
            e.target.style.backgroundColor = "#fef68a"
            console.log(localData)

            fetch(`updateData/${e.target.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ data: localData })
            }).then((response) => {
                if (response.ok) {
                    console.log("Updated Successfully");
                }
                else {
                    console.log("error occurred");
                }
            })

            delButton.addEventListener("click", deleteNote)
            delButton.style.width = "59px"
            delButton.style.height = "54px"
            delButton.style.backgroundColor = "#fef68a"
            e.target.appendChild(delButton)
        })
    }
    )
}
// add note button click event 
launcher.addEventListener("click", function (e) {
    var data = {
        content: noteInput.value,
    }

    noteInput.value = "";
    if (data['content'] != "") {
        fetch("/postData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((res) => {
            createNote(res)
        })

    }
})


//add note button
var launcher = document.getElementById("appendNote");

//main div
var container = document.getElementById("main");

//textarea where new note added
var noteInput = document.getElementById("noteInput");

// called when user done writing new note
function createNote(data) {
    if (data['content'] == "") {
        return -1;
    }
    //note parent element
    var note = document.createElement("div")
    note.setAttribute("class", "Note")

    // we'll use in put api call 
    var index = (Array.from(document.getElementsByClassName("Note"))).length + 1;
    data["_id"] = index
    note.setAttribute("id", `${index}`);

    //append the data the which received when user pressed add note
    note.innerHTML = `<pre>${data["content"]}</pre>`;

    // delete note button
    var delButton = document.createElement("img")
    delButton.setAttribute("src", "bin.png")
    delButton.addEventListener("click", function (f) {
        container.removeChild(f.target.parentElement)
    })
    delButton.style.width = "59px"
    delButton.style.height = "54px"
    delButton.style.backgroundColor = "#fef68a"

    // appending the elements created
    note.appendChild(delButton)
    container.prepend(note);


    // adding click listener on the already present note in-order to update functionality
    note.addEventListener("click", function (e) {

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
        launcherButton.addEventListener("click", function (f) {
            var localData = inputBox.value;
            e.target.innerHTML = localData;
            e.target.style.backgroundColor = "#fef68a"
            delButton.addEventListener("click", function (g) {
                console.log(g.target.parentElement)
                container.removeChild(g.target.parentElement);
            })
            delButton.style.width = "59px"
            delButton.style.height = "54px"
            delButton.style.backgroundColor = "#fef68a"
            e.target.appendChild(delButton)
        })
    })
}

// add note button click event 
launcher.addEventListener("click", function (e) {
    var data = {
        content: noteInput.value
    }
    noteInput.value = "";
    if (createNote(data) == -1) {
        alert("Please enter text first")
    }
})


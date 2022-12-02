const { Observable, fromEvent } = rxjs;
const noteContainer = document.getElementById("application");
const addNoteButton = noteContainer.querySelector(".add-note");


getNote().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addNoteButton);
});

const addNoteButtonObservable = fromEvent(addNoteButton, 'click');
const addNotebuttonSubscriber = addNoteButtonObservable.subscribe(addNote);
//addNoteButton.addEventListener("click", () => addNote());

function getNote() {
    return JSON.parse(localStorage.getItem("Note taking app") || "[]");
}

function saveNote(notes) {
    localStorage.setItem("Note taking app", JSON.stringify(notes));
}

function createNoteElement(id, content){
    const box = document.createElement("div");
    const element = document.createElement("textarea");
    const deleteElement = document.createElement("button");
    const redbuttn = document.createElement("button");
    const bluebuttn = document.createElement("button");
    const greenbuttn = document.createElement("button");
    redbuttn.classList.add("red");
    bluebuttn.classList.add("blue");
    greenbuttn.classList.add("green");
    deleteElement.innerHTML = "delete";
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Please fill in note";
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    //const deleteElement = fromEvent (deleteElement, 'click').subscribe (() => )
    deleteElement.addEventListener("click", () => {
       const doDelete = confirm("are you sure you want to delete this note?");
       if (doDelete){
        deleteNote(id, box);
       }
    });

    //let rdbtn = document.getElementById("red")
    const rxjsrdbtn = fromEvent(redbuttn, 'click').subscribe (() => addColor("red", element))
    //redbuttn.addEventListener("click", () => {
      //  addColor("red", element);
     //});

     const rxjsblbtn = fromEvent(bluebuttn, 'click').subscribe (() => addColor("blue", element))
     //bluebuttn.addEventListener("click", () => {
       // addColor("blue", element);
     //});

     const rxjsgnbtn = fromEvent(greenbuttn, 'click').subscribe (() => addColor("green", element))
     //greenbuttn.addEventListener("click", () => {
       // addColor("green", element);
     //});

    box.appendChild(element);
    box.appendChild(deleteElement);
    box.appendChild(redbuttn);
    box.appendChild(bluebuttn);
    box.appendChild(greenbuttn);
    return box;
    
}


function addNote(){
    const notes = getNote();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    noteContainer.insertBefore(noteElement, addNoteButton);
    notes.push(noteObject);
    saveNote(notes);
}

function updateNote(id, newContent){
    const notes = getNote();
    const tergetNote = notes.filter((note) => note.id == id)[0];
    tergetNote.content = newContent;
    saveNote(notes);
}

function deleteNote(id, element){
    const notes = getNote().filter((note) => note.id != id);
    saveNote(notes);
    noteContainer.removeChild(element);
}

function addColor(color, element) {
    element.className = "note " + color + "box";
}

// ================= THEME CHANGE =================

let changeTheme = document.querySelector('#change-theme');

function theme() {

    let red = Math.floor(Math.random() * 256);

    let green = Math.floor(Math.random() * 256);

    let blue = Math.floor(Math.random() * 256);

    document.body.style.backgroundColor =
        `rgb(${red}, ${green}, ${blue})`;
}

changeTheme.addEventListener("click", theme);


// ================= RESET THEME =================

let reset = document.querySelector('#reset');

reset.addEventListener("click", () => {

    document.body.style.backgroundColor = "white";

});


// ================= TODAY DATE =================

let inputdate = document.querySelector('#input-date');

let today = new Date().toISOString().split('T')[0];

inputdate.value = today;


// ================= NOTES SECTION =================

let input = document.querySelector('#input');

let date = document.querySelector('#date');

let btnAdd = document.querySelector('#btnAdd');

let cardContainer = document.querySelector('.card-container');

date.value = today;


// ================= NOTES ARRAY =================

let notes = [];


// ================= CREATE CARD FUNCTION =================

function createCard(text, noteDate, index) {

    let cardDiv = document.createElement('div');

    cardDiv.classList.add('card');

    cardDiv.innerHTML = `
    
    <button class="card-delete">X</button>

    <h2>${text}</h2>

    <small>${noteDate}</small>
    
    `;

    cardContainer.appendChild(cardDiv);


    // delete button
    let btnDel = cardDiv.querySelector('.card-delete');

    btnDel.addEventListener("click", () => {

        // remove from UI
        cardDiv.remove();

        // remove from array
        notes.splice(index, 1);

        // update local storage
        localStorage.setItem("notes", JSON.stringify(notes));

    });

}


// ================= ADD NOTE FUNCTION =================

function addNote() {

    let inputvalue = input.value;

    let selectedDate = date.value;


    // validation
    if (inputvalue === '') {

        alert("Please enter a note");

        return;
    }


    // note object
    let note = {

        text: inputvalue,

        date: selectedDate

    };


    // push into array
    notes.push(note);


    // save into local storage
    localStorage.setItem("notes", JSON.stringify(notes));


    // create card
    createCard(inputvalue, selectedDate, notes.length - 1);


    // clear input
    input.value = '';

}


// ================= BUTTON EVENT =================

btnAdd.addEventListener("click", addNote);


// ================= LOAD NOTES AFTER REFRESH =================

let storedNotes = localStorage.getItem("notes");

if (storedNotes) {

    let parsedNotes = JSON.parse(storedNotes);

    notes = parsedNotes;


    for (let i = 0; i < parsedNotes.length; i++) {

        createCard(

            parsedNotes[i].text,

            parsedNotes[i].date,

            i

        );

    }

}
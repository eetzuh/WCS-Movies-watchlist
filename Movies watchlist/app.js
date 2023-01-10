let arrayOfMovies = [
  {
    watched: false,
    name: "Gladiator",
    year: 2000,
    country: "USA",
    comment: "",
    actors: ["Russel C.", "Joaquin P."],
  },
  {
    watched: false,
    name: "Reservoir Dogs",
    year: 1992,
    country: "USA",
    comment: "",
    actors: ["Harvey K.", "Tim R."],
  },
  {
    watched: false,
    name: "City of God",
    year: 2002,
    country: "Brazil",
    comment: "",
    actors: ["Alexandre R.", "Leandro F."],
  },
];

/*funkcija koja dodaje filmove u tabelu, čitajući objekte sa niza arrayOfMovies, koji čuva podatake o svakom filmu prikazanog u tabeli. Poziva se na onload, da bi se hardkodovani filmovi odmah prikazali u tabeli.
Kikom na dugme "dodaj" poslije unosa podataka u formi (funkcija addMovie(), linija 97), film se dodaje u niz, pa se zatim poziva funkcija printMovies().
Varijabla movieNum čita zadnji indeks objekta film, koji je dodat u niz arrayOfMovies, da bi pri pozivu funkcije printMovies()
u tabelu ne bi bili dodati prethodni. */

let movieNum = 0;
function printMovies() {
  let tableBody = document.getElementById("tableBody");
  let row = tableBody.insertRow();
  for (let i = movieNum; i < arrayOfMovies.length; i++) {
    let cell = row.insertCell();
    cell.classList = "align-middle";
    if (arrayOfMovies[i].watched == true) {
      check = `<input onclick="changeColor()" type="checkbox" name='watched' checked>`;
    } else {
      check = `<input onclick="changeColor()" type="checkbox" name='watched'>`;
    }
    cell.innerHTML += check;
    for (let j = 1; j < Object.keys(arrayOfMovies[i]).length; j++) {
      cell = row.insertCell();
      cell.classList = "align-middle";
      cell.innerHTML += Object.values(arrayOfMovies[i])[j];
    }
    row = tableBody.insertRow();
  }
  movieNum = arrayOfMovies.length;
  changeColor();
}

/* funkcija koja mijenja boju reda, u kojem je checkbox sa id 'watched' označen.*/
function changeColor() {
  let elements = document.getElementsByName("watched");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked == true) {
      arrayOfMovies[i].watched = true;
      elements[i].parentElement.parentElement.style =
        "background-color:#D1E7DD";
    } else {
      arrayOfMovies[i].watched = false;
      elements[i].parentElement.parentElement.style =
        "background-color:#F8D7DA";
    }
  }
}

const forms = document.querySelectorAll(".needs-validation");

function validate() {
  Array.from(forms).forEach(function (form) {
    form.addEventListener("submit",function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },false);
  });
}

/*funkcija koja omogućava dodavanje filma pritiskom na dugme samo u slučaju kada su sva polja pravilno ispunjena*/
let successfulInput="no"
function checkVal() {
  validate();
  if (Array.from(forms).every((form) => form.checkValidity() == true)) {
    successfulInput="yes"
  }
}

/*funkcija koja ukoliko su sva polja pravilno ispunjena, dodaje unesene podatke filma u niz arrayOfMovies, zatim poziva funkciju printMovies(), koja ga dodaje u tabelu*/
function addMovie() {
  checkVal()
  let userInputs = {
    watched: document.getElementById("movieWatched").checked,
    name: document.getElementById("movieName").value,
    year: parseInt(document.getElementById("movieYear").value),
    country: document.getElementById("movieCountry").value,
    comment: document.getElementById("movieCom").value,
    actors: document.getElementById("movieActors").value.split(","),
  };
  if(successfulInput=="yes"){
    arrayOfMovies.push(userInputs);
    printMovies();
    /*ovo služi da polja forme u modalnom prozoru budu prazna poslije dodavanja novog filma*/
    userInputs = {
      watched: document.getElementById("movieWatched").checked = false,
      name: document.getElementById("movieName").value = "",
      year: document.getElementById("movieYear").value = "",
      country: document.getElementById("movieCountry").value = "",
      comment: document.getElementById("movieCom").value = "",
      actors: document.getElementById("movieActors").value = "",
    };
    successfulInput="no"
  }
}

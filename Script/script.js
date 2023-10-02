//let tempMin, tempMax, probaPluie, heuresSoleil; //Variables stockant le retour des APIs
let cp, ville;
let cpChamp = document.getElementById("codeP");
let villeChamp = document.getElementById("codeVille");

document.getElementById("boutonEffacer").addEventListener("click", viderChamps);


//Vide les champs sur appui du bouton Effacer
function viderChamps() {
    chTempMin.textContent = "";
    chTempMax.textContent = "";
    chProbaPluie.textContent = "";
    chHeuresSoleil.textContent = "";
    //tempMin, tempMax, probaPluie, heuresSoleil = "";
}

//main

function retourneComune(cPostal) {
    let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=' + cPostal);
    let listeDeroulante = document.getElementById("listeVilles");
    listeDeroulante.length=1;
    commune
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length >= 1) {
                data.forEach(valeur => {
                    let option = document.createElement("option");
                    option.textContent = valeur.nom;
                    option.value = valeur.code;
                    listeDeroulante.appendChild(option);
                    console.log("ville " + option.textContent + " insee " + option.value);
                });
            }
        });
}

function affichage() {
    retourneComune(document.getElementById("codePostalForm").value);
}

document.getElementById("codePostalForm").onchange = function () { affichage() };

// Info Météo

function afficherMeteo(insee) {

    const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";
    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=` + insee;

    fetch(url).then(response =>
        response.json().then(data => {
            console.log(data);

            document.getElementById("insee").innerHTML = data.city.name;
            document.getElementById("pluie").innerHTML = data.forecast[0].probarain + "%";
            document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
            document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
        })
    );
}

document.getElementById("listeVilles").onchange = function () {
    var selectElmt = document.getElementById("listeVilles");
    var valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
    afficherMeteo(valeurselectionnee);
}
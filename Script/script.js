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



// Info Météo
const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";

/*document.querySelector('#codepostal').addEventListener('input', function() {

    if(this.value.length == 5){
    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=${this.value}`;

    fetch(url).then(response => 
        response.json().then(data => {
            console.log(data);
                document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
            })
        );
    }
});*/

affichageMeteo();

function affichageMeteo() {

    var codeInsee = 27367;

    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=${codeInsee}`;


    fetch(url).then(response =>
        response.json().then(data => {

            document.getElementById("insee").innerHTML = data.city.name;
            document.getElementById("pluie").innerHTML = data.forecast[0].probarain + "%";
            document.getElementById("heuresSoleil").innerHTML = data.forecast[0].sun_hours;
            document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
            document.getElementById("tmax").innerHTML = data.forecast[0].tmax;

            var x = 110;//data.forecast[0].weather
            switch (true) {

                case 0:
                    document.getElementById("temps").innerHTML = "Ensoleillé";
                    break;

                case 1:
                    document.getElementById("temps").innerHTML = "Peu nuageux";
                    break;

                case (x >= 3) && (x <= 5):
                    document.getElementById("temps").innerHTML = "Nuageux";
                    break;
                case (x >= 6) && (x <= 7):
                    document.getElementById("temps").innerHTML = "Brouillard";
                    break;

                case (x >= 10) && (x <= 12):
                    document.getElementById("temps").innerHTML = "Pluie";
                    break;

                case (x >= 20) && (x <= 22):
                    document.getElementById("temps").innerHTML = "Neige";
                    break;

                case (x >= 30) && (x <= 32):
                    document.getElementById("temps").innerHTML = "Pluie et Neige";
                    break;

                case (x >= 40) && (x <= 78):
                    document.getElementById("temps").innerHTML = "Averses";
                    break;

                case (x >= 100) && (x <= 138):
                    document.getElementById("temps").innerHTML = "Orage";
                    break;
            }
        })
    );
}
>>>>>>> origin/newHTML
//main

function retourneComune(cPostal) {
    let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=' + cPostal);
    let listeDeroulante = document.getElementById("listeVilles");
    listeDeroulante.length = 1;
    commune
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length >= 1) {
                data.forEach(valeur => {
                    let option = document.createElement("option");
                    option.textContent = valeur.nom;
                    option.value = valeur.code;
                    listeDeroulante.appendChild(option);
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
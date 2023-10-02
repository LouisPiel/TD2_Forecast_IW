//let tempMin, tempMax, probaPluie, heuresSoleil; //Variables stockant le retour des APIs
let cp, ville;
let cpChamp = document.getElementById("codeP");
let villeChamp = document.getElementById("codeVille");

//document.getElementById("boutonValider").addEventListener("click", remplirChamps);
document.getElementById("boutonEffacer").addEventListener("click", viderChamps);
/*
//Rempli les champs sur appui du bouton Valider
function remplirChamps()
{
    //TO DO : Récupérer les valeurs venant des APIs
    chTempMin.textContent = tempMin + " °C";
    chTempMax.textContent = tempMax + " °C";
    chProbaPluie.textContent = probaPluie + " %";
    chHeuresSoleil.textContent = heuresSoleil + "h";
}*/

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

let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=61100`;

fetch(url).then(response =>
    response.json().then(data => {
        console.log(data);

        document.getElementById("insee").innerHTML = data.city.name;
        document.getElementById("pluie").innerHTML = data.forecast[0].probarain + "%";
        document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
        document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
    })
);

//main

function retourneComune(cPostal) {
    let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=' + cPostal);
    let listeDeroulante = document.getElementById("listeVilles");
    commune
        .then((response) => response.text())
        .then((text) => {
            let texteSeparerNomCommune = text.split(",");
            let compteur = 0;
            let ville;
            texteSeparerNomCommune.forEach(element => {
                if (compteur % 8 == 0) {
                    ville = element.split("\"");
                    var option = document.createElement("option");
                    let val = ville[3];
                    option.text = val.charAt(0).toUpperCase() + val.slice(1);
                    let insee = fetch('https://geo.api.gouv.fr/communes?nom=' + ville[3] + '&fields=departement&limit=5');
                    insee
                        .then((response) => response.text())
                        .then((text) => {
                            let texteSeparerCodeInsee = text.split(",");
                            let compteurTemp = 0;
                            let codeInsee;
                            texteSeparerCodeInsee.forEach(element => {
                                if (compteurTemp % 5 == 1) {
                                    codeInsee = element.split("\"");
                                    let code = codeInsee[3];
                                    option.value = code;
                                }
                                compteurTemp++;
                            });
                        });
                    listeDeroulante.appendChild(option);
                }
                compteur++;
            });
        });
}



function affichage() {
    retourneComune(document.getElementById("codePostalForm").value);
}

document.getElementById("codePostalForm").onchange = function () { affichage() };
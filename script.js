let tempMin, tempMax, probaPluie, heuresSoleil; //Variables stockant le retour des APIs

let chTempMin = document.getElementById("inputTempMin");    //Récupération des éléments de la page HTML
let chTempMax = document.getElementById("inputTempMax")
let chProbaPluie = document.getElementById("inputProbaPluie");
let chHeuresSoleil = document.getElementById("inputHeuresSoleil");
document.getElementById("boutonValider").addEventListener("click", remplirChamps);
document.getElementById("boutonEffacer").addEventListener("click", viderChamps);  

//Rempli les champs sur appui du bouton Valider
function remplirChamps()
{
    //TO DO : Récupérer les valeurs venant des APIs
    chTempMin.textContent = tempMin + " °C";
    chTempMax.textContent = tempMax + " °C";
    chProbaPluie.textContent = probaPluie + " %";
    chHeuresSoleil.textContent = heuresSoleil + "h";
}

//Vide les champs sur appui du bouton Effacer
function viderChamps()
{
    chTempMin.textContent = "";
    chTempMax.textContent = "";
    chProbaPluie.textContent = "";
    chHeuresSoleil.textContent = "";
    tempMin, tempMax, probaPluie, heuresSoleil = "";
}

let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=27560');
let villes = [];
commune
    .then((response) => response.text())
    .then((text) => {
        texteSeparer = text.split(",");
        let compteur = 0;
        let ville;
        texteSeparer.forEach(element => {
            if (compteur % 8 == 0) {
                ville = element.split("\"");
                villes.push(ville[3]);
            }
            compteur++;
        });
    });
console.log(villes);

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
    chTempMin.textContent = "°C";
    chTempMax.textContent = "°C";
    chProbaPluie.textContent = "%";
    chHeuresSoleil.textContent = "h";
    tempMin, tempMax, probaPluie, heuresSoleil = "";
}
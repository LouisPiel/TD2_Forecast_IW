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

let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=61100`;

    fetch(url).then(response => 
        response.json().then(data => {
            console.log(data);

                document.getElementById("insee").innerHTML = data.city.name;
                document.getElementById("pluie").innerHTML = data.forecast[0].probarain+"%";
                document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
                document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
            })
        );

//main

function retourneComune(cPostal){
    let commune = fetch('https://geo.api.gouv.fr/communes?codePostal='+cPostal);
    let listeDeroulante = document.getElementById("listeVilles");
    commune
        .then((response) => response.text())
        .then((text) => {
            texteSeparer = text.split(",");
            let compteur = 0;
            let ville;
            texteSeparer.forEach(element => {
                if (compteur % 8 == 0) {
                    ville = element.split("\"");
                    console.log(ville[3]);
                    var option = document.createElement("option");
                    let val=ville[3];
                    option.value = val;
                    option.text = val.charAt(0).toUpperCase() + val.slice(1);
                    listeDeroulante.appendChild(option);
                }
                compteur++;
            });
        });
}



function affichage(){
    retourneComune(document.getElementById("codePostalForm").value);
}

document.getElementById("codePostalForm").onchange = function() {affichage()};
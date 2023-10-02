//let tempMin, tempMax, probaPluie, heuresSoleil; //Variables stockant le retour des APIs
//let cp, ville;
let cpChamp = document.getElementById("codePostalForm");
//let villeChamp = document.getElementById("codeVille");
let ens = 60;
document.body.style.backgroundImage = "url('Images/ciel_bleu.jpg')";

//document.getElementById("boutonValider").addEventListener("click", remplirChamps()); 
document.getElementById("boutonEffacer").addEventListener('click', viderChamps());  
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
function viderChamps()
{
    console.log("viderChamps");

    cpChamp.value = '';
    cpChamp.textContent = '';
    changerImage();
}

function changerImage()
{
    //let x = element.getElementsByTagName("img").item(0);
    //let v = x.getAttribute("src");
    console.log("ChangerImage " + ens);
    if(ens > 50)
    {
        document.body.style.backgroundImage = "url('Images/ciel_pluie.jpg')";
        console.log("pluie " + ens);
        ens = 40;
        console.log("pluie " + ens);
    }
    else
    {
        document.body.style.backgroundImage = "url('Images/ciel_bleu.jpg')";
        console.log("ciel bleu " + ens);
        ens = 60;
        console.log("ciel bleu " + ens);
    }
}

// Info Météo
const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";

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

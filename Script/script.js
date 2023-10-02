let cpChamp = document.getElementById("codePostalForm");
let ens = 60;
document.body.style.backgroundImage = "url('Images/ciel_bleu.jpg')";

document.getElementById("codePostalForm").onchange = function () { affichage() };

//document.getElementById("boutonEffacer").onclick = function () {viderChamps()};
//document.getElementById("boutonEffacer").addEventListener('click',viderChamps);

//Vide les champs sur appui du bouton Effacer
document.getElementById("boutonEffacer").addEventListener('click', function() {
    cpChamp.value = '';
    cpChamp.textContent = '';
    affichage();
    document.getElementById("insee").innerHTML = "";
    document.getElementById("pluie").innerHTML ="";
    document.getElementById("tmin").innerHTML ="";
    document.getElementById("tmax").innerHTML ="";
    document.getElementById("temps").innerHTML = "";
  });


  document.getElementById("listeVilles").onchange = function () {
    let selectElmt = document.getElementById("listeVilles");
    let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
    afficherMeteo(valeurselectionnee);
}
/*function viderChamps()
{
    console.log("viderChamps");

    cpChamp.value = '';
    cpChamp.textContent = '';
    changerImage();
}*/

function changerImage()
{
    console.log("ChangerImage " + ens);
    if(ens > 50) //TO DO Changer la condition à "ensoleillement et pprévisions pluie"
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
//const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";


//main

function retourneComune(cPostal) {
    let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=' + cPostal);
    let listeDeroulante = document.getElementById("listeVilles");
    listeDeroulante.length = 0;
    let compteur=1;
    commune
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length >= 1) {
                data.forEach(valeur => {
                    let option = document.createElement("option");
                    option.textContent = valeur.nom;
                    option.value = valeur.code;
                    listeDeroulante.appendChild(option);
                    if(compteur==1){
                        let selectElmt = document.getElementById("listeVilles");
                        let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
                        afficherMeteo(valeurselectionnee);
                        compteur++;
                    }
                });
            }
        });
        
   
}


function affichage() {
    retourneComune(document.getElementById("codePostalForm").value);
}

// Info Météo

function afficherMeteo(insee) {

    const TOKEN = "4907b3646f1fff72cfb25ee1a2992ce42f03353e91d02343dd130309e1302042";
    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=` + insee;

    fetch(url).then(response =>
        response.json().then(data => {

            document.getElementById("insee").innerHTML = data.city.name;
            document.getElementById("pluie").innerHTML = data.forecast[0].probarain + "%";
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
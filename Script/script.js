/**
 * Script de communication avec l'API MeteoConcept pour affichage Web
 * @author Lukas Siopathis, Hugo Séfrioui, Louis Piel, Jean Guideau
 * 
 */
let cpChamp = document.getElementById("codePostalForm");
document.body.style.backgroundImage = "url('Images/ciel_bleu.jpg')";
document.body.style.backgroundSize="cover";
document.body.style.backgroundPosition="center center";

document.getElementById("codePostalForm").onchange = function () { affichage() };
//let ens = 60;

/**
 * Vide les champs sur appui du bouton Effacer
 */
document.getElementById("boutonEffacer").addEventListener('click', function () {
    cpChamp.value = '';
    cpChamp.textContent = '';
    affichage();
    document.getElementById("insee").innerHTML = "";
    document.getElementById("pluie").innerHTML = "";
    document.getElementById("tmin").innerHTML = "";
    document.getElementById("tmax").innerHTML = "";
    document.getElementById("temps").innerHTML = "";
});

/**
 * Récupère les informations de la ville choisie dans la liste déroulante pour affichage
 * @see afficherMeteo
 */
document.getElementById("listeVilles").onchange = function () {
    let selectElmt = document.getElementById("listeVilles");
    let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
    afficherMeteo(valeurselectionnee);
}

/**
 * Envoie une requête à l'API et récupère une liste des communes correspondant au code postal
 * Remplie la liste déroulante avec la liste de l'API
 * Affiche les informations de la première ville de la liste
 * @param {*} cPostal Code postal envoyé à l'API
 */
function retourneCommune(cPostal) {
    let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=' + cPostal);
    let listeDeroulante = document.getElementById("listeVilles");
    listeDeroulante.length = 0;
    let compteur = 1;
    commune
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length >= 1) {
                data.forEach(valeur => {
                    let option = document.createElement("option");
                    option.textContent = valeur.nom;
                    option.value = valeur.code;
                    listeDeroulante.appendChild(option);
                    if (compteur == 1) {
                        let selectElmt = document.getElementById("listeVilles");
                        let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
                        afficherMeteo(valeurselectionnee);
                        changerImage();
                        compteur++;
                    }
                });
            }
        });


}

/**
 * Provoque l'envoi de la requête à chaque changement de code postal
 */
function affichage() {
    retourneCommune(document.getElementById("codePostalForm").value);
}

// Info Météo
//const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";

/**
 * Envoie la requête d'informations météos à l'API en fonction de la ville sélectionnée dans la liste déroulante
 * Récupère la réponse sous forme de fichier JSON
 * Change le texte de la fenêtre d'informations et l'image de fond en fonction du contenu du fichier JSON
 * @param {*} insee Code INSEE de la commune
 */
function afficherMeteo(insee) {

    const TOKEN = "4907b3646f1fff72cfb25ee1a2992ce42f03353e91d02343dd130309e1302042";
    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=` + insee;

    fetch(url).then(response =>
        response.json().then(data => {

            document.getElementById("insee").innerHTML = data.city.name;
            document.getElementById("pluie").innerHTML = data.forecast[0].probarain + "%";
            document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
            document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
            document.getElementById("heuresSoleil").innerHTML = data.forecast[0].sun_hours + " heures";

            var x = data.forecast[0].weather

            console.log(data);
            console.log("Hello"+x);
            switch (true) {
                
                case (x == 0):
                    document.getElementById("temps").innerHTML = "Ensoleillé";
                    document.getElementById("iconeTemps").src="./IconesMeteo/ensoleille.png";
                    document.body.style.backgroundImage = "url('Images/ciel_soleil.jpg')";
                    break;

                case (x == 1):
                    document.getElementById("temps").innerHTML = "Peu nuageux";
                    document.getElementById("iconeTemps").src="./IconesMeteo/peunuageux.png";
                    document.body.style.backgroundImage = "url('Images/ciel_bleu.jpg')";
                    break;

                case (x >= 2) && (x <= 5):
                    document.getElementById("temps").innerHTML = "Nuageux";
                    document.getElementById("iconeTemps").src="./IconesMeteo/nuageux.png";
                    document.body.style.backgroundImage = "url('Images/ciel_nuageux.jpg')";
                    break;
                case (x >= 6) && (x <= 7):
                    document.getElementById("temps").innerHTML = "Brouillard";
                    document.getElementById("iconeTemps").src="./IconesMeteo/brouillard.png";
                    document.body.style.backgroundImage = "url('Images/ciel_brouillard.jpg')";
                    break;

                case (x >= 10) && (x <= 12):
                    document.getElementById("temps").innerHTML = "Pluie";
                    document.getElementById("iconeTemps").src="./IconesMeteo/pluie.png";
                    document.body.style.backgroundImage = "url('Images/ciel_pluie.jpg')";
                    break;

                case (x >= 20) && (x <= 22):
                    document.getElementById("temps").innerHTML = "Neige";
                    document.getElementById("iconeTemps").src="./IconesMeteo/neige.png";
                    document.body.style.backgroundImage = "url('Images/ciel_neige.jpg')";
                    break;

                case (x >= 30) && (x <= 32):
                    document.getElementById("temps").innerHTML = "Pluie et Neige";
                    document.getElementById("iconeTemps").src="./IconesMeteo/pluieetneige.png";
                    document.body.style.backgroundImage = "url('Images/ciel_pluie_neige.jpg')";
                    break;

                case (x >= 40) && (x <= 78):
                    document.getElementById("temps").innerHTML = "Averses";
                    document.getElementById("iconeTemps").src="./IconesMeteo/averses.png";
                    document.body.style.backgroundImage = "url('Images/ciel_averses.jpg')";
                    break;

                case (x >= 100) && (x <= 138):
                    document.getElementById("temps").innerHTML = "Orage";
                    document.getElementById("iconeTemps").src="./IconesMeteo/orage.png";
                    document.body.style.backgroundImage = "url('Images/ciel_orage.jpg')";
                    break;
            }
        })
    );
}
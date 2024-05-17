/**
 * Fonction pour générer un nombre entier aléatoire entre min et max
 * Math.random() génère un nombre décimal pseudo-aléatoire compris entre 0 (inclus) et 1 (exclus)
 * Math.floor() arrondit le nombre à l'entier inférieur le plus proche
 * @param {*} min 
 * @param {*} max 
 * @returns Un nombre entier aléatoire entre min et max
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fonction pour créer un avion avec son menu personnel
function createPlane() {

    //#################### AVION ####################
    // Création de l'avion
    const plane = document.createElement('img');
    plane.src = '../images/AvionJ2.png';
    plane.classList.add('plane');
    // Gestionnaire d'événements pour empêcher l'effet de glisser-déposer sur l'image de l'avion
    plane.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });

    // Position initiale de l'avion (en haut, au milieu de la page)
    let topPos = random(0, window.innerHeight - plane.clientHeight);
    let leftPos = random(0, window.innerWidth - plane.clientWidth);
    plane.style.top = topPos + 'px';
    plane.style.left = leftPos + 'px';

    //#################### MENU ####################
    // Création du menu pour cet avion
    const menu = document.createElement('div');
    menu.classList.add('menu');

    // Création des boutons et images du menu
    //Bouton tour
    const button_tour = document.createElement('img');
    button_tour.src = '../images/commande_tour.png';
    button_tour.classList.add('button');
    button_tour.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });
    menu.appendChild(button_tour);

    //Bouton vitesse
    const button_vitesse = document.createElement('img');
    button_vitesse.src = '../images/commande_ralentir.png';
    button_vitesse.classList.add('button');
    button_vitesse.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });
    menu.appendChild(button_vitesse);

    // Création de l'image de sélection
    const imgSelection = document.createElement('img');
    imgSelection.src = '../images/selection.png';
    imgSelection.classList.add('imgSelection');
    imgSelection.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });

    //#################### Ajout des elements (avion, menu...) au conteneur ####################
    const container = document.querySelector('.container');
    container.appendChild(plane);
    container.appendChild(menu);
    container.appendChild(imgSelection);

    // Cacher le menu et l'image de sélection initialement
    menu.style.display = 'none';
    imgSelection.style.display = 'none';

    // Gestionnaire d'événements pour afficher le menu et l'image de sélection au clic sur l'avion ou sur imgSelection
    /**
     * Fonction pour afficher le menu et l'image de sélection de l'avion
     * @param {*} event Événement de clic sur l'avion ou sur imgSelection
     */
    function toggleMenuAndSelection(event) {
        // Masquer tous les menus et images de sélection sauf ceux de l'élément cliqué
        const menus = document.querySelectorAll('.menu');
        menus.forEach(function (otherMenu) {
            if (otherMenu !== menu) {
                otherMenu.style.display = 'none';
            }
        });
        const imgSelections = document.querySelectorAll('.imgSelection');
        imgSelections.forEach(function (otherImgSelection) {
            if (otherImgSelection !== imgSelection) {
                otherImgSelection.style.display = 'none';
            }
        });
        // Afficher le menu et l'image de sélection de l'élément cliqué
        menu.style.display = 'block';
        imgSelection.style.display = 'block';
        event.stopPropagation(); // Empêcher la propagation de l'événement click vers la fenêtre
    }

    plane.addEventListener('click', toggleMenuAndSelection);
    imgSelection.addEventListener('click', toggleMenuAndSelection);

    // Gestionnaire d'événements pour masquer le menu au clic en dehors de l'avion, de imgSelection et du menu
    window.addEventListener('click', function (event) {
        if (event.target !== plane && event.target !== menu && event.target !== imgSelection) {
            menu.style.display = 'none';
            imgSelection.style.display = 'none';
        }
    });

    //#################### ANIMATION MOUVEMENT AVION ####################
    // Direction initiale de l'avion
    let direction = random(0, 3); // 0: haut, 1: bas, 2: gauche, 3: droite

    // Initialiser la durée de la direction à 3 secondes (60 itérations à 50 ms par itération)
    let directionDuration = 60;

    // Animation pour faire bouger l'avion
    setInterval(() => {
        // Assurez-vous que l'avion reste dans les limites de la fenêtre
        topPos = Math.max(0, Math.min(window.innerHeight - plane.clientHeight, topPos));
        leftPos = Math.max(0, Math.min(window.innerWidth - plane.clientWidth, leftPos));

        // Mettre à jour la position de l'avion en fonction de sa direction
        switch (direction) {
            case 0:
                topPos -= 2;
                break;
            case 1:
                topPos += 2;
                break;
            case 2:
                leftPos -= 2;
                break;
            case 3:
                leftPos += 2;
                break;
        }

        plane.style.top = topPos + 'px';
        plane.style.left = leftPos + 'px';

        // Décrémenter le temps restant dans la même direction
        directionDuration--;

        // Si le temps restant dans la même direction est écoulé, changer de direction
        if (directionDuration <= 0) {
            direction = random(0, 3); // Changer la direction
            directionDuration = 60; // Réinitialiser le temps restant dans la même direction
        }

        //#################### ANIMATION MOUVEMENT MENU ET SELECTION DE L AVION ####################
        // Mise à jour de la position du menu pour suivre l'avion
        menu.style.top = (plane.offsetTop - menu.offsetHeight) + 'px';
        menu.style.left = (plane.offsetLeft + (plane.offsetWidth / 2) - (menu.offsetWidth / 2)) + 'px';
        // Mise à jour de la position de l'image de sélection pour suivre l'avion
        imgSelection.style.top = (plane.offsetTop - imgSelection.offsetHeight) + 'px';
        imgSelection.style.left = (plane.offsetLeft + (plane.offsetWidth / 2) - (imgSelection.offsetWidth / 2)) + 'px';
    }, 50); // Réduire l'intervalle de temps pour un mouvement plus fluide (50 ms)
}

// Crée un nouvel avion toutes les 5 secondes
setInterval(createPlane, 5000);

//#################### PISTE ATTERISSAGE ####################
// Sélection de l'élément de l'image de la piste d'atterrissage
const pisteAtterrissage = document.querySelector('.piste_atterissage');
// Gestionnaire d'événements pour empêcher le glisser-déposer sur l'image de la piste d'atterrissage
pisteAtterrissage.addEventListener('mousedown', function (event) {
    event.preventDefault(); // Empêche le glisser-déposer par défaut
});

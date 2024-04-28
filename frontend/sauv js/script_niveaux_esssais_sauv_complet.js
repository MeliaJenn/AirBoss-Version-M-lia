// Fonction pour générer un nombre aléatoire entre min et max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fonction pour créer un avion avec son menu personnel
function createPlane() {
    // Création de l'avion
    const plane = document.createElement('img');
    plane.src = '../images/AvionJ2.png';
    plane.classList.add('plane');

    // Position initiale de l'avion (en haut, au milieu de la page)
    let topPos = random(0, window.innerHeight - plane.clientHeight);
    let leftPos = random(0, window.innerWidth - plane.clientWidth);

    plane.style.top = topPos + 'px';
    plane.style.left = leftPos + 'px';

    // Création du menu pour cet avion
    const menu = document.createElement('div');
    menu.classList.add('menu');


    // Création des boutons dans le menu
    const button1 = document.createElement('img');
    button1.src = '../images/commande_tour.png';
    button1.classList.add('button');
    button1.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });
    menu.appendChild(button1);

    const button2 = document.createElement('img');
    button2.src = '../images/commande_ralentir.png';
    button2.classList.add('button');
    button2.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });
    menu.appendChild(button2);

    // Création de l'image de selection ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    const imgSelection = document.createElement('img');
    imgSelection.src = '../images/selection.png';
    imgSelection.classList.add('imgSelection');
    imgSelection.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });

    // Ajout de l'avion et de son menu au conteneur
    const container = document.querySelector('.container');
    container.appendChild(plane);
    container.appendChild(menu);
    container.appendChild(imgSelection);//ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

    // Cacher le menu initialement
    menu.style.display = 'none';

    // Cacher l'image de selection initialement ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    imgSelection.style.display = 'none';

    //de laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    // Gestionnaire d'événements pour afficher le menu au clic sur l'avion ou sur imgSelection
    plane.addEventListener('click', toggleMenu);
    imgSelection.addEventListener('click', toggleMenu);

    // Gestionnaire d'événements pour masquer le menu au clic en dehors de l'avion, de imgSelection et du menu
    window.addEventListener('click', function (event) {
        if (event.target !== plane && event.target !== menu && event.target !== imgSelection) {
            menu.style.display = 'none';
        }
    });

    // Fonction pour basculer l'affichage du menu
    function toggleMenu(event) {
        // Masquer tous les menus sauf celui de l'élément cliqué
        const menus = document.querySelectorAll('.menu');
        menus.forEach(function (otherMenu) {
            if (otherMenu !== menu) {
                otherMenu.style.display = 'none';
            }
        });

        // Afficher le menu de l'élément cliqué
        menu.style.display = 'block';
        event.stopPropagation(); // Empêcher la propagation de l'événement click vers la fenêtre
    }
    //à laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    // Gestionnaire d'événements pour empêcher l'effet de glisser-déposer sur l'image de l'avion
    plane.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Empêche le glisser-déposer par défaut
    });

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

        // Mise à jour de la position du menu pour suivre l'avion
        menu.style.top = (plane.offsetTop - menu.offsetHeight) + 'px';
        menu.style.left = (plane.offsetLeft + (plane.offsetWidth / 2) - (menu.offsetWidth / 2)) + 'px';

        // Mise à jour de la position de l'image de selection pour suivre l'avion ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
        imgSelection.style.top = (plane.offsetTop - menu.offsetHeight) + 'px';
        imgSelection.style.left = (plane.offsetLeft + (plane.offsetWidth / 2) - (menu.offsetWidth / 2)) + 'px';


    }, 50); // Réduire l'intervalle de temps pour un mouvement plus fluide (50 ms)
}

// Crée un nouvel avion toutes les 5 secondes
setInterval(createPlane, 5000);

// Sélection de l'élément de l'image de la piste d'atterrissage
const pisteAtterrissage = document.querySelector('.piste_atterissage');

// Gestionnaire d'événements pour empêcher le glisser-déposer sur l'image de la piste d'atterrissage
pisteAtterrissage.addEventListener('mousedown', function (event) {
    event.preventDefault(); // Empêche le glisser-déposer par défaut
});

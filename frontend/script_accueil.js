document.addEventListener("DOMContentLoaded", function () {
    var signupButton = document.getElementById("signup-button");
    signupButton.addEventListener("click", function (event) {
        var surnom = document.getElementById("surnom_creation").value;
        var email = document.getElementById("mail_creation").value;
        var password = document.getElementById("password_creation").value;
        var passwordConfirmation = document.getElementById("password_confirm_creation").value;

        // Vérifier si les champs requis sont remplis
        if (surnom === '' || password === '' || passwordConfirmation === '') {
            alert("Veuillez remplir tous les champs (email facultatif)");
            return;
        }
        // Vérifier le format de l'adresse e-mail
        function validateEmail(email) {
            if (email === '') {
                return true;
            }
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
        if (!validateEmail(email) && email !== '') {
            alert("Merci d'entrer une adresse e-mail valide (facultative, mais doit être correcte si fournie).");
            return;
        }
        // Vérifier si le mot de passe répond aux critères
        if (!password.match(/[a-z]+/)) {
            alert("Le mot de passe doit contenir au moins 8 caractères avec au moins 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial. IL TE MANQUE LA MINUSCULE !");
            return;
        }
        if (!password.match(/[A-Z]+/)) {
            alert("Le mot de passe doit contenir au moins 8 caractères avec au moins 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial. IL TE MANQUE LA MAJUSCULE !");
            return;
        }
        if (!password.match(/[0-9]+/)) {
            alert("Le mot de passe doit contenir au moins 8 caractères avec au moins 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial. IL TE MANQUE LE CHIFFRE !");
            return;
        }
        if (!password.match(/[$@#&!]+/)) {
            alert("Le mot de passe doit contenir au moins 8 caractères avec au moins 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial. IL TE MANQUE LE CARACTÈRE SPÉCIALE ($@#&!) !");
            return;
        }
        if (password.length < 8) {
            alert("Le mot de passe doit contenir au moins 8 caractères avec au moins 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial. TU AS MOINS DE 8 CARACTÈRES !");
            return;
        }
        if (password.length > 20) {
            alert("Le mot de passe doit contenir au maximum 20 caractères.");
            return;
        }
        // Vérifier si les mots de passe correspondent
        if (password !== passwordConfirmation) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        // Si tous les champs requis sont remplis, envoyer les données au serveur
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                surnom: surnom,
                email: email,
                mot_de_passe: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP, statut : ${response.status}`);
                }
                window.location.href = "choix_partie.html";
            })
            .catch((error) => {
                alert(`Le surnom "${surnom} est déjà utilisé"`);
                return;
            })
        //window.location.href = "choix_partie.html";
    });


    var loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", function (event) {

        var surnom = document.getElementById("surnom_connexion").value;
        var password = document.getElementById("password_connexion").value;

        // Vérifier si les champs sont vides
        if (surnom === '' || password === '') {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const url = new URL('http://localhost:3000/');
        url.searchParams.append('surnom', surnom);
        fetch(url)
            //.then(response => response.json())
            .then(response => {
                // Vérifier si la réponse est vide
                if (response.headers.get('content-length') === '0') {
                    alert(`Aucun compte trouvé au surnom de "${surnom}"`);
                }
                return response.json();
            })
            .then(data => {
                const passwordExpected = data.mot_de_passe;
                if (passwordExpected === password) {
                    window.location.href = "choix_partie.html";
                } else {
                    alert("Mot de passe incorrect.");
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    });
});

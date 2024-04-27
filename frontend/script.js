console.log("coucou")
document.addEventListener("DOMContentLoaded", function () {
    // Sélection du bouton "Créer mon compte"
    var signupButton = document.getElementById("signup-button");

    // Ajout d'un écouteur d'événement au clic sur le bouton "Créer mon compte"
    signupButton.addEventListener("click", function (event) {
        var surnom = document.getElementById("surnom_creation").value;
        console.log("Surnom : " + surnom);
        var email = document.getElementById("mail_creation").value;
        console.log("Email : " + email);

        var password = document.getElementById("password_creation").value;
        console.log("Mot de passe : " + password);

        var passwordConfirmation = document.getElementById("password_confirm_creation").value;
        console.log("Confirmation du mot de passe : " + passwordConfirmation);

        // Empêcher le comportement par défaut du formulaire
        event.preventDefault();

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
    });
    var loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", function (event) {

        var surnom = document.getElementById("surnom_connexion").value;
        console.log("Surnom : " + surnom);
        var password = document.getElementById("password_connexion").value;
        console.log("Mot de passe : " + password);

        event.preventDefault();

        const url = new URL('http://localhost:3000/');
        url.searchParams.append('surnom', surnom);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const passwordExpected = data.mot_de_passe;
                if (passwordExpected === password) {
                    console.log("Mot de passe correct");
                } else {
                    console.log("Mot de passe incorrect");
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    });
});


/* ----- REQUETE API /USERS/LOGIN APRES SUBMIT FORM ----- */

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Pour empêcher l'envoi du formulaire par défaut
        
        const formData = new FormData(this); // Obtenir les données du formulaire
        
        // Convertir les données du formulaire en objet JSON
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Envoyer les données à votre API
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            // Vérifier si la réponse est ok
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            // Convertir la réponse JSON en objet JavaScript
            return response.json();
        })
        .then(data => {
            // Récupérer le token utilisateur à partir des données de réponse
            const userId = data.userId;
            const token = data.token;

            // Utiliser le token utilisateur comme nécessaire
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            window.location.href = 'index.html';
        })
        .catch(error => {
            // Gérer les erreurs
            console.error('Erreur lors de la récupération des données :', error);
            //alert("Veuillez vérifier vos informations de connexion");
            const wrongPassword = document.getElementById('wrong-password');
            wrongPassword.style.display = 'block';
            wrongPassword.classList.add('shake-animation');
        });
    });

/* ----- WRONG PASSWORD ANIMATION ----- */

    // Sélectionner tous les champs d'entrée
    const inputFields = document.querySelectorAll('input');
    // Sélectionner le paragraphe "wrong-password"
    const wrongPassword = document.getElementById('wrong-password');
    // Fonction pour masquer le paragraphe et retirer la classe "shake-animation"
    function hideWrongPassword() {
        wrongPassword.style.display = 'none';
        wrongPassword.classList.remove('shake-animation');
    }

    // Ajouter un écouteur d'événements à chaque champ d'entrée
    inputFields.forEach(inputField => {
        inputField.addEventListener('input', hideWrongPassword);
    });

/* ----- LOGIN/LOGOUT ----- */

    const loginNav = document.getElementById('login-nav');
    const checkToken = localStorage.getItem('token');
    
    if (checkToken) {
        loginNav.textContent = 'logout';
    } else {
        loginNav.textContent = 'login';
    }

    loginNav.addEventListener('click', function() {
        if (loginNav.textContent === 'logout') {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.reload();
        } else {
            window.location.href = "login.html";
        }
    });
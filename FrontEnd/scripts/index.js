
/* ----- REQUETE API /CATEGORIES POUR AFFICHER FILTRE ----- */

	fetch('http://localhost:5678/api/categories')
	  /* Transformer la requete en json */
	  .then(response => response.json()) 
	  .then(categories => {
		/* Récupérer l'ID parent filter */
		const categoriesContainer = document.getElementById('filter');

		/* Création du bouton "Tous" */
		const allButton = document.createElement('button');
		allButton.textContent = 'Tous';
        allButton.classList.add('activ-category');
		allButton.addEventListener('click', () => {
			showAllWorks(); /* Au clic, on appele la fonction showAllWorks */
			/* On supprime activ-category des autres boutons */
			const allButtons = document.querySelectorAll('#filter button');
			allButtons.forEach(btn => {
				btn.classList.remove('activ-category');
			});
			/* Au clic, on ajoute la classe "active-category" */
			allButton.classList.add('activ-category');
		});
		categoriesContainer.appendChild(allButton); 

		/* Pour chaque "categories" on récupére sa donnée "name" */
		categories.forEach(categorie => {  
		  /* On crée un container div pour contenir le bouton */
		  const categorieElement = document.createElement('div');

		  /* On créer un bouton, on insère le nom et on lui attribut sa categorieID */
          const createButton = document.createElement('button');
          createButton.setAttribute('category-id', categorie.id);
          createButton.textContent = categorie.name;
          /* On ajoute le bouton à l'élément div */
          categorieElement.appendChild(createButton);

		  /* On ajoute un gestionnaire d'événements pour le clic sur chaque bouton */
		  const button = categorieElement.querySelector('button');
		  button.addEventListener('click', () => {
			const categoryId = button.getAttribute('category-id');  /* On récupère le category-id de l'élément cliqué */
			showCategorie(categoryId); /* Au clic, on appele la fonction showCategorie en associant le category-id récupéré juste avant */

			  /*  Au clic, on retirer la classe "active-category" de tous les boutons */
			  const allButtons = document.querySelectorAll('#filter button');
			  allButtons.forEach(btn => {
			  btn.classList.remove('activ-category');
			  });
			/* Puis on ajoute la classe "active-category" à celui séléctionné */
			button.classList.add('activ-category');
		
		  });
		  
		  /* On intègre l'enfant "categorieElement" au container "categoriesContainer" */
		  categoriesContainer.appendChild(categorieElement);
		  
		});
	  })
	  .catch(error => {
		/* Récupérer l'erreur et l'afficher dans la console */
		console.error('Erreur lors de la récupération des catégories :', error);
	  });


/* ----- REQUETE API /WORKS POUR AFFICHER LES IMAGES + TITRES ----- */

	fetch('http://localhost:5678/api/works')
	  /* Transformer la requete en json */
	  .then(response => response.json()) 
	  .then(works => {

		/* CONSTRCUTION DES IMAGES + TITRES */

		/* Récupérer l'id parent works-container */
		const worksContainer = document.getElementById('works-container'); 
		/* Pour chaque "works" on récupére ses données "imageUrl" et "title" */
		works.forEach(work => {  
          
          /* On créer l'image */
          const workElementImg = document.createElement('img');
          workElementImg.setAttribute('src', work.imageUrl)
          workElementImg.setAttribute('alt', work.title)
          
          /* On créer le titre */
          const workElementCaption = document.createElement('figcaption');
          workElementCaption.textContent = work.title;
          
          /* On crée un container figure pour contenir image + titre */
		  const workElement = document.createElement('figure');
		  workElement.setAttribute('data-category-id', work.categoryId);
          workElement.appendChild(workElementImg);
          workElement.appendChild(workElementCaption);

		  /* On intègre l'enfant "workElement" au container "worksContainer" */
		  worksContainer.appendChild(workElement);
		});

		/* CONSTRCUTION DES APERÇUES */

		/* Récupérer l'id parent galeryPreview */
		const galeryPreview = document.getElementById('galery-preview'); 
		/* Pour chaque "works" on récupére ses données "imageUrl" et "title" */
		works.forEach(work => {  
          
          /* On créer l'image */
          const workElementImg = document.createElement('img');
          workElementImg.setAttribute('src', work.imageUrl)
          workElementImg.setAttribute('alt', work.title)
          
          /* On créer l'icon */
          const workElementIcon = document.createElement('i');
          workElementIcon.classList.add('fa-solid', 'fa-trash-can');
		  workElementIcon.addEventListener('click', function() {
			deleteWorks(this);
		});
          
          /* On crée un container img-container pour contenir image + icon */
		  const workElement = document.createElement('div');
		  workElement.setAttribute('data-work-id', work.id);
          workElement.appendChild(workElementImg);
          workElement.appendChild(workElementIcon);
		  workElement.classList.add('img-container');

		  /* On intègre l'enfant "workElement" au container "galeryPreview" */
		  galeryPreview.appendChild(workElement);
		});
	  })
	  .catch(error => {
		/* Récupérer l'erreur et l'afficher dans la console */
		console.error('Erreur lors de la récupération des titres et des images :', error);
	  });


/* ----- FONCTION POUR ANIMER LE FILTRE ----- */

	function showAllWorks() {
		/* Fonction pour tout afficher */
		const workElements = document.querySelectorAll('#works-container figure');
		workElements.forEach(workElement => {
			workElement.style.display = 'block';
		});
	}

	function showCategorie(categoryId) {
		const workElements = document.querySelectorAll('#works-container figure');
		workElements.forEach(workElement => {
			const workCategoryId = workElement.getAttribute('data-category-id');
			if (workCategoryId === categoryId) {
				workElement.style.display = 'block';
			} else {
				workElement.style.display = 'none';
			}
			});
	}

/* ----- LOGIN/LOGOUT + EDIT MODE ----- */

    const loginNav = document.getElementById('login-nav');
    const header = document.querySelector("header");
    const body = document.querySelector("body");
    const filter = document.getElementById('filter');
    const checkToken = localStorage.getItem('token');

    if (checkToken) {
        /* Transformer login en logout */
        loginNav.textContent = 'logout';

        /* Cacher le filtre */
        filter.style.display = 'none';

        /* Ajouter barre d'édition */
        header.style.marginTop = "100px"
        const addEditBar = document.createElement('div');
        addEditBar.setAttribute('class', "edit-bar");
        body.appendChild(addEditBar);
        const addEditContentP = document.createElement('p');
        addEditContentP.textContent = "Mode édition";
        const addEditContentI = document.createElement('i');
        addEditContentI.setAttribute('class', "fa-solid fa-pen-to-square");
        addEditBar.appendChild(addEditContentI);
        addEditBar.appendChild(addEditContentP);

        /* Ajouter "modifier" à côté de "Mes projets" */
        const projectTitle = document.querySelector('.title-container');
        projectTitle.style.marginBottom  = '50px';

        const addEditContainer = document.createElement('div');
        addEditContainer.setAttribute('class', 'edit-container')
        projectTitle.appendChild(addEditContainer);

        const addEditProjectsP = document.createElement('p');
        addEditProjectsP.textContent = "Modifier";
        const addEditProjectsI = document.createElement('p');
        addEditProjectsI.setAttribute('class', "fa-solid fa-pen-to-square");
        addEditContainer.appendChild(addEditProjectsI);
        addEditContainer.appendChild(addEditProjectsP); 

		/* ----- OPEN MODAL ----- */
		const editModal = document.getElementById('modal')
		addEditContainer.addEventListener('click', () => {
			editModal.style.display = 'flex';
			firstModal.style.display = 'flex';
		});
		
		/* ----- CLOSE MODAL ----- */
		const closeModal = document.querySelectorAll('.close-modal')
		closeModal.forEach(element => {
			element.addEventListener('click', () => {
				editModal.style.display = 'none';
				firstModal.style.display = 'none';
				secondModal.style.display = 'none';
			});
		});

		// Fermer la liste déroulante si l'utilisateur clique en dehors d'elle
		editModal.addEventListener('click', function (event) {
			if (event.target.closest('.modal-content') !== null) {
				return;
			} else {
				editModal.style.display = 'none';
				firstModal.style.display = 'none';
				secondModal.style.display = 'none';
			}
		});

		/* ----- NEXT MODAL ----- */
		const firstModal = document.getElementById('modal-content-first')
		const secondModal = document.getElementById('modal-content-second')

		const nextButton = document.getElementById('js-next-modal')
		nextButton.addEventListener('click', () => {
			firstModal.style.display = 'none';
			secondModal.style.display = 'flex';
		});

		/* ----- PREVIOUS MODAL ----- */
		const previousButton = document.getElementById('js-previous-modal')
		previousButton.addEventListener('click', () => {
			firstModal.style.display = 'flex';
			secondModal.style.display = 'none';
		});
		
    } else {
        
    }


/* ----- REQUETE API /WORKS/{id} POUR DELETE ----- */

function deleteWorks(icon) {
    // Récupérer l'ID du work à supprimer à partir de l'élément parent
    const workIdToDelete = icon.closest('.img-container').dataset.workId;

        // Envoyer les données à votre API pour supprimer le work
        fetch(`http://localhost:5678/api/works/${workIdToDelete}`, {
            method: 'DELETE',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${checkToken}` // Ajouter le token d'authentification
			},
        })
        .then(response => {
            // Vérifier si la réponse est ok
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            // Afficher un message de succès
			const workElement = icon.closest('.img-container');
        	workElement.remove(); // Supprimer l'élément du DOM
            console.log('Work supprimé avec succès');
        })
        .catch(error => {
            // Gérer les erreurs
            console.error('Erreur lors de la suppression du work :', error);
        });
    };


/* ----- REQUETE API /WORKS POUR POST ----- */

function addWorks() {
    // Récupérer les valeurs des champs d'entrée
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const fileInput = document.getElementById('fileInput');
    const imageFile = fileInput.files[0];

    // Créer un objet FormData pour contenir les données
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    // Envoyer les données à votre API pour ajouter un work
    fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${checkToken}` // Ajouter le token d'authentification
        },
        body: formData // Utiliser l'objet FormData comme corps de la requête
    })
    .then(response => {
        // Vérifier si la réponse est ok
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        // Afficher un message de succès
		const firstModal = document.getElementById('modal-content-first')
		const secondModal = document.getElementById('modal-content-second')
		firstModal.style.display = 'flex';
		secondModal.style.display = 'none';
		const workElement = icon.closest('.img-container');
        workElement.add(); // Ajouter l'élément au DOM
		console.log('Work ajouté avec succès');

    })
    .catch(error => {
        // Gérer les erreurs
        console.error('Erreur lors de l\'ajout du work :', error);
    });
}


/* ----- GESTION DU BOUTON POUR AJOUT DE NOUVEAU WORKS ----- */


const formTitle = document.getElementById('title');
const formCategory = document.getElementById('category');
const formImage = document.getElementById('fileInput');
const submitButton = document.getElementById('js-submit-new');
const message = document.createElement('p');
message.textContent = 'Veuillez remplir tous les champs.';

// Fonction pour vérifier les champs et activer/désactiver le bouton de soumission
function checkFields() {
    if (formTitle.value === '' || formCategory.value === '' || formImage.value === '') {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

// Ajouter des écouteurs d'événements aux champs d'entrée
formTitle.addEventListener('input', checkFields);
formCategory.addEventListener('input', checkFields);
formImage.addEventListener('input', checkFields);

// Vérifier une première fois lorsque la page est chargée
checkFields();

// Ajouter un écouteur d'événements pour afficher le message lors du survol du bouton
submitButton.addEventListener('mouseover', () => {
    if (formTitle.value === '' || formCategory.value === '' || formImage.value === '') {
        submitButton.parentNode.appendChild(message);
		message.classList.add('error-button');
    }
});

// Supprimer le message lorsque l'utilisateur ne survole plus le bouton
submitButton.addEventListener('mouseout', () => {
    if (message.parentNode === submitButton.parentNode) {
        submitButton.parentNode.removeChild(message);
    }
});
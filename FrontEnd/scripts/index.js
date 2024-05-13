
/*  ----- CRÉATION DYNAMIQUE DE LA MODALE ----- */

// Création de l'élément aside pour la modale
const modal = document.createElement('aside');
modal.setAttribute('id', 'modal');
modal.style.display = 'none';

// Création de la div qui contiendra le contenu de la modale
const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');

// Création du contenu de la première modal
const modalContentFirst = document.createElement('div');
modalContentFirst.setAttribute('id', 'modal-content-first');
modalContentFirst.classList.add('modal-content');

// Création du bouton de fermeture
const closeContainer = document.createElement('div');
closeContainer.classList.add('close-container');
const closeIcon = document.createElement('i');
closeIcon.classList.add('fa-solid', 'fa-close', 'close-modal');
closeContainer.appendChild(closeIcon);
modalContentFirst.appendChild(closeContainer);

// Autres éléments de modalContentFirst
const galeryTitle = document.createElement('p');
galeryTitle.textContent = 'Galerie photo';
modalContentFirst.appendChild(galeryTitle);

const galeryPreview = document.createElement('div');
galeryPreview.setAttribute('id', 'galery-preview');
galeryPreview.classList.add('galery-preview');
modalContentFirst.appendChild(galeryPreview);

const separator = document.createElement('div');
separator.classList.add('separator');
modalContentFirst.appendChild(separator);

const nextButton = document.createElement('button');
nextButton.setAttribute('id', 'js-next-modal');
nextButton.textContent = 'Ajouter une photo';
modalContentFirst.appendChild(nextButton);

// Création du contenu de la deuxième modal
const modalContentSecond = document.createElement('div');
modalContentSecond.setAttribute('id', 'modal-content-second');
modalContentSecond.classList.add('modal-content');
modalContentSecond.style.display = 'none';

// Autres éléments de modalContentSecond
const iconContainer = document.createElement('div');
iconContainer.classList.add('icon-container');

const previousIcon = document.createElement('i');
previousIcon.classList.add('fa-solid', 'fa-arrow-left');
previousIcon.setAttribute('id', 'js-previous-modal');
iconContainer.appendChild(previousIcon);

const closeIconSecond = document.createElement('i');
closeIconSecond.classList.add('fa-solid', 'fa-close', 'close-modal');
iconContainer.appendChild(closeIconSecond);

modalContentSecond.appendChild(iconContainer);

const form = document.createElement('form');
form.setAttribute('id', 'work-form');

const titleParagraph = document.createElement('p');
titleParagraph.textContent = 'Ajout photo';
form.appendChild(titleParagraph);

const addPictureDiv = document.createElement('div');
addPictureDiv.classList.add('add-picture');
const imageIcon = document.createElement('i');
imageIcon.classList.add('fa-regular', 'fa-image');
addPictureDiv.appendChild(imageIcon);
const addPictureButton = document.createElement('button');
addPictureButton.classList.add('add-picture-button');
addPictureButton.textContent = '+ Ajouter photo';
addPictureDiv.appendChild(addPictureButton);
const addPictureInput = document.createElement('input');
addPictureInput.classList.add('add-picture-input');
addPictureInput.setAttribute('type', 'file');
addPictureInput.setAttribute('id', 'fileInput');
addPictureInput.setAttribute('accept', 'image/*');
addPictureInput.setAttribute('size', '4194304');
addPictureInput.setAttribute('onchange', 'previewImage(event)');
addPictureDiv.appendChild(addPictureInput);
const sizeParagraph = document.createElement('p');
sizeParagraph.textContent = 'jpg, png : 4mo max';
addPictureDiv.appendChild(sizeParagraph);
form.appendChild(addPictureDiv);

const addPreviewDiv = document.createElement('div');
addPreviewDiv.classList.add('add-preview');
addPreviewDiv.style.display = 'none';
form.appendChild(addPreviewDiv);

const inputTitleDiv = document.createElement('div');
inputTitleDiv.classList.add('input-title');
const titleLabel = document.createElement('label');
titleLabel.setAttribute('for', 'title');
titleLabel.textContent = 'Titre';
inputTitleDiv.appendChild(titleLabel);
const titleInput = document.createElement('input');
titleInput.setAttribute('type', 'text');
titleInput.setAttribute('name', 'title');
titleInput.setAttribute('id', 'title');
inputTitleDiv.appendChild(titleInput);
form.appendChild(inputTitleDiv);

const selectCategoryDiv = document.createElement('div');
selectCategoryDiv.classList.add('select-category');
const categoryLabel = document.createElement('label');
categoryLabel.setAttribute('for', 'category');
categoryLabel.textContent = 'Catégorie';
selectCategoryDiv.appendChild(categoryLabel);
const categoryContainer = document.createElement('div');
categoryContainer.setAttribute('id', 'category');
// Créer l'élément select
const selectElement = document.createElement('select');
selectElement.setAttribute('id', 'select-value');
selectCategoryDiv.appendChild(selectElement);
selectCategoryDiv.appendChild(categoryContainer);
form.appendChild(selectCategoryDiv);

modalContentSecond.appendChild(form);

const separatorSecond = document.createElement('div');
separatorSecond.classList.add('separator');
modalContentSecond.appendChild(separatorSecond);

const submitButton = document.createElement('button');
submitButton.setAttribute('id', 'js-submit-new');
submitButton.textContent = 'Valider';
submitButton.addEventListener('click', addWorks);
modalContentSecond.appendChild(submitButton);

// Ajout des contenus de la première et de la deuxième modal à la div modalContainer
modalContainer.appendChild(modalContentFirst);
modalContainer.appendChild(modalContentSecond);

// Ajout de la div modalContainer à la modale
modal.appendChild(modalContainer);

// Ajout de la modale au corps du document
document.body.appendChild(modal);





/* ----- REQUETE API /CATEGORIES  ----- */

	fetch('http://localhost:5678/api/categories')
	  /* Transformer la requete en json */
	  .then(response => response.json()) 
	  .then(categories => {

		/* CONSTRUCTION DU FILTRE */

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

		/* CONSTRUCTION DU SELECT DANS MODALE */

		/* Récupérer l'ID parent */
		const categoryContainer = document.getElementById('category');
		

		// Créer et ajouter l'option par défaut
		const defaultOption = document.createElement('option');
		defaultOption.setAttribute('value', '');
		defaultOption.setAttribute('disabled', 'true');
		defaultOption.setAttribute('selected', 'true');
		defaultOption.setAttribute('hidden', 'true');
		selectElement.appendChild(defaultOption);

		categories.forEach(categorie => {
			// Créer une option pour chaque catégorie
			const option = document.createElement('option');
			option.setAttribute('value', categorie.id); 
			option.textContent = categorie.name;
			selectElement.appendChild(option);
		});

		categoryContainer.appendChild(selectElement);

		selectElement.addEventListener('input', function() {
			checkFields();
		});
	  })
	  .catch(error => {
		/* Récupérer l'erreur et l'afficher dans la console */
		console.error('Erreur lors de la récupération des catégories :', error);
	  });


/* ----- REQUETE API /WORKS  ----- */

	fetch('http://localhost:5678/api/works')
	  /* Transformer la requete en json */
	  .then(response => response.json()) 
	  .then(works => {

		/* CONSTRUCTION DES IMAGES + TITRES */

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
		  workElement.setAttribute('data-work-id', work.id);
		  workElement.setAttribute('data-category-id', work.categoryId);
          workElement.appendChild(workElementImg);
          workElement.appendChild(workElementCaption);

		  /* On intègre l'enfant "workElement" au container "worksContainer" */
		  worksContainer.appendChild(workElement);
		});

		/* CONSTRUCTION DES APERÇUES */

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

/* ----- EDIT MODE ----- */

    const header = document.querySelector("header");
    const body = document.querySelector("body");
    const filter = document.getElementById('filter');

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
		const editModal = document.getElementById('modal');
		addEditContainer.addEventListener('click', () => {
			editModal.style.display = 'flex';
			firstModal.style.display = 'flex';
		});
		addEditContentI.addEventListener('click', () => {
			editModal.style.display = 'flex';
			firstModal.style.display = 'flex';
		});
		addEditContentP.addEventListener('click', () => {
			editModal.style.display = 'flex';
			firstModal.style.display = 'flex';
		});
		
		
		/* ----- CLOSE MODAL ----- */
		const closeModal = document.querySelectorAll('.close-modal');
		const workForm= document.getElementById('work-form');
		const workPreview = document.querySelector('.add-preview');
		const workInput = document.querySelector('.add-picture');
		closeModal.forEach(element => {
			element.addEventListener('click', () => {
				editModal.style.display = 'none';
				firstModal.style.display = 'none';
				secondModal.style.display = 'none';
				workForm.reset();
				workPreview.style.display = 'none';
				workInput.style.display = 'flex';
				workInput.value = '';
				submitButton.disabled = true;
			});
		});

		/* ----- CLOSE MODAL IF CLICK OUTSIDE ----- */
		editModal.addEventListener('click', function (event) {
			if (event.target.closest('.modal-content') !== null) {
				return;
			} else {
				editModal.style.display = 'none';
				firstModal.style.display = 'none';
				secondModal.style.display = 'none';
				workForm.reset();
				workPreview.style.display = 'none';
				workInput.style.display = 'flex';
				workInput.value = '';
				submitButton.disabled = true;
			}
		});

		/* ----- NEXT MODAL ----- */
		const firstModal = document.getElementById('modal-content-first');
		const secondModal = document.getElementById('modal-content-second');

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
			workForm.reset();
			workPreview.style.display = 'none';
			workInput.style.display = 'flex';
			workInput.value = '';
			submitButton.disabled = true;
		});
		
    } else {
        
    }


/* ----- REQUETE API /WORKS/{id} POUR DELETE ----- */

function deleteWorks(icon) {
    /* Récupérer l'ID du work à supprimer à partir de l'élément parent */
    const workIdToDelete = icon.closest('.img-container').dataset.workId;

        /* Envoyer les données à l'API pour supprimer le work */
        fetch(`http://localhost:5678/api/works/${workIdToDelete}`, {
            method: 'DELETE',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${checkToken}`
			},
        })
        .then(response => {
            /* Vérifier si la réponse est ok */
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            /* Afficher un message de succès */
			const workElementModal = icon.closest('.img-container');
        	workElementModal.remove(); // Supprimer l'élément de la modale
			const workElementHome = document.querySelector(`[data-work-id="${workIdToDelete}"]`);
			workElementHome.remove(); // Supprimer l'élément de la page d'accueil
            console.log('Work supprimé avec succès');
        })
        .catch(error => {
            /* Gérer les erreurs */
            console.error('Erreur lors de la suppression du work :', error);
        });
    };


/* ----- REQUETE API /WORKS POUR POST ----- */

function addWorks() {
    /* Récupérer les valeurs des champs d'entrée */
    const title = document.getElementById('title').value;
    const category = document.getElementById('select-value').value;
    const fileInput = document.getElementById('fileInput');
    const imageFile = fileInput.files[0];

    /* Créer un objet FormData pour contenir les données */
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    /* Envoyer les données à l'API pour ajouter un work */
    fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${checkToken}` 
        },
        body: formData 
    })
    .then(response => {
		/* Vérifier si la réponse est ok */
		if (!response.ok) {
			throw new Error('Erreur lors de la requête');
		}
		/* Extraire l'ID du work nouvellement ajouté de la réponse JSON */
		return response.json();
	})
	.then(data => {

		/*  ---- CONSTRUIRE L'APERÇU DANS ACCUEIL ----- */

		/* Récupérer l'id parent works-container */
		const worksContainer = document.getElementById('works-container'); 
		/* Pour chaque "works" on récupére ses données "imageUrl" et "title" */
  
          
          /* On créer l'image */
          const workElementHomeImg = document.createElement('img');
          workElementHomeImg.setAttribute('src', data.imageUrl)
          workElementHomeImg.setAttribute('alt', data.title)
          
          /* On créer le titre */
          const workElementCaption = document.createElement('figcaption');
          workElementCaption.textContent = data.title;
          
          /* On crée un container figure pour contenir image + titre */
		  const workElementHome = document.createElement('figure');
		  workElementHome.setAttribute('data-work-id', data.id);
		  workElementHome.setAttribute('data-category-id', data.categoryId);
          workElementHome.appendChild(workElementHomeImg);
          workElementHome.appendChild(workElementCaption);

		  /* On intègre l'enfant "workElement" au container "worksContainer" */
		  worksContainer.appendChild(workElementHome);
		;

		/*  ---- CONSTRUIRE L'APERÇU DANS MODALE ----- */

		/* Récupérer l'id parent galeryPreview */
		const galeryPreview = document.getElementById('galery-preview'); 
		/* Récupérer l'image dans l'input */
		const fileInput = document.getElementById('fileInput');
    		if (fileInput.files.length > 0) {
        		const selectedFile = fileInput.files[0];
        		const reader = new FileReader();
        		reader.onload = function (event) {
            	workElementImg.setAttribute('src', event.target.result);};
        		reader.readAsDataURL(selectedFile);
    		} else {
        		console.log('Il n\'y a pas de fichier à ajouter');
    		}
          /* On créer l'image */
          const workElementImg = document.createElement('img');
          workElementImg.setAttribute('alt', data.title)
          
          /* On créer l'icon */
          const workElementIcon = document.createElement('i');
          workElementIcon.classList.add('fa-solid', 'fa-trash-can');
		  workElementIcon.addEventListener('click', function() {
			deleteWorks(this);
		  });
          /* On crée un container img-container pour contenir image + icon */
		  const workElement = document.createElement('div');
		  workElement.setAttribute('data-work-id', data.id);
          workElement.appendChild(workElementImg);
          workElement.appendChild(workElementIcon);
		  workElement.classList.add('img-container');
		  /* On intègre l'enfant "workElement" au container "galeryPreview" */
		  galeryPreview.appendChild(workElement);
		
		/* Mettre à jour la modal à afficher + reset */
		const firstModal = document.getElementById('modal-content-first');
		const secondModal = document.getElementById('modal-content-second');
		const workForm= document.getElementById('work-form');
		const workPreview = document.querySelector('.add-preview');
		const workInput = document.querySelector('.add-picture');
		firstModal.style.display = 'flex';
		secondModal.style.display = 'none';
		workForm.reset();
		workPreview.style.display = 'none';
		workInput.style.display = 'flex';
		workInput.value = '';
		submitButton.disabled = true;
		console.log('Work ajouté avec succès');
    })
    .catch(error => {
        /* Gérer les erreurs */
        console.error('Erreur lors de l\'ajout du work :', error);
    });
}


/* ----- GESTION DU BOUTON + APERÇU POUR AJOUT DE NOUVEAU WORKS ----- */

const formTitle = document.getElementById('title');
const formCategory = document.getElementById('select-value');
const formImage = document.getElementById('fileInput');
const message = document.createElement('p');
message.textContent = 'Veuillez remplir tous les champs.';

/* Fonction pour vérifier les champs et activer/désactiver le bouton de soumission */
function checkFields() {
    if (formTitle.value === '' || formCategory.value === '' || formImage.value === '') {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

/* Ajouter des écouteurs d'événements aux champs d'entrée */
formTitle.addEventListener('input', checkFields);
formImage.addEventListener('input', checkFields);

/* Vérifier une première fois lorsque la page est chargée */
checkFields();

/* Ajouter un écouteur d'événements pour afficher le message lors du survol du bouton */
submitButton.addEventListener('mouseover', () => {
    if (formTitle.value === '' || formCategory.value === '' || formImage.value === '') {
        submitButton.parentNode.appendChild(message);
		message.classList.add('error-button');
    }
});

/* Supprimer le message lorsque l'utilisateur ne survole plus le bouton */
submitButton.addEventListener('mouseout', () => {
    if (message.parentNode === submitButton.parentNode) {
        submitButton.parentNode.removeChild(message);
    }
});

/* Gestion de l'aperçu avant de post */
function previewImage(event) {
	var reader = new FileReader();
	reader.onload = function () {
		var output = document.querySelector('.add-preview');
		var input = document.querySelector('.add-picture');
		output.innerHTML = '<img src="' + reader.result + '" style="max-width:200px; max-height:200px;" />';
		output.style.display = 'flex';
		input.style.display = 'none';
	};
	reader.readAsDataURL(event.target.files[0]);
}

 // **************REDIRECTION VERS LA SECTION CONTACT DANS LE LIEN DU LOGIN EN SCROLLING********************
 document.addEventListener("DOMContentLoaded", () => {
	const sectionToScroll = window.location.hash.substring(1);
	if (sectionToScroll) {
	  setTimeout(function () {
		const targetSection = document.getElementById(sectionToScroll);
		if (targetSection) {
		  window.scrollTo({
			top: targetSection.offsetTop,
		  });
		}
	  }, 100);
	}
  });
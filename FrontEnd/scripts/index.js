
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
		/* Récupérer l'id parent works-container */
		const worksContainer = document.getElementById('works-container'); 
		/* Pour chaque "works" on récupére ses données "imageUrl" et "title" */
		works.forEach(work => {  
		  /* On crée un container figure pour contenir image + titre */
		  const workElement = document.createElement('figure');

		  /* On récupère le categoryId et on l'ajoute comme attribut au figure parent */
		  workElement.setAttribute('data-category-id', work.categoryId)

		  /* On insère l'image et le titre */
		  workElement.innerHTML = `
			<img src="${work.imageUrl}" alt="${work.title}">
			<figcaption>${work.title}</figcaption>
		  `;

		  /* On intègre l'enfant "workElement" au container "worksContainer" */
		  worksContainer.appendChild(workElement);
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

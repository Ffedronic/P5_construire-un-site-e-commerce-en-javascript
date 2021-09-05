//----------déclaration de la variable products qui contiendra les clés productReadyToBuy----------// 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit"));

//--------------------affichage des produits dans la page panier-----------------------------------//

//selection de l'emplacement d'affichage des produits
let displayProductsInCart = document.getElementById("DisplayArticlesInCart");

//selection de l'emplacement du nombre de produits
let lengthOfProductsInCart = document.getElementById('cardProductsLength');

//selection de l'emplacement du total de la commande
const totalAmountInCart = document.getElementById('totalAmount');

//sélection de l'emplacement du formulaire
const displayFormOrder = document.getElementById("formOrder");

//création du tableau contenant les produits prêts à afficher
let displayProducts = [];

//création de la variable number contenant la quantité totale de produit
let productsQuantities = 0;

//création de la variable number contenant le prix total de la commande
let productsTotalPrice = 0;

//si le localStorage ne contient pas de produit
if (listOfProductStorage == null || listOfProductStorage == 0) {
  lengthOfProductsInCart.innerHTML = "Le panier est vide";
}
//si le localStorage contient des produits
else {
  for (let product of listOfProductStorage) {
    //calcul du prix total de la commande
    productsTotalPrice += (product.quantity * product.price) / 100;
    //calcul de la quantité totale des produits présents dans le localStorage
    productsQuantities += product.quantity;
    //création des éléments à afficher pour chaque produit
    displayProducts += `
      <article class="card mb-3" id="${product.id}" style="max-width: 600px;">
        <div class="row">
          <div class="col-md-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name} peluche faite main" style="min-height: 150px;">
          </div>
          <div class="col-12 col-md-8">
            <div class="card-body">
              <h3 class="card-title">${product.name}</h3>
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-text" id="quantityProduct">Quantité : <span><button type="button" class="btn btn-success p-1 me-2" id="${product.id}"><i class="fas fa-plus-square"></i></button></span><span id="productQuantity" class="me-2">${product.quantity}</span><span><button type="button" class="btn btn-warning p-1" id="${product.id}"><i class="fas fa-minus-square 11"></i></button></span></h4>
                  <h5 class="card-text">Prix :<span id="subtotalProduct">${(product.price/100)*product.quantity}<span>€</h5>
                </div>
                <button type="button" class="btn btn-danger" id="${product.id}"><i class="fas fa-trash-alt text-white"></i><span class="p-2 text-white fw-bold">Supprimer</span></button>
              </div>
            </div>
          </div>
        </div>
      </article>
      `;
  }
  //affichage de la quantité totale de produits dans le localStorage
  lengthOfProductsInCart.innerHTML = `Le panier contient ${productsQuantities} ours.`;
  //affichage des produits sur la page panier
  displayProductsInCart.innerHTML = displayProducts;
  //affichage du montant total de la commande
  totalAmountInCart.innerHTML = `<h2 class="mb-5">Montant total de la commande : <span class="h1 fw-bold">${productsTotalPrice} €</span></h2>`;
  //affichage du formulaire de contact
  displayFormOrder.innerHTML = `
                                  <form class="border rounded bg-light p-2">
                                    <h2 class="mb-3 text-center">Formulaire de commande</h2>
                                    <div class="form-group mb-3 text-center">
                                      <label class="h3" for="email">Email :</label>
                                      <input type="email" class="form-control" id="email" placeholder="nom@exemple.fr" required>
                                    </div>
                                    <div class="form-group mb-3 text-center">
                                      <label for="firstName" class="h3">Prénom :</label>
                                      <input type="text" class="form-control" id="firstName" aria-label="Entrez votre prénom" required>
                                    </div>
                                    <div class="form-group mb-3 text-center">
                                      <label for="lastName" class="h3">Nom :</label>
                                      <input type="text" class="form-control" id="lastName" required>
                                    </div>
                                    <div class="form-group mb-3 text-center text-center">
                                      <label class="h3" for="adress">Adresse :</label>
                                      <input type="text" class="form-control" id="adress" placeholder="ex : 78 chemin des oursons" required>
                                    </div>
                                    <div class="form-group mb-3 text-center">
                                      <label class="h3" for="city">Ville</label>
                                      <input type="text" class="form-control" id="city" required>
                                    </div>
                                    <button type="submit" id="btnSubmit" class="btn btn-info mt-3"><span class="h4 fw-bold">Valider la commande</span></button>
                                  </form>
                                `;
};

//----------------------------modification de la quantité par article----------------------------------------//

//diminution des quantités du produit
let btnDelete = document.querySelectorAll(".btn-warning");
//au click
btnDelete.forEach(btnDeleteQelement => {
  btnDeleteQelement.addEventListener('click', event => {
    event.preventDefault;
    event.stopPropagation;
    //je sélectionne l'id du bouton de diminution de la quantité du produit
    let btnDeleteQuantityProductId = btnDeleteQelement.getAttribute('id');
    console.log("je diminue la quantité du produit" + " " + btnDeleteQuantityProductId);
    if (listOfProductStorage !== null) {
      listOfProductStorage.forEach(element => {
        //si l'id du bouton correspond au produit dans le localStoraga
        if (element.id == btnDeleteQelement.id) {
          //alors je diminue la quantité du produit dans le localStorage
          element.quantity = element.quantity - 1;
          localStorage.setItem("produit", JSON.stringify(listOfProductStorage));
          window.location.reload();
          //si la quantité du produit est égale ou inférieure à 0 alors je supprime le produit du localStorage
          if (element.quantity <= 0) {
            listOfProductStorage = listOfProductStorage.filter(element => element.id !== btnDeleteQelement.id);
            localStorage.setItem("produit", JSON.stringify(listOfProductStorage));
            window.location.reload();
          };
        };
      });
    };
  });
});

//ajout des quantités du produit
let btnAdd = document.querySelectorAll(".btn-success");
btnAdd.forEach(btnAddElement => {
  btnAddElement.addEventListener('click', event => {
    event.preventDefault;
    event.stopPropagation;
    //je sélectionne l'id du bouton de diminution de la quantité du produit
    let btnAddQuantityProductId = btnAddElement.getAttribute('id');
    console.log("j'augmente la quantité du produit" + " " + btnAddQuantityProductId);
    if (listOfProductStorage !== null) {
      listOfProductStorage.forEach(element => {
        var found = false;
        //si l'id du bouton correspond au produit dans le localStorage
        if (element.id == btnAddElement.id) {
          //alors j'augmente la quantité du produit dans le localStorage
          element.quantity = element.quantity + 1;
          found = true;
          localStorage.setItem("produit", JSON.stringify(listOfProductStorage));
          window.location.reload();
        };
      });
    };
  });
});

//suppression des produits
let btnDeleteProduct = document.querySelectorAll(".btn-danger");
btnDeleteProduct.forEach(element => {
  //au click
  element.addEventListener('click', event => {
    event.preventDefault;
    event.stopPropagation;
    //je sélectionne l'id du bouton correspondant au produit à supprimer
    let btnDeleteProductId = element.getAttribute('id');
    console.log("je supprime le produit" + " " + btnDeleteProductId);
    if (listOfProductStorage !== null) {
      found = false;
      listOfProductStorage.forEach(element => {
        //si le produit se trouve dans le localStorage
        if (element.id == btnDeleteProductId) {
          found = true;
          //alors je le supprime du localStorage
          listOfProductStorage = listOfProductStorage.filter(elementToDelete => elementToDelete.id !== btnDeleteProductId);
          localStorage.setItem("produit", JSON.stringify(listOfProductStorage));
          window.location.reload();
        };
      });
    };
  });
});


//---------------récupération des informations à transmettre au serveur---------------------------------//

//récupération du bouton de validation de commande
let btnSubmit = document.getElementById("btnSubmit");
const contact = {};
const products = [];

//au clic sur le bouton de validation de commande
btnSubmit.addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();

  //récupération des valeurs des controles du formulaire
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var adress = document.getElementById("adress").value;
  var city = document.getElementById("city").value;
  var email = document.getElementById("email").value;

  //l'expression de fonction regex pour tester les variables firstName, lastName et city
  const regexTestNameAndCity = (element) => {
    return /^[ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ\w-]{3,30}$/.test(element);
  };

  //fonction de controle de la valeur firstName
  function firstNameControl() {
    if (regexTestNameAndCity(firstName)) {
      return true;
    } else {
      return false;
    };
  }

  //fonction de controle de la valeur firstName
  function lastNameControl() {
    if (regexTestNameAndCity(lastName)) {
      return true;
    } else {
      return false;
    };
  }

  //fonction de controle de la valeur firstName
  function cityControl() {
    if (regexTestNameAndCity(city)) {
      return true;
    } else {
      return false;
    };
  }

  //fonction de controle de la valeur email
  function emailControl() {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return true;
    } else {
      return false;
    };
  }

  //fonction de controle de la valeur adress
  function adressControl() {
    if (/^[\w\d\s]{3,80}$/.test(adress)) {
      return true;
    } else {
      return false;
    };
  }

  if (firstNameControl() && lastNameControl() && cityControl() && emailControl() && adressControl()) {
    console.log("ok");
    //création de l'objet contact contenant les valeurs des contrôles du formulaire
    const contact = {
      firstName: firstName,
      lastName: lastName,
      address: adress,
      city: city,
      email: email
    };

    //création du tableau products contenant les id des produits contenus dans le localStorage
    const products = [];
    listOfProductStorage.forEach(element => {
      products.push(element.id);
    });
    
    //création de l'objet à envoyer au serveur contenant la liste des produits achetés et les valeurs validées des champs formulaire de contact
    const contactProductsToSend = {
      contact,
      products
    };
    //envoi de l'objet contactProductsToSend au serveur via fetch api avec la méthode POST
    fetch("http://localhost:3000/api/teddies/order", {
      method : "POST",
      headers : {"content-type" : "application/json"},
      body : JSON.stringify(contactProductsToSend),
    })
    .then((res) => {
      if(res.ok){
        return res.json() ;
      }
    })
    .then((responseServer) => {
      console.log(responseServer) ;
      //création et stockage dans le localStorage de l'objet responseServerContact contenant l'objet contact renvoyé par le serveur
      const responseServerContact = responseServer.contact ;
      localStorage.setItem("responseServerContact", JSON.stringify(responseServerContact)) ;
      //création et stockage dans le localStorage de l'objet responseServerProducts contenant l'objet products renvoyé par le serveur
      const responseServerProducts = responseServer.products ;
      localStorage.setItem("responseServerProducts", JSON.stringify(responseServerProducts)) ;
      //création et stockage dans le localStorage de l'objet responseServerOrderId contenant l'objet orderId renvoyé par le serveur
      const responseServerOrderId = responseServer.orderId ;
      localStorage.setItem("responseServerOrderId", JSON.stringify(responseServerOrderId)) ;
      //stockage dans le localStorage de l'objet productsTotalPrice contenant le montant total de la commande
      localStorage.setItem("productsTotalPrice", JSON.stringify(productsTotalPrice)) ;
    })
    .catch((err) => {
      console.log(err);
    })


   
  } else {
    console.log("ko");
    alert("remplissez correctement tous les champs du formulaire.")
  }
});
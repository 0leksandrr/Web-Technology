document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const homeLink = document.getElementById("home-link");
  const catalogLink = document.getElementById("catalog-link");

  // Load home page
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadHomePage();
  });

  // Load catalog
  catalogLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadCatalog();
  });

  // Function to load the home page
  function loadHomePage() {
    content.innerHTML = `<h1>Welcome to the Catalog App</h1><p>Select a category to see its items.</p>`;
  }

  // Function to load the catalog
  function loadCatalog() {
    fetch("data/catalog.json")
      .then((response) => response.json())
      .then((categories) => {
        let html = "<h1>Catalog</h1><div class='row'>";
        categories.forEach((category) => {
          html += `
            <div class="col-md-3">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${category.name}</h5>
                  <p class="card-text">${category.notes}</p>
                  <button class="btn btn-primary" data-category="${category.shortname}">View Items</button>
                </div>
              </div>
            </div>`;
        });
        html += "</div>";
        html += `<button class="btn btn-secondary" id="specials">Specials</button>`;
        content.innerHTML = html;

        attachEventListeners(categories);
      });
  }

  // Attach event listeners to dynamically created buttons
  function attachEventListeners(categories) {
    document.querySelectorAll("[data-category]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        loadCategory(category);
      });
    });

    const specialsButton = document.getElementById("specials");
    if (specialsButton) {
      specialsButton.addEventListener("click", () => {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)].shortname;
        loadCategory(randomCategory);
      });
    }
  }

  // Function to load a category
  function loadCategory(category) {
    fetch(`data/${category}.json`)
      .then((response) => response.json())
      .then((items) => {
        let html = `<h1>${category.toUpperCase()}</h1><div class='row'>`;
        items.forEach((item) => {
          html += `
            <div class="col-md-3">
              <div class="card mb-3">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <p class="card-text"><strong>${item.price} USD</strong></p>
                </div>
              </div>
            </div>`;
        });
        html += "</div>";
        content.innerHTML = html;
      });
  }
});

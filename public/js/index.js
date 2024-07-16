document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = "/productos";

  const productList = document.getElementById("productList");

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      const products = await response.json();
      productList.innerHTML = "";
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("card");
        productDiv.innerHTML = `
                  <img src="${product.imagen}" alt="${product.nombre}">
                  <h3>${product.nombre}</h3>
                  <p class="precio_produc">${product.precio}</p>
                  <button data-id="${product.id}" class="delete_product"><img src="assets/img/papelera.png" alt="Eliminar"></button>
              `;
        productList.appendChild(productDiv);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchProducts();

  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: name, precio: price, imagen: image }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      fetchProducts();
      productForm.reset();
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  });

  productList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete_product")) {
      const productId = event.target.getAttribute("data-id");

      try {
        const response = await fetch(`/productos/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }

        fetchProducts();
      } catch (error) {
        console.error("Error eliminando producto:", error);
      }
    }
  });
});

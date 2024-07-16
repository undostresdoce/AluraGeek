const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("/server/db.js");

app.use(express.static("public"));

app.get("/productos", (req, res) => {
  res.json(db.productos);
});

app.post("/productos", express.json(), (req, res) => {
  const { nombre, precio, imagen } = req.body;
  const newProduct = {
    id: generateId(),
    nombre,
    precio,
    imagen,
  };
  db.productos.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const index = db.productos.findIndex((product) => product.id === id);
  if (index !== -1) {
    db.productos.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

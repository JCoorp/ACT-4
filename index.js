const express = require("express");
const path = require("path");
const usuariosRutas = require("./routes/usuariosRutas");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Asegúrate de que la ruta es correcta

app.use("/", express.static(path.join(__dirname, "web")));
app.use(express.urlencoded({ extended: true }));
app.use("/", usuariosRutas);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor en el puerto http://localhost:" + port);
});

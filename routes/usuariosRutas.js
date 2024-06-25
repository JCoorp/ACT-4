const express = require("express");
const axios = require("axios");
const Usuario = require("../class/UsuarioClase");
const UsuarioBD = require("../DB/UsuarioBD");

const ruta = express.Router();

// Middleware para verificar acceso basado en IP
async function acceder(req, res, next) {
    try {
        const ipResponse = await axios.get("https://api.apify.org/?format=json");
        const ip = ipResponse.data.ip;
        console.log("IP del cliente:", ip);

        if (ip === "200.188.14.2") {
            console.log("Acceso permitido");
            next();
        } else {
            console.log("Acceso denegado");
            res.status(403).send("Acceso denegado");
        }
    } catch (error) {
        console.error("Error al obtener la IP del cliente:", error);
        next();
    }
}

// Redirigir la ruta principal (/) a /agregarUsuario
ruta.get("/", (req, res) => {
    res.redirect("/agregarUsuario");
});

// Ruta para mostrar el formulario de agregar usuario
ruta.get("/agregarUsuario", (req, res) => {
    res.render("form");
});

// Ruta para mostrar todos los usuarios
ruta.get("/mostrarUsuarios", async (req, res) => {
    try {
        const usuarioBD = new UsuarioBD();
        const usuariosBD = await usuarioBD.mostrarUsuarios();
        console.log("Usuarios obtenidos de la BD:", usuariosBD);
        res.render("mostrarUsuarios", { usuariosBD });
    } catch (error) {
        console.error("Error al recuperar los usuarios:", error);
        res.status(500).send("Error al recuperar los usuarios");
    }
});

// Ruta para agregar un usuario
ruta.post("/agregarUsuario", async (req, res) => {
    const usuario1 = new Usuario(req.body);
    console.log("Datos del nuevo usuario:", usuario1.obtnerDatos);

    if (!usuario1.nombre || !usuario1.celular || !usuario1.correo) {
        res.render("error");
    } else {
        try {
            const usuarioBD = new UsuarioBD();
            await usuarioBD.insertar(usuario1.obtnerDatos);
            res.redirect("/mostrarUsuarios"); // Redirige a /mostrarUsuarios después de agregar el usuario
        } catch (error) {
            console.error("Error al agregar el usuario:", error);
            res.status(500).send("Error al agregar el usuario");
        }
    }
});

// Ruta para borrar un usuario por ID
ruta.get("/borrarUsuario/:idusuario", async (req, res) => {
    try {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.borrarUsuario(req.params.idusuario);
        res.redirect("/mostrarUsuarios");
    } catch (error) {
        console.error("Error al borrar el usuario:", error);
        res.status(500).send("Error al borrar el usuario");
    }
});

module.exports = ruta;

class Usuario {
    constructor(usuario) {
        this._id = usuario.idUsuario;
        this._nombre = usuario.nombre;
        this._celular = usuario.celular;
        this._correo = usuario.correo;
    }

    set nombre(nombre) {
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        } else {
            console.log("Error: Asignacion de nombre incorrecto");
        }
    }

    set celular(celular) {
        var regexTelefonoNacional = /^\d{10}$/;
        if (regexTelefonoNacional.test(celular)) {
            this._celular = celular;
        } else {
            console.log("Error: Asignacion de celular incorrecto");
        }
    }

    set correo(correo) {
        var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexCorreo.test(correo)) {
            this._correo = correo;
        } else {
            console.log("Error: Asignacion de correo incorrecto");
        }
    }

    get nombre() {
        return this._nombre;
    }

    get celular() {
        return this._celular;
    }

    get correo() {
        return this._correo;
    }

    get obtnerDatos() {
        return {
            id: this.id,
            nombre: this.nombre,
            celular: this.celular,
            correo: this.correo
        };
    }
}

module.exports = Usuario;

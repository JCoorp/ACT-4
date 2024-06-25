const ConectarBD = require("./ConectarBD");

class UsuarioBD extends ConectarBD {
    constructor() {
        super();
    }

    async mostrarUsuarios() {
        try {
            await this.crearConexion();
            const [rows, fields] = await this.conexion.query("SELECT * FROM usuarios");
            await this.cerrarConexion();
            return rows;
        } catch (error) {
            console.error("Error al recuperar los usuarios: " + error);
            throw error;
        }
    }

    async insertar(usuario) {
        try {
            await this.crearConexion();
            const query = "INSERT INTO usuarios (nombre, celular, correo) VALUES (?, ?, ?)";
            const values = [usuario.nombre, usuario.celular, usuario.correo];
            await this.conexion.query(query, values);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al insertar el usuario: " + error);
            throw error;
        }
    }

    async borrarUsuario(idusuario) {
        try {
            await this.crearConexion();
            const query = "DELETE FROM usuarios WHERE idusuario = ?";
            await this.conexion.query(query, [idusuario]);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el usuario: " + error);
            throw error;
        }
    }
}

module.exports = UsuarioBD;

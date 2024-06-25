const dotenv = require('dotenv');
dotenv.config();

class ConectarBD {
    constructor() {
        this.conexion = null;
        this.mysql = require("mysql2/promise");
    }

    async crearConexion() {
        try {
            this.conexion = await this.mysql.createConnection({
                host: process.env.MYSQL_ADDON_HOST,
                user: process.env.MYSQL_ADDON_USER,
                password: process.env.MYSQL_ADDON_PASSWORD,
                database: process.env.MYSQL_ADDON_DB,
                port: process.env.MYSQL_ADDON_PORT
            });
            console.log("Conexion exitosa");
        } catch (error) {
            console.error("Error al conectar a la base de datos: " + error);
        }
    }

    async cerrarConexion() {
        try {
            if (this.conexion) {
                await this.conexion.end();
                console.log("Conexion cerrada");
            }
        } catch (error) {
            console.error("Error al cerrar la conexion: " + error);
        }
    }
}

module.exports = ConectarBD;

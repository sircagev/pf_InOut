import { pool } from '../database/conexion.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';


//reportes para los elemetnos
export const GenerarInformeElementos = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM elementos`);
        
        if (result.length > 0) {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('informe_elementos.pdf'));

            doc.text('Informe de Elementos\n\n');

            result.forEach(elemento => {
                doc.text(`Código: ${elemento.codigo_elemento}`);
                doc.text(`Nombre: ${elemento.nombre_elemento}`);
                doc.text(`Stock: ${elemento.stock}`);
                doc.text(`Tipo: ${elemento.tipo_elemento}`);
                doc.text('-----------------------\n\n');
            });

            doc.end();

            return res.status(200).json({ "message": "Informe de elementos generado con éxito." });
        } else {
            return res.status(404).json({ "message": "No hay elementos para generar informe." });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
};

//generar reporte para las reservas
export const GenerarInformeReservas = async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT r.*, u.nombre_usuario
            FROM reservas r
            JOIN usuarios u ON r.fk_usuario = u.id_usuario
        `);

        if (result.length > 0) {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('informe_reservas.pdf'));

            doc.text('Informe de Reservas\n\n');

            result.forEach(reserva => {
                doc.text(`ID de Reserva: ${reserva.id_reserva}`);
                doc.text(`Estado: ${reserva.estado_reserva}`);
                doc.text(`Usuario: ${reserva.nombre_usuario}`);
                doc.text('-----------------------\n\n');
            });

            doc.end();

            return res.status(200).json({ "message": "Informe de reservas generado con éxito." });
        } else {
            return res.status(404).json({ "message": "No hay reservas para generar informe." });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
};

// repoerte para los usuarios
export const GenerarInformeUsuarios = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM usuarios`);

        if (result.length > 0) {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('informe_usuarios.pdf'));

            doc.text('Informe de Usuarios\n\n');

            result.forEach(usuario => {
                doc.text(`ID de Usuario: ${usuario.id}`);
                doc.text(`Nombre: ${usuario.nombre_usuario}`);
                doc.text(`Apellido: ${usuario.apellido_usuario}`);
                doc.text(`Email: ${usuario.email_usuario}`);
                doc.text(`Rol: ${usuario.rol}`);
                doc.text('-----------------------\n\n');
            });

            doc.end();

            return res.status(200).json({ "message": "Informe de usuarios generado con éxito." });
        } else {
            return res.status(404).json({ "message": "No hay usuarios para generar informe." });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
};

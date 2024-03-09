import { pool } from '../database/conexion.js'

//Registrar Reserva
export const RegistrarReserva = async (req, res) => {
    try {

        let messageReserva;
        let messageDetalle;
        let status;
        let { estado_reserva, fk_usuario, detalles } = req.body;

        //Iniciar un transaccion en Sql
        await pool.query("START TRANSACTION");

        //Crear una nueva Reserva
        const sqlReserva = `INSERT INTO reservas (estado_reserva, fk_usuario) VALUES (?,?)`;
        const valuesReserva = [estado_reserva, fk_usuario]
        let [ReservaRows] = await pool.query(sqlReserva, valuesReserva);

        if (ReservaRows.affectedRows > 0) {
            messageReserva = 'Se registró con éxito la reserva'
            status = 200
        } else {
            return res.status(403).json({ message: "Reserva no registrada" });
        }

        //Obtener ID de la reserva recién creada
        const fk_reserva = ReservaRows.insertId;

        //Insertar detalles de la reserva
        for (const detalle of detalles) {
            //Traer informacion de los detalles
            const { fk_elemento, cantidad_elemento, observacion, estatus } = detalle;
            console.log(detalle)
            //Insertar de a un detalle
            const detalleSql = `INSERT INTO detalle_reservas (fk_reserva, fk_elemento, cantidad_elemento, observacion_reserva, estatus) VALUES (?,?,?,?,?)`;
            const detalleValues = [fk_reserva, fk_elemento, cantidad_elemento, observacion, estatus];
            let [DetalleRows] = await pool.query(detalleSql, detalleValues);

            if (DetalleRows.affectedRows > 0) {
                messageDetalle = "Se registró con éxito el detalle de la reserva";
                status = 200
            } else {
                return res.status(403).json({ message: "Detalle de reserva no registrada" });
            }

            // Actualizar el stock del elemento
            const actualizarStockSql = `UPDATE elementos SET disponibilidad_stock = disponibilidad_stock - ? WHERE codigo_elemento = ?`;
            const actualizarStockValues = [cantidad_elemento, fk_elemento];
            await pool.query(actualizarStockSql, actualizarStockValues);
        }

        // Confirmar la transacción
        await pool.query("COMMIT");

        return res.status(status).json({ "message": messageReserva + " " + messageDetalle });
    } catch (e) {
        await pool.query("ROLLBACK");
        return res.status(500).json({ "message": e });
    }
};

//Funcion para listar todas las reservas en estado de prestamo o solicitadas que hay actualmente
export const ListarReservasActivas = async (req, res) => {
    try {
        const { estado } = req.params;
        //Realizar consulta 
        const sql = `SELECT * FROM reservas WHERE estado_reserva = ?`
        const values = [estado]
        const [result] = await pool.query(sql, values)
        console.log(result)
        //Revisar si llego informacion
        if (result.length > 0) {
            return res.status(200).json({ message: "Reservas listadas", reservas: result });
        } else {
            return res.status(404).json({ message: "No se encontraron reservas" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e });
    }
}

export const ListarReservas = async (req, res) => {
    try {
        //Realizar consulta 
        const sql = `SELECT * FROM reservas`
        const [result] = await pool.query(sql)

        //Revisar si llego información
        if (result.length > 0) {
            return res.status(200).json({ message: "Reservas listadas", reservas: result });
        } else {
            return res.status(404).json({ message: "No se encontraron reservas" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e });
    }
}

//Funcion para buscar una reserva en especifico mediante su id o el documento de la persona que realizo la reserva
export const BuscarReserva = async (req, res) => {
    try {
        let prompt = req.params.prompt;
        let sql = `SELECT r.*, u.nombre_usuario, u.apellido_usuario, u.email_usuario FROM reservas AS r
                JOIN usuarios AS u 
                ON u.id_usuario = r.fk_usuario 
                WHERE r.fk_usuario = ? OR r.codigo_reserva = ?`;
        const values = [prompt, prompt];

        const [result] = await pool.query(sql, values);
        if (result.length > 0) {
            return res.status(200).json({ message: "Reservas listadas", reservas: result });
        } else {
            return res.status(404).json({ message: "No se encontraron reservas" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e });
    }
}

export const CambiarEstadoReserva = async (req, res) => {
    try {
        const { estado_reserva } = req.body;
        const { id } = req.params;
        const sql = `UPDATE reservas SET estado_reserva = ? WHERE codigo_reserva = ?`
        const values = [estado_reserva, id]
        let [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: `La reserva se encuentra en estado ${estado_reserva}` });
        } else {
            return res.status(404).json({ "message": 'Error, no se pudo actualizar la reserva' });
        }
    } catch (e) {
        return res.status(500).json({ "message": e });
    }
}

export const EliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const sql1 = 'DELETE FROM detalle_reservas WHERE fk_reserva = ?;'
        const sql2 = `DELETE FROM reservas WHERE codigo_reserva = ?`;
        const values = [id];
        const [rows1] = await pool.query(sql1, values);
        const [rows2] = await pool.query(sql2, values);

        if (rows2.affectedRows > 0) {
            return res.status(200).json({ message: `La reserva se elimino con exito` });
        } else {
            return res.status(404).json({ message: 'Error, no se pudo eliminar la reserva, no existe', error: rows2 });
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: e });
    }
}
import { pool } from '../database/conexion.js'

//Registrar Reserva
export const RegistrarReserva = async (req, res) => {
    try {

        let message;
        let status;
        let { estado_reserva, fk_usuario, detalles } = req.body;

        //Iniciar un transaccion en Sql
        await pool.query("START TRANSACTION");

        //Crear una nueva Reserva
        const sqlReserva = `INSERT INTO reservas (estado_reserva, fk_usuario) VALUES (?,?)`;
        const valuesReserva = [ estado_reserva, fk_usuario ]
        let [ReservaRows] = await pool.query(sqlReserva, valuesReserva);

        if (ReservaRows.affectedRows > 0) {
            message = 'Se registró con éxito la reserva'
            status = 200
        } else {
            return res.status(403).json({ message: "Reserva no registrada" });
        }

        //Obtener ID de la reserva recien creada
        const fk_reserva = ReservaRows.insertId;

        //Insertar detalles de la reserva
        for (const detalle of detalles) {
            //Traer informacion de los detalles
            const { fk_elemento, cantidad_elemento, observacion } = detalle;

            //Insertar de a un detalle
            const detalleSql = `INSERT INTO detalle_reservas (fk_reserva, fk_elemento, cantidad_elemento, observacion_reserva) VALUES (?,?,?,?)`;
            const detalleValues = [fk_reserva, fk_elemento, cantidad_elemento, observacion];
            let DetalleRows = await pool.query(detalleSql, detalleValues);

            if (DetalleRows.affectedRows > 0) {
                message = "Se registró con éxito el detalle de la reserva";
                status = 200
            } else {
                return res.status(403).json({ message: "Detalle de reserva no registrada" });
            }

             // Actualizar el stock del elemento
             const actualizarStockSql = `UPDATE elementos SET disponibilidad_stock = disponibilidad_stock - ? WHERE id_elemento = ?`;
             const actualizarStockValues = [cantidad_elemento, fk_elemento];
             await pool.query(actualizarStockSql, actualizarStockValues);
        }

        // Confirmar la transacción
        await pool.query("COMMIT");

        return res.status(status).json({ "message": message });
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};
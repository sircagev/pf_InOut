import { pool } from '../database/conexion.js';

export const RegistrarElemento = async (req, res) => {
    try {
        let { codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, fk_tipoEmpaque, unidad_medida, estado, fk_ubicacion } = req.body;

        let sql = `insert into elementos (codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, fk_tipoEmpaque, unidad_medida, estado, fk_ubicacion)
                   values (?,?,?,?,?,?,?,?,?,?)`;
        let values = [codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, fk_tipoEmpaque, unidad_medida, estado, fk_ubicacion];
        let [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento registrado con éxito." });
        } else {
            returnres.status(404).json({ "message": "Elemento no registrado." });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

export const ListarElemetos = async (req, res) => {
    try {
        let [result] = await pool.query(
                `SELECT e.*, c.nombre_categoria, em.Nombre_empaque, u.sector, u.ubicacion_especifica 
                FROM elementos as e 
                join categoria_elemento as c on fk_categoria = codigo_categoria 
                JOIN tipo_empaque AS em ON fk_tipoEmpaque = Codigo_empaque
                JOIN detalle_ubicacion AS u ON fk_ubicacion = codigo_detalleUbi
                ORDER BY e.codigo_elemento ASC`);
        if (result.length > 0) {


            return res.status(200).json({"message": "Elementos",elementos: result});

        } else {
            return res.status(404).json({ "message": "No hay elementos." });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

export const BuscarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from elementos where codigo_elemento = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Elemento encontrada con éxito", "Elemento": rows[0] });
        } else {
            return res.status(404).json({ "message": "Elemento no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
}

export const ActualizarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let { codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, fk_tipoEmpaque, unidad_medida, estado, fk_ubicacion } = req.body;
        let sql = `UPDATE elementos SET
                   codigo_elemento = ?,
                   nombre_elemento = ? ,
                   stock = ?,
                   tipo_elemento = ?,
                   fecha_vancimiento = ?,
                   fk_categoria = ?,
                   fk_tipoEmpaque = ?, 
                   unidad_medida = ?, 
                   estado = ?, 
                   fk_ubicacion = ?
                   where codigo_elemento = ?`;
        let [result] = await pool.query(sql, [codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, fk_tipoEmpaque, unidad_medida, estado, fk_ubicacion, id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento actualizado." });
        } else {
            return res.status(404).json({ "message": "Elemento no actualizado." })
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

export const EliminarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from elementos where codigo_elemento = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento eliminado" });
        } else {
            return res.status(404).json({ "message": "Elemento no eliminado" });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

export const DesactivarElementos = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `UPDATE elementos SET estado = 'inactivo' WHERE codigo_elemento = ?`;

        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Elemento desactivado con éxito." });
        } else {
            return res.status(404).json({ "message": "Elemento no desactivado." });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

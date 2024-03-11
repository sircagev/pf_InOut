import { pool } from '../database/conexion.js';

export const RegistraEmpaque = async (req, res) => {
    try{
        let { Nombre_empaque } = req.body;
        let sql = `insert into tipo_empaque (Nombre_empaque)
                   VALUES (?)`;
        let values = [Nombre_empaque];
        let [rows] = await pool.query(sql, values);

        if(rows.affectedRows > 0) {
            return res.status(200).json({"message": "El empaque se registró con éxito"});
        } else {
            return res.status(404).json({"message": "El empaque no se registró"});
        }
    }catch (error) {
        return res.status(500).json({"message": error.message });
    }
}

export const ListarEmpaque = async (req, res) => {
    try{
        let [result] = await pool.query(`select * from tipo_empaque`);

        if(result.length > 0) {
            return res.status(200).json({"message": "Se encontró empaques", empaques: result});
        } else {
            return res.status(404).json({"message": "No se encontró empaques"});
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

export const BuscarEmpaque = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from tipo_empaque where Codigo_empaque = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({"message": "Empaque econtrado", "Empaque": rows[0]});
        } else {
            return res.status(500).json({"message": "No se encontró empaques"});
        }
    } catch (error){
        return res.status(500).json({"message": error.message});
    }
}

export const ActualizarEmpaque = async (req, res) => {
    try {
        let id = req.params.id;
        let { Nombre_empaque } = req.body;
        let sql = `UPDATE tipo_empaque
                   SET Nombre_empaque = ?
                   WHERE Codigo_empaque = ?`;
        let [rows] = await pool.query(sql, [Nombre_empaque, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({"message": "Empaque actualizado con éxito", "Empaque": rows[0]});
        } else {
            return res.status(200).json({"message": "Empaque no actualizado con éxito"});
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

export const EliminarEmpaque = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from tipo_empaque where Codigo_empaque = ${id}`;
        let [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            return res.status(200).json({"message": "Empaque eliminado con éxito"});
        } else {
            return res.status(404).json({"message": "Empaque no eliminado"});
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}



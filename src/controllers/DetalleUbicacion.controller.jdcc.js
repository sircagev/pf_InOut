import { pool } from '../database/conexion.js';

export const RegistrarUbicacion = async (req, res) => {
    try {
        let {sector, ubicacion_especifica, fk_bodega} = req.body;
        let sql = `insert into detalle_ubicacion (sector, ubicacion_especifica, fk_bodega)
                  values (?,?,?)`;
        let values = [sector, ubicacion_especifica, fk_bodega];
        let [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({"message": "Ubicación registrada con éxito."})
        } else {
            return res.status(404).json({"message": "Ubicación no."})
        }
    } catch (error) {
        return res.status(500).json({"message": error.message})
    }
}

export const ListarUbicacion = async (req, res) => {
    try {
        let [result] = await pool.query(`select * from detalle_ubicacion`);

        if(result.length > 0) {
            return res.status(200).json({result});
        } else {
            return res.status(404).json({"message": "No se econtró ubicaciones"});
        }
    } catch (error){
        return res.status(500).json({"message": error.message});
    }
}

export const BuscarUbicacion = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from detalle_ubicacion where codigo_detalleUbi = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.length > 0) {
            return res.status(202).json({"message": "Ubicación encontrada", result});
        } else {
            return res.status(404).json({"message": "Ubicación no encontrada"});
        }
    } catch (error){
        return res.status(500).json({"message": error.message});
    }
}

export const ActualizarUbicacion = async (req, res) => {
    try {
        let id = req.params.id;
        let {sector, ubicacion_especifica, fk_bodega} = req.body;
        let sql = `UPDATE detalle_ubicacion 
                   SET sector = ?,
                   ubicacion_especifica = ?,
                   fk_bodega = ? 
                   where codigo_detalleUbi = ?`;
        
        let [result] = await pool.query(sql, [sector, ubicacion_especifica, fk_bodega, id]);
       
        if(result.affectedRows > 0) {
            return res.status(200).json({"message": "Ubicación actualizado", "Nuevos Datos": result});
        } else {
            return res.status(400).json({"message": "Ubicación no actualizada"});
        }
    } catch (error){
        return res.status(500).json({"message": error.message});
    }
}

export const EliminarUbicacion = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from detalle_ubicacion where codigo_detalleUbi = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"message": "Ubicacióin eliminada con éxito."});
        } else {
            return res.status(404).json({"message": "Ubicacióin no eliminada."});
        }
    } catch (error){
        return res.status(500).json({"message": error.message});
    }
}

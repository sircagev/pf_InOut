import { pool } from '../database/conexion.js';

export const RegistrarCategoria = async (req, res) => {
    try {
        const { nombre_categoria } = req.body;

        const sql = `INSERT INTO categoria_elemento ( nombre_categoria)
                     VALUES (?)`;
        const values = [ nombre_categoria];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito la categoría" });
        } else {
            return res.status(403).json({ "message": "Categoría no registrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": `Error en el servidor: ${e.message}` });
    }
};

export const listarCategoria = async(req ,res)=> {

    try{
        const [result] = await pool.query('select * from categoria_elemento');
        
        if(result.length>0){
            return res.status(200).json({message: "Uno",categorias: result}); 
        } else {
            return res.status(404).json({'message': 'No se econtró categorias'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};

export const BuscarBodega = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from categoria_elemento where codigo_categoria = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Bodega encontrada con éxito", "Elemento": rows[0] });
        } else {
            return res.status(404).json({ "message": "Bodega no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const ActualizarBodega = async (req, res) => {
    try {
      let id = req.params.id;
      let { nombre_categoria } = req.body;
  
      let sql = `
        UPDATE categoria_elemento
        SET nombre_categoria = ?
        WHERE codigo_categoria = ?
      `;
  
      let [rows] = await pool.query(sql, [nombre_categoria, id]);
  
      if (rows.affectedRows > 0) {
        return res.status(200).json({ "message": "Bodega actualizada con éxito" });
      } else {
        return res.status(404).json({ "message": "Bodega no actualizada" });
      }
    } catch (e) {
      return res.status(500).json({ "message": e.message });
    }
  };

  export const EliminarBodega = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from categoria_elemento where codigo_categoria = ${id}`;
        let [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            return res.status(200).json({"message": "Bodega eliminado con éxito"});
        } else {
            return res.status(404).json({"message": "Bodega no eliminada"})
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
  }
  
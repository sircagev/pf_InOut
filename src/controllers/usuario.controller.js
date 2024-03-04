import {pool} from '../database/conexion.js';

export const registrarUsuario = async(req, res)=>{
    try{
        let{nombre_usuario,apellido_usuario,email_usuario,rol,numero,contraseña_usuario,ID_ficha}= req.body;
        let sql = `insert into usuarios(nombre_usuario,apellido_usuario,email_usuario,rol,numero,contraseña_usuario,ID_ficha)
                    values('${nombre_usuario}','${apellido_usuario}','${email_usuario}','${rol}','${numero}','${contraseña_usuario}','${ID_ficha}')`

         let[rows] = await pool.query(sql);

         if(rows.affectedRows > 0){
            return res.status(200).json({'message': 'Usuario Registrado con Exitoso'});
         }
         else{
            return res.status(403).json({'message': 'Usuario No Registrado'});            
         }
    }
    catch(e){
        return res.status(500).json({'message': e.message});
    }
}

export const ListarUsuario = async(req, res) =>{

    let[result] = await pool.query('select *from usuarios')

    if(result.length>0){
        return res.status(200).json({result});
    }
    else{
       return res.status(403).json({'message': 'No existen Usuarios Registrados'});            
    }
}

export const EliminarUsuario= async(req, res) => {

    let id = req.params.id;
    let sql = `delete from usuarios where id = ${id}`;
    
    let[rows]= await pool.query(sql);

    if(rows.affectedRows){
            return res.status(200).json({'message': 'Usuarios Eliminado con exito'});
        }
        else{
           return res.status(403).json({'message': 'Usuarios no elimiado con exito'});            
        }
    }

export const BuscarUsuario = async(req, res) => {

    let id = req.params.id;
    let sql = `select * from usuarios where id = ${id}`;

    let[rows]= await pool.query(sql, [id]);

    if(rows.length){
        return res.status(200).json({'Datos Usuario': rows[0]});
    }
    else{
       return res.status(403).json({'message': 'Usuarios No encontrado'});            
    }
}

export const ActualizarUsuario= async(req, res) =>{
    try{

        let id = req.params.id;
        let{nombre_usuario,apellido_usuario,email_usuario,rol,numero,contraseña_usuario,ID_ficha}= req.body;
        let sql = `UPDATE usuarios SET nombre_usuario = ?,
                                       apellido_usuario = ?,
                                       email_usuario = ?,
                                       rol = ?,
                                       numero = ?,
                                       contraseña_usuario = ?,
                                       ID_ficha = ?
                                       WHERE id = ?`
    
        let[rows] = await pool.query(sql, [nombre_usuario,apellido_usuario,email_usuario,rol,numero,contraseña_usuario,ID_ficha, id]);

        if(rows.affectedRows){
            return res.status(200).json({'message': 'usuario actualizado con exito'});
        }
        else{
           return res.status(403).json({'message': 'Usuarios No actualizado'});            
        }
    }
    catch(e){
        return res.status(500).json({'message': e.message});  
    }

}
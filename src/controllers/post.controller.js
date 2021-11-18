import { pool } from "../database";

export const readAllPosts=async(req,res)=>{
    try {
        const response=await pool.query('select * from fc_list_post()');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const readPost=async(req,res)=>{
    try {
        const id=parseInt(req.params.id);
        const response=await pool.query('select * from fc_list_post_by_id($1)',[id]);
        return res.status(200).json(response.rows);
        
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const createPost=async(req,res)=>{

    try {
        const{titulo,descripcion}=req.body;
        await pool.query('select fc_create_post($1,$2)',[titulo,descripcion]);
        return res.status(200).json(`El post ${titulo} se ha creado correctamente`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const updatePost=async(req,res)=>{
    try {
        const id=parseInt(req.params.id);
        const{titulo,descripcion}=req.body;
        await pool.query('select fc_update_post($1,$2,$3)',[titulo,descripcion,id]);
        return res.status(200).json(`El post se ha modificado correctamente.....`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const delPost=async(req,res)=>{
    try {
        const id=parseInt(req.params.id);
        await pool.query('select fc_delete_post($1)',[id]);
        return res.status(200).json(`El post se ha eliminado correctamente.....`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
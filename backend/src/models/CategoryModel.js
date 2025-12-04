const db=require('../config/db');

class CategoryModel{
    static async getAll (){
        const [rows]=await db.query (
            'SELECT cate_id, cate_name from category WHERE cate_parent_id IS NOT NULL');
        return rows;
    }

    static async getById(id){
        const [rows] = await db.query('SELECT * FROM category WHERE cate_id= ?',[id]);
        return rows[0];
    }

    static async create(data){
        const[result]=await db.query("INSERT INTO category SET ?", [data]);
        return {result};
    }
    static async delete(id){
        const [result]= await db.query("DELETE FROM category WHERE cate_id= ?", [id]);
        return result.affectedRows > 0;
    }

    static async update(id, data){
        const [result]= await db.query("UPDATE category SET ? WHERE cate_id= ?", [data,id]);
        return result.affectedRows;
    }

}

module.exports=CategoryModel;
import express from "express";
import pool from "../config/db.js";


const router = express.Router();

router.post("/", async (req,res) => {
try{
    const{name,email,message} = req.body;
    if(!name || !email || !message) {
        return res.status(400).json({ok: false, error : "Missing fields"})
    }
    const sql = "INSERT INTO (name, email, message) VALUES(?,?,?)";
    const [result] = await pool.execute(sql, [name,email,message]);
    return res.status(201).json({ok:true})
    }catch (err){
        console.log("POST query failed",err);
        return res.status(400).json({error : "Database query failed"})
    }
});
export default router;
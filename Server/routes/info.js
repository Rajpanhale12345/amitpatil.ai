import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/" , async(req,res)=>{
    try{
    const[rows]= await pool.query("SELECT * FROM INFO ORDER BY created_at DESC LIMIT 1")
    if(!rows.length) res.status(400).json({error : "Missing Data"})
    return res.json(rows)
}catch(err){
    console.log("data fetching failed",err);
    return res.status(500).json("Database query failed")
}
});
export default router;

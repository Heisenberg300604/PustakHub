import { db } from " ../config/db";
import { users } from "../db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt";



export const registerUser = async((req,res)=>{
    
})

import { db } from " ../config/db";
import { users } from "../db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt";
import { registerSchema,loginSchema } from "../utils/validation";



// Register new user 
export const register = async (req, res) => {
    try {
        // Validate the request body
      const validatedData = registerSchema.parse(req.body); // Validate the request body using zod if not then it returns a zod error
      const { email, password, name, city } = validatedData; // Destructure the validated data
  
      // Check if the user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
  
      if (existingUser.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
      // Insert the new user into the database
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          password_hash: hashedPassword,
          name,
          city,
          is_active: true
        })
        .returning({
          user_id: users.user_id,
          email: users.email,
          name: users.name,
          city: users.city
        });
      // Generate a JWT token for the new user
      const token = generateToken({
        userId: newUser.user_id,
        email: newUser.email
      });
      // Send the response
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: newUser
      });
      // Send the response
    } catch (error) {
      console.error('Register error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
};

// login user 

export const login = async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body); // Validate the request body using zod if not then it returns a zod error
  
      // Check if the user exists
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
      // Compare the password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      // If the password is invalid
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
  
      // Generate a JWT token for the user
      const token = generateToken({
        userId: user.user_id,
        email: user.email
      });
  
      const { password_hash, ...userWithoutPassword } = user;
  
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
  
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

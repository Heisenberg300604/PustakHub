import { db } from "../config/db.js";
import { users } from "../db/schema.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt.js";
import { registerSchema,loginSchema } from "../utils/validation.js";


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

  // Get user profile
  export const getProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // Get the user id from the request
  
      // Get the user from the database
      const [user] = await db
        .select({
          user_id: users.user_id,
          email: users.email,
          name: users.name,
          city: users.city,
          primary_social_handle: users.primary_social_handle,
          secondary_social_handle: users.secondary_social_handle,
          avatar_url: users.avatar_url,
          created_at: users.created_at
        })
        .from(users)
        .where(eq(users.user_id, userId))
        .limit(1);
  
      // If the user is not found
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      // Send the response
      res.json({
        success: true,
        user
      });
  
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
  
  // Update user profile
  export const updateProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // Get the user id from the request
      const { name, city, primary_social_handle, secondary_social_handle } = req.body; // Destructure the request body
  
      // Update the user in the database
      const [updatedUser] = await db
        .update(users)
        .set({
          name,
          city,
          primary_social_handle,
          secondary_social_handle,
          updated_at: new Date()
        })
        .where(eq(users.user_id, userId))
        .returning({
          user_id: users.user_id,
          email: users.email,
          name: users.name,
          city: users.city,
          primary_social_handle: users.primary_social_handle,
          secondary_social_handle: users.secondary_social_handle,
          avatar_url: users.avatar_url
        });
      // Send the response
      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
      });
      
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
};
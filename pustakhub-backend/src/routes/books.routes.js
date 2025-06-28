import { Router } from 'express';
import { getAllBooks, getExamTypes, getBookById, createBook, getUserBooks, updateBookStatus } from '../controllers/book.controller.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();

// public routes
router.get('/', getAllBooks);
router.get('/exam-types', getExamTypes);
router.get('/:id', getBookById);

// private routes
router.post('/', authenticateToken, createBook);
router.get('/user/my-books', authenticateToken, getUserBooks);
router.put('/:id/status', authenticateToken, updateBookStatus);

export default router;
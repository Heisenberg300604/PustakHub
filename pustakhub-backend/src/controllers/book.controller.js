import { eq, and, like, desc, asc, sql } from 'drizzle-orm';
import db from '../config/db.js';
import { books, bookImages, users, exam_types as examTypes } from '../db/schema.js';
import { createBookSchema, updateBookSchema } from '../utils/validation.js';

// Create a new book
export const createBook = async (req, res) => {
  try {
    const validatedData = createBookSchema.parse(req.body); // Validate the request body using zod if not then it returns a zod error
    const userId = req.user.userId; // Get the user id from the request

    const {
      title,
      description,
      exam_type_id,
      subject,
      price,
      is_donation,
      condition_rating,
      location_city,
      image_urls
    } = validatedData;

    // Insert the new book into the database
    const newBook = await db.insert(books).values({
      seller_id: userId,
      title,
      description,
      exam_type_id,
      subject,
      price: is_donation ? null : price,
      is_donation,
      condition_rating,
      location_city,
      status: 'available'
    }).returning();

    // If there are images, insert them into the database
    if (image_urls?.length > 0) {
      const images = image_urls.map((url, i) => ({
        book_id: newBook[0].book_id,
        image_url: url,
        image_order: i + 1
      }));
      await db.insert(bookImages).values(images);
    }

    // Send the response
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book: newBook[0]
    });
  } catch (error) {
    console.error('Create book error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const {
      exam_type,
      subject,
      city,
      search,
      is_donation,
      sort_by = 'newest',
      page = 1,
      limit = 20
    } = req.query;

    // Conditions for the query
    const conditions = [eq(books.status, 'available')];

    // If the exam type is provided, add the condition to the query
    if (exam_type) conditions.push(eq(examTypes.exam_name, exam_type));
    // If the subject is provided, add the condition to the query
    if (subject) conditions.push(like(books.subject, `%${subject}%`));
    // If the city is provided, add the condition to the query
    if (city) conditions.push(like(books.location_city, `%${city}%`));
    // If the search is provided, add the condition to the query
    if (search) conditions.push(like(books.title, `%${search}%`));
    // If the is_donation is provided, add the condition to the query
    if (is_donation === 'true') conditions.push(eq(books.is_donation, true));

    // Build the query
    let query = db
      .select({
        book_id: books.book_id,
        title: books.title,
        description: books.description,
        subject: books.subject,
        price: books.price,
        is_donation: books.is_donation,
        condition_rating: books.condition_rating,
        location_city: books.location_city,
        view_count: books.view_count,
        created_at: books.created_at,
        seller_name: users.name,
        seller_city: users.city,
        seller_instagram: users.instagram_handle,
        seller_telegram: users.telegram_id,
        exam_name: examTypes.exam_name
      })
      .from(books)
      .leftJoin(users, eq(books.seller_id, users.user_id))
      .leftJoin(examTypes, eq(books.exam_type_id, examTypes.exam_type_id))
      .where(and(...conditions));

    // Sort the query
    switch (sort_by) {
      case 'price_low':
        query = query.orderBy(asc(books.price));
        break;
      case 'price_high':
        query = query.orderBy(desc(books.price));
        break;
      case 'popular':
        query = query.orderBy(desc(books.view_count));
        break;
      default:
        query = query.orderBy(desc(books.created_at));
    }

    // Calculate the offset
    const offset = (page - 1) * limit;
    // Execute the query
    const results = await query.limit(Number(limit)).offset(offset);

    // Get the images for the books
    const booksWithImages = await Promise.all(
      results.map(async (book) => {
        const images = await db
          .select({
            image_url: bookImages.image_url,
            image_order: bookImages.image_order
          })
          .from(bookImages)
          .where(eq(bookImages.book_id, book.book_id))
          .orderBy(bookImages.image_order);

        return {
          ...book,
          images: images.map(img => img.image_url)
        };
      })
    );

    // Send the response
    res.json({
      success: true,
      books: booksWithImages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: booksWithImages.length
      }
    });
  } catch (error) {
    console.error('Get all books error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get a book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    // Update the view count
    await db.update(books)
      .set({ view_count: sql`${books.view_count} + 1` })
      .where(eq(books.book_id, bookId));

    // Get the book from the database
    const book = await db
      .select({
        book_id: books.book_id,
        title: books.title,
        description: books.description,
        subject: books.subject,
        price: books.price,
        is_donation: books.is_donation,
        condition_rating: books.condition_rating,
        location_city: books.location_city,
        view_count: books.view_count,
        created_at: books.created_at,
        seller_name: users.name,
        seller_city: users.city,
        seller_instagram: users.instagram_handle,
        seller_telegram: users.telegram_id,
        exam_name: examTypes.exam_name
      })
      .from(books)
      .leftJoin(users, eq(books.seller_id, users.user_id))
      .leftJoin(examTypes, eq(books.exam_type_id, examTypes.exam_type_id))
      .where(eq(books.book_id, bookId))
      .limit(1);

    // If the book is not found
      if (!book.length) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Get the images for the book
    const images = await db
      .select({
        image_url: bookImages.image_url,
        image_order: bookImages.image_order
      })
      .from(bookImages)
      .where(eq(bookImages.book_id, bookId))
      .orderBy(bookImages.image_order);

    // Send the response
    res.json({
      success: true,
      book: {
        ...book[0],
        images: images.map(img => img.image_url)
      }
    });
  } catch (error) {
    console.error('Get book by ID error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all books for a user
export const getUserBooks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get the books for the user
    const userBooks = await db
      .select({
        book_id: books.book_id,
        title: books.title,
        subject: books.subject,
        price: books.price,
        is_donation: books.is_donation,
        status: books.status,
        view_count: books.view_count,
        created_at: books.created_at
      })
      .from(books)
      .where(eq(books.seller_id, userId))
      .orderBy(desc(books.created_at));

    // Get the images for the books
    const booksWithImages = await Promise.all(
      userBooks.map(async (book) => {
        const firstImage = await db
          .select({ image_url: bookImages.image_url })
          .from(bookImages)
          .where(eq(bookImages.book_id, book.book_id))
          .orderBy(bookImages.image_order)
          .limit(1);

        return {
          ...book,
          thumbnail: firstImage[0]?.image_url || null
        };
      })
    );

    // Send the response
    res.json({ success: true, books: booksWithImages });
  } catch (error) {
    console.error('Get user books error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update the status of a book
export const updateBookStatus = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const userId = req.user.userId;
    const { status } = req.body;

    // If the status is invalid
    if (!['available', 'sold', 'donated', 'removed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    // Get the book from the database
    const book = await db
      .select()
      .from(books)
      .where(and(eq(books.book_id, bookId), eq(books.seller_id, userId)))
      .limit(1);

    // If the book is not found
    if (!book.length) {
      return res.status(404).json({
        success: false,
        message: 'Book not found or unauthorized'
      });
    }

    // Update the book in the database
    await db.update(books)
      .set({
        status,
        sold_at: ['sold', 'donated'].includes(status) ? new Date() : null,
        updated_at: new Date()
      })
      .where(eq(books.book_id, bookId));

    // Send the response
    res.json({ success: true, message: 'Book status updated successfully' });
  } catch (error) {
    console.error('Update book status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all exam types
export const getExamTypes = async (req, res) => {
  try {
    const examTypesList = await db.select().from(examTypes).orderBy(examTypes.exam_name);
    res.json({ success: true, exam_types: examTypesList });
  } catch (error) {
    console.error('Get exam types error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

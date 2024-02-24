import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Add a book
router.post("/", async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send();
  }
});

// List of all Books

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Get a single book by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//update a single book

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(201).send(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Delete a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndDelete(id);
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

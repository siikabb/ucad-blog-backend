import express from 'express';
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
} from '../controllers/blog-controller.mjs';
import {body} from 'express-validator';

const blogRouter = express.Router();

blogRouter
  .route('/')
  .get(getEntries)
  .post(
    body('title').notEmpty().isLength({max: 255}).escape().trim(),
    body('content').notEmpty().escape().trim(),
    body('author').notEmpty().isLength({max: 255}).escape().trim(),
    postEntry
  );

blogRouter
  .route('/:id')
  .get(getEntryById)
  .put(
    body('title').isLength({max: 255}).escape().trim(),
    body('content').escape().trim(),
    body('author').isLength({max: 255}).escape().trim(),
    putEntry
  )
  .delete(deleteEntry);

export {blogRouter};

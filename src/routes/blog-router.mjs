import express from 'express';
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
} from '../controllers/blog-controller.mjs';

const blogRouter = express.Router();

blogRouter.route('/').get(getEntries).post(postEntry);

blogRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export {blogRouter};

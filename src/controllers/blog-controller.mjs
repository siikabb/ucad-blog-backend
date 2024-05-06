import {
  createEntry,
  fetchEntries,
  fetchEntryById,
  removeEntry,
  updateEntry,
} from '../models/blog-model.mjs';

const postEntry = async (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.author) {
    res.status(400);
    res.json({error: 'missing required field'});
    return;
  } else {
    const {title, content, author} = req.body;
    const result = await createEntry(title, content, author);
    if (result.error) {
      res.status(500);
      res.json(result);
      return;
    }
    res.status(201);
    res.json({message: 'entry created', id: result.insertId});
  }
};

const getEntries = async (req, res) => {
  const entries = await fetchEntries();
  if (entries.error) {
    res.status(500);
    res.json(entries);
    return;
  }
  res.status(200);
  res.json(entries);
};

const getEntryById = async (req, res) => {
  const id = req.params.id;
  const entry = await fetchEntryById(id);
  if (entry.error) {
    res.status(404);
    res.json(entry);
    return;
  }
  res.status(200);
  res.json(entry);
};

const putEntry = async (req, res) => {
  if (!req.body.title && !req.body.content && !req.body.author) {
    res.status(400);
    res.json({error: 'missing any fields to update'});
    return;
  } else if (fetchEntryById(req.params.id).error) {
    res.status(404);
    res.json({error: 'entry not found'});
    return;
  } else {
    const id = req.params.id;
    const {title, content, author} = req.body;
    const result = await updateEntry(id, title, content, author);
    if (result.error) {
      res.status(500);
      res.json(result);
      return;
    }
    res.status(200);
    res.json({message: 'entry updated', id: id});
  }
};

const deleteEntry = async (req, res) => {
  if (fetchEntryById(req.params.id).error) {
    res.status(404);
    res.json({error: 'entry not found'});
    return;
  } else {
    const id = req.params.id;
    const result = await removeEntry(id);
    if (result.error) {
      res.status(500);
      res.json(result);
      return;
    }
    res.status(204);
    res.json({message: 'entry deleted', id: id});
  }
};

export {postEntry, getEntries, getEntryById, putEntry, deleteEntry};

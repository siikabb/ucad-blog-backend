import promisePool from '../utils/database.mjs';

const createEntry = async (title, content, author) => {
  try {
    const sql = 'INSERT INTO Entries (title, content, author) VALUES (?, ?, ?)';
    const result = await promisePool.query(sql, [title, content, author]);
    return result[0].insertId;
  } catch (e) {
    console.error('error:', e);
    return {error: e.message};
  }
};

const fetchEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Entries');
    return rows;
  } catch (e) {
    console.error('error:', e);
    return {error: e.message};
  }
};

const fetchEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Entries WHERE id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error:', e);
    return {error: e.message};
  }
};

const updateEntry = async (id, title = null, content = null, author = null) => {
  try {
    const entry = await fetchEntryById(id);
    if (entry.error) {
      return entry;
    }
    const newTitle = title || entry.title;
    const newContent = content || entry.content;
    const newAuthor = author || entry.author;
    const sql =
      'UPDATE Entries SET title = ?, content = ?, author = ? WHERE id = ?';
    const result = await promisePool.query(sql, [
      newTitle,
      newContent,
      newAuthor,
      id,
    ]);
    return result[0].affectedRows;
  } catch (e) {
    console.error('error:', e);
    return {error: e.message};
  }
};

const removeEntry = async (id) => {
  try {
    const result = await promisePool.query('DELETE FROM Entries WHERE id = ?', [
      id,
    ]);
    return result[0].affectedRows;
  } catch (e) {
    console.error('error:', e);
    return {error: e.message};
  }
};

export {createEntry, fetchEntries, fetchEntryById, updateEntry, removeEntry};

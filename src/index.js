import express from 'express';
import {blogRouter} from './routes/blog-router.mjs';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.status(200);
  res.json({message: 'blog server up and running'});
});

app.use('/blog-entries', blogRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

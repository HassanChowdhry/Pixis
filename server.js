/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { getPhoto, getPhotos, createPhoto } from './database.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const safeFileName = sanitizeFilename(file.originalname);
    cb(null, Date.now() + '-' + safeFileName);
  }
});

const upload = multer({ storage: storage });

app.get('/api/photos', async (req, res) => {
  const notes = await getPhotos();
  res.send(notes);
});

app.get('/api/photo/:id', async (req, res) => {
  const note = await getPhoto(req.params.id);
  res.send(note);
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  const { location, description } = req.body;
  const source = "http://localhost:8080/" + req.file.path;
  const note = await createPhoto(source, location, description);
  res.status(201).send(note);
});


const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
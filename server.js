/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { getPhoto, getPhotos, createPhoto } from './database.js';

const port = 8080;
const app = express();
app.use(express.json());

app.use(cors());
app.use('/uploads', express.static('uploads'));

// clean file_name
function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

// store to my laptop for now
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const safeFileName = sanitizeFilename(file.originalname);
    cb(null, Date.now() + '-' + safeFileName);
  }
});

// for uploading pictures
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
  
  //* change on integration to AWS
  const source = `http://localhost:${port}/${req.file.path}`;
  const note = await createPhoto(source, location, description);
  res.status(201).send(note);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
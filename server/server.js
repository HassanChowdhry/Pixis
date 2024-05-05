/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { getUserData, getPhoto, getPhotos, createPhoto } from './database.js';

const port = 8080;
const app = express();

app.use(express.json());

app.use(cors());
app.use('/uploads', express.static('uploads'));

// clean file_name
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

// for uploading pictures
const upload = multer({ storage: storage });


app.get('/api/user_data/:user', async (req, res) => {
  const userData = await getUserData(req.params.user);
  res.send(userData);
});

app.get('/api/photos/:user', async (req, res) => {
  const photos = await getPhotos(req.params.user);
  res.send(photos);
});


app.get('/api/photo/:id', async (req, res) => {
  const photo = await getPhoto(req.params.id);
  res.send(photo);
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  const { location, description } = req.body;
  
  const source = `http://localhost:${port}/${req.file.path}`;
  const photo = await createPhoto(source, location, description);
  res.status(201).send(photo);
});

/*
Serve React App as NodeJS app
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname, "../app/build");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
})
*/

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
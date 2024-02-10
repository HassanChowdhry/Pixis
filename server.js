/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';

import { getPhoto, getPhotos, createPhoto } from './database.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/photos', async (req, res) => {
  const notes = await getPhotos();
  res.send(notes);
});

app.get('/api/photo/:id', async (req, res) => {
  const note = await getPhoto(req.params.id);
  res.send(note);
});

app.post('/api/photos', async (req, res) => {
  const { source, location, description } = req.body;
  const note = await createPhoto(source, location, description);
  res.status(201).send(note);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
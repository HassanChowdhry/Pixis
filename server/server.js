/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import sharp from 'sharp';
import dotenv from 'dotenv'; dotenv.config();

import { getUserData, getPhoto, getPhotos, createPhoto, userExists, postUserData, deletePhoto } from './database.js';

const port = 8080;
const app = express();

const ak = process.env.ACCESS_KEY
const sak = process.env.SECRET_ACCESS_KEY
const bn = process.env.BUCKET_NAME
const br = process.env.BUCKET_REGION

const s3 = new S3Client({
  credentials: {
    accessKeyId: ak,
    secretAccessKey: sak
  },
  region: br
})

const jwtSecretKey = process.env.jwtSecretKey;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// clean file_name
function sanitizeFilename(bytes=32) {
  return crypto.randomBytes(bytes).toString('hex');
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
})

app.get('/api/user_data/:user', async (req, res) => {
  const userData = await getUserData(req.params.user);
  res.send(userData);
});

app.get('/api/photos/:user', async (req, res) => {
  const photos = await getPhotos(req.params.user);
  console.log(photos)
  //cconst client = new S3Client(clientParams);
  for (const photo of photos) {
    const getObjectParams = {
      Bucket: bn,
      Key: photo.source
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    photo.source = url;
  }
  res.send(photos);
});

app.get('/api/photo/:id', async (req, res) => {
  const photo = await getPhoto(req.params.id);
  res.send(photo);
});

app.delete('/api/photo/:id', async(req, res) => {
  const id = req.params.id

  const photo = await getPhoto(id);
  if (!photo) {
    res.status(404).send("Post Not Found!");
    return
  }

  const params = {
    Bucket: bn,
    Key: photo.source
  }

  console.log("HERE 1")
  const command = new DeleteObjectCommand(params);
  console.log("HERE 2")
  await s3.send(command);

  await deletePhoto(id);
  res.status(200).send(photo)
})

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  const { location, caption, userID } = req.body;
  const buffer = await sharp(req.file.buffer).resize({height: 1920, widht: 1080, fit: "contain"}).toBuffer();
  const filename = sanitizeFilename()
  const params = {
    Bucket: bn,
    Key: filename, // change naming convention
    Body: buffer,
    ContentType: req.file.mimetype
  }
  const command = new PutObjectCommand(params);
  await s3.send(command)
  const photo = await createPhoto(filename, location, caption, userID);
  res.status(201).send(photo);
});


app.post('/auth/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body 

  // lookup user in database using email
  if (await userExists(email)) {
    res.status(401).json({ message: 'User already exists' })
  } else {
    // TODO: Hash using SHA1
    bcrypt.hash(password, 10, async function(err, hash) {
      console.log({ firstName, lastName, email, password: hash })
      
      const user = await postUserData(firstName, lastName, email, hash);

      let loginData = { email, signInTime: Date.now() };
      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: 'success', token });
    })
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body 

  // lookup user in database using email
  if (await userExists(email)) {
    const user = (await getUserData(email))[0];
    bcrypt.compare(password, user.password, function(err, result) {
      if (!result) {
        return res.status(401).json({ message: 'Invalid Password' })
      } else {
        let loginData = {
          email, signInTime: Date.now(),
        }

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: 'success', token });
      }
    })
  } else {
    // should throw an error that is caught by frontend
    res.status(401).json({ message: 'User does not exist' })
  }
});

app.post('/auth/verify', (req, res) => {
  const token = 'jwt-token';
  const authToken = req.headers[token]
  try {
    const verified = jwt.verify(authToken, jwtSecretKey)
    if (verified) {
      return res.status(200).json({ status: 'logged in', message: 'success' })
    } else {
      // Access Denied
      return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: 'invalid auth', message: 'error' })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
import express from 'express';
import methodOverride from 'method-override';
import ejs from 'ejs';
import Photo from './models/Photo.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import fs from 'fs';

const app = express();

// connect db
mongoose.connect('mongodb://localhost/pcat-db');

// MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

// EJS TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// ROUTES

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index.ejs', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/add', (req, res) => {
  res.render('add.ejs');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = './public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findById({ _id: req.params.id });
  res.render('edit.ejs', { photo });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findById({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});

// port listen
const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

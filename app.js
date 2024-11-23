import express from 'express';
import ejs from "ejs";
import Photo from "./models/Photo.js";
import mongoose from 'mongoose';

const app = express();

// connect db
mongoose.connect("mongodb://localhost/pcat-db");

// MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS TEMPLATE ENGİNE
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index.ejs', {
    photos
  });
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {photo});
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/add', (req, res) => {
  res.render('add.ejs');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});


// port listen
const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

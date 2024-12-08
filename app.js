import express from 'express';
import methodOverride from 'method-override';
import ejs from 'ejs';
import dotenv from "dotenv";
import connectionDB from "./config/db.js";
import fileUpload from 'express-fileupload';
import * as photoControllers from "./controllers/photoControllers.js";
import * as pageControllers from "./controllers/pageControllers.js";


const app = express();
dotenv.config();
// connect db
connectionDB();

// MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);


// EJS TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// ROUTES

app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.get("/photos", photoControllers.getAllPhotos);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);

// port listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

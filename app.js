import express from 'express';

const app = express();

// MİDDLEWARES
app.use(express.static('public'));

// EJS TEMPLATE ENGİNE
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/add', (req, res) => {
  res.render('add.ejs');
});

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

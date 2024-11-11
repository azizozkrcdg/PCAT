import express from 'express';

const app = express();

// MİDDLEWARES
app.use(express.static('public'));

// EJS TEMPLATE ENGİNE
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

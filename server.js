const path = require('path');
const hbs = require('express-handlebars');
const express = require('express');
const multer = require('multer');

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get("/about", (req, res) => { 
  res.render("about");
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('projectFile'), (req, res) => {
    const { author, sender, title, message } = req.body;
    const file = req.file;

    if (author && sender && title && message) {
        let filename = null;
        if (file) {
            filename = file.originalname; // Możemy użyć tutaj oryginalnej nazwy pliku
        }
        res.render('contact', { isSent: true, filename: filename });
    } else {
        res.render('contact', { isError: true });
    }
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

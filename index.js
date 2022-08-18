// I don't know what any of this does 

const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

console.log('Ready to go!')

// Logs info about requests
app.use((req, res, next) => {
  console.log('A new request was made:');
  console.log('From this IP address:', req.socket.remoteAddress);
  console.log('At this domain: ', req.hostname);
  console.log('At this subdirectory: ', req.path);
  console.log('Using: ', req.method);
  next();
});
// Something
app.use((req, res, next) => {
  console.log('Total information:');
  next();
});

// morgan does its magic
app.use(morgan('dev'));

// ??
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// The main dish
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.get('/import', (req, res) => {
  res.render('import')
})
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', {title: 'asdf' });
});

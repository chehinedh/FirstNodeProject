const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// listen for requests
app.listen(3000);

// connect to mongodb
const db ="mongodb+srv://chehine:chehine123@cluster0.ct5uiny.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));

app.use((res, req, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method; ', req.method);
  next();
});

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    } )
});

app.get('/single-blog', (res, req) => {
  Blog.findById()
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) =>{
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
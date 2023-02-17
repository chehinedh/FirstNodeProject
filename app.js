const express = require('express');

// express app
const app =express();

// register view engine
app.set('view engine', 'ejs');


// listen for request
app.listen(3000);

//listen for response
app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    const blogs = [
      {
        title: "Yoshi finds eggs",
        snippet: "Lorem ipsum dolor sit amet consectetur",
      },
      {
        title: "Mario finds stars",
        snippet: "Lorem ipsum dolor sit amet consectetur",
      },
      {
        title: "How to defeat bowser",
        snippet: "Lorem ipsum dolor sit amet consectetur",
      },
    ];
    res.render('index', { title: 'Home' });
});

app.get("/about", (req, res) => {
    //res.send("<p>about page</p>");
    res.render("about", { title: "Home" });
});

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// }); 

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Home" });
})

// 404 page
app.use((req,res) => {
    res.status(404).render("404", { title: "Home" });
});
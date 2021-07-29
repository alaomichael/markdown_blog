const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/markdownblog',{ useNewUrlParser: true,
useUnifiedTopology: true, useCreateIndex: true })

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get("/", async (req, res) => {
const articles = await Article.find().sort({
    createdAt: 'desc'
})
res.render('articles/index', {articles: articles});
});

app.use('/articles', articleRouter)

// Not Found Page
app.get("*", (req, res) => {
  res.render('articles/notfound', { article: "Not Found"})
});

app.listen(port, () => `Server running on port ${port} 🔥`);

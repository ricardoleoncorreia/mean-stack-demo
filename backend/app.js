const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect('mongodb+srv://rick:EMcB6SS2FKeXjqBY@meanstackdemo.asehx.mongodb.net/demo?retryWrites=true&w=majority', mongoOptions)
        .then(() => console.log('Connected to database!'))
        .catch(() => console.log('Connection failed!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      body: createdPost._id
    });
  })
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      body: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id }).then(_ => {
    res.status(204).json({ message: 'Post deleted!' });
  });
});

module.exports = app;

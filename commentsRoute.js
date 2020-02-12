const express = require('express')
const postData = require('./data/db')

const router = express.Router();

router.use(express.json())

//Make a post
router.post('/', (req, res) => { 
  if(req.body.title && req.body.contents){
  postData.insert(req.body)
  .then(post =>{
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
  } else {
    res.status(404).json({errorMessage: "Please enter both a title and content"})
  }
})

//Make a comment given a post ID
router.post('/:id/comments', (req, res) => {
  if(req.body.length > 0){
  postData.insertComment({text: req.body.text, post_id:req.params.id })
  .then(comment => {
    res.status(201).json(comment)
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
  } else {
    res.status(404).json({errorMessage: "Please enter a comment"})
  }
})


//Get posts
router.get('/', (req, res) => {
  postData.find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
});

//Get post by ID
router.get('/:id', (req, res) => {
  postData.findById(req.params.id)
  .then(post => {
    if(post){
      res.status(200).json(post)
    } else {
      res.status(404).json({errorMessage: "Couldn't find that post"})
    }
  })
      .catch(err => {
        res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

//Get post comments by post ID
router.get('/:id/comments', (req, res) => {

  postData.findById(req.params.id)
  .then(post => {
    if(post.length > 0){
  postData.findPostComments(req.params.id)
  .then(comments => {
    if(comments.length === 0){
      res.status(404).json({errorMessage: "This post has no comments"})
    } else {
      res.status(200).json(comments)
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })

  } else {
    res.status(404).json({errorMessage: "Post does not exist"})
  }
  })
})

//Delete post by ID
router.delete('/:id', (req, res) => {
  postData.remove(req.params.id)
  .then(deleted => {
    if(deleted){
      res.status(200).json({successMessage: "Succesfully deleted"})
    } else {
      res.status(404).json({errorMessage: "Couldn't find that post"})
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.put('/:id', (req, res) => {
  postData.update(req.params.id, req.body)
  .then(changed => {
    if(changed){
      res.status(200).json({successMessage: "Succesfully editted"})
    } else {
      res.status(404).json({errorMessage: "Couldn't find that post"})
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

module.exports = router
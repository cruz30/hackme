import mongoose from 'mongoose';
import {Router} from 'express';
import Post from '../model/post';

export default({config, db}) => {
  let api = Router();

  // '/v1/post/add' - Creates a post
  api.post('/add', (req, res) => {
    let newPost = new Post();
    newPost.user = req.body.user;

    newPost.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Message posted successfully'});
    });
  });

  // '/v1/post' - Read all public posts
  api.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) {
        res.send(err);
      }
      res.json(posts);
    });
  });

  // '/v1/post/:id' - Read 1 post
  api.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  });

  // '/v1/post/:id' - Update a post
  api.put('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      post.user = req.body.user;
      post.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Your post has been updated"});
      });
    });
  });

  // 'v1/post/:id' - Delete a post
  api.delete('/:id', (req, res) => {
    Post.remove({
      _id: req.params.id
    }, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Your post has been removed"});
    });
  });

  return api;
}

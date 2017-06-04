import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import post from '../controller/post';
import account from '../controller/account';

let router = express();

// connect to db
initializeDb(db => {

  // initialize middleware
  router.use(middleware({config, db}));

  // api route v1
  router.use('/post', post({config, db}));
  router.use('/account', account({config, db}));
});

export default router;

import mongoose from 'mongoose';
import {Router} from 'express';
import Account from '../model/account';

export default({config, db}) => {
  let api = Router();

  // '/v1/account/register' - registers an account
  api.post('/register/', (req, res) => {
    Account.findOne({userName: req.body.userName}, (err, account) => {
      if (err) {
        res.send(err);
      }
      if (!account) {
        let newAccount = new Account();
        newAccount.userName = req.body.userName;
        newAccount.password = req.body.password;

        newAccount.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({message: 'Account created successfully'});
        });
      }
      else {
        res.json({message: 'This account name is already taken'});
      }
    });
  });

  // '/v1/account/login' - Log in to an account
  api.post('/login/:userName&:password', (req, res) => {
    Account.findOne({userName: req.params.userName}, (err, account) => {
      if (err) {
        res.send(err);
      }
      if (req.params.password === account.password) {
        res.json(account);
      }
      else {
        res.json({message: 'Incorrect password'});
      }
    });
  });

  return api;
}

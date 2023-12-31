const express = require('express');

const getAllUsers = (req,res) => {
  res.status(200).json({
    status: 'not available',
    message: 'route not yet defined'
  });
}

const createUser = (req,res) => {
  res.status(200).json({
    status: 'not available',
    message: 'route not yet defined'
  });
}

const getUser = (req,res) => {
  res.status(200).json({
    status: 'not available',
    message: 'route not yet defined'
  });
}

const updateUser = (req,res) => {
  res.status(200).json({
    status: 'not available',
    message: 'route not yet defined'
  });
}

const deleteUser = (req,res) => {
  res.status(200).json({
    status: 'not available',
    message: 'route not yet defined'
  });
}

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
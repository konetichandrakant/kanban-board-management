const express = require('express');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const jwtverify = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, SECRET_KEY);
    req['id'] = id;
    next();
  } catch (e) {
    return res.send(false);
  }
}

module.exports = { jwtverify }
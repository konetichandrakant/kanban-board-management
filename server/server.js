const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { User } = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;
const REQUEST_URL = process.env.REQUEST_URL;

const corsOptions = {
  origin: `${REQUEST_URL}/*`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // No Content for preflight requests
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }));
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected to database....');
}).catch((err) => {
  console.log(err);
})

const { jwtverify } = require('./jwtverification');

app.use(express.json())

app.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const data = await User.findOne({ username: userId });
    if (data['password'] !== password)
      return res.send(false);
    const token = jwt.sign({ id: data['_id'] }, process.env.SECRET_KEY);
    return res.send({ token: token });
  } catch (error) {
    return res.send(false);
  }
})

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDetails = await User.findOne({ username: username });
    if (userDetails !== null)
      return res.json(false)
    const newUser = new User({ username: username, password: password, tasks: { todo: [], doing: [], done: [] } });
    await newUser.save();
    return res.send(true)
  } catch (error) {
    return res.send(false);
  }
})

app.get("/tasks", jwtverify, async (req, res) => {
  const { tasks } = await User.findById(req['id']);
  return res.send(tasks);
})

app.post("/tasks", jwtverify, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req['id'], { tasks: req.body })
    return res.send('updated');
  } catch (e) {
    return res.send('failed to update');
  }
})

app.listen(PORT)
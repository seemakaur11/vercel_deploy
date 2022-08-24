const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

//connect database
connectDB();
//Init middleware
app.use(express.json({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './client/src/uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// var upload = multer({ storage: storage }).single('image');

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = 5005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

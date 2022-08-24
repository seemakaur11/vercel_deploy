const express = require('express');
const app = express();
const path = require('path');

// app.get('/', (req, res) => res.send('hello seema'));

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = 5005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

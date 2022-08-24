const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello seema'));
const PORT = 5005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

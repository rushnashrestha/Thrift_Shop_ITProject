const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const route = require('./route');

app.use(express.json());

app.use('/', route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
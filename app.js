const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT || 8008, () => {
  console.log('app is running!');
});
const express = require('express');
const app = express();
const { GetData } = require('./assests/fetchdata.js');
const { BlogSearch } = require('./assests/blogsearch.js');
const port = 3000;

// TO get fetch data
app.get('/api/blog-stats',GetData)

// Process Query
app.get('/api/blog-search',BlogSearch);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

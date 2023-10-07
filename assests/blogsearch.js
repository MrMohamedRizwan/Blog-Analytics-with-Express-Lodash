const fs = require("fs");

async function calljson() {
    try {
      // Reading from json file
      const filePath = 'output.json';
      const yy = fs.readFileSync(filePath);
      let xx = JSON.parse(yy);
      return xx;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function BlogSearch(req,res){
    const y = await calljson();
    // Query request
    var query = req.query.query;
  
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is missing' });
    }
    query = query.toLowerCase();
    const matchingBlogs = [];
    // Storing it in array
    const arr =y.Unique_blog_title;
  
    for(let i=0;i<arr.length;i++)
    {
      const name=arr[i];
      if (name.toLowerCase().includes(query)) {
        matchingBlogs.push(name);
      } 
    }
    // console.log(matchingBlogs);
  
    res.send(matchingBlogs);
}
module.exports={BlogSearch};
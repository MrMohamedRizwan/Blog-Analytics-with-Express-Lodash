const express = require('express');
const axios = require('axios');
const fs = require("fs");
const app = express();
const _ = require('lodash');
const ConvertToJson = require('./converttojson.js');
async function FetchAndAnalyzeBlogData() {
  // Fetching from curl request
    try {
      const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
      });
      
      const jsonData = response.data;
      
      const totalBlogs = _.size(jsonData.blogs);

      const blogWithLongestTitle = jsonData.blogs.reduce((prevBlog, currentBlog) => {
        return prevBlog.title.length > currentBlog.title.length ? prevBlog : currentBlog;
      }, jsonData.blogs[0]);
  
      const blogsWithPrivacy = jsonData.blogs.filter(blog => blog.title.toLowerCase().includes("privacy"));

      const numberOfBlogsWithPrivacy = blogsWithPrivacy.length;
  
      const uniqueBlogTitles = [...new Set(jsonData.blogs.map(blog => blog.title))];
      // Storing it in json format
      const getdata = {
        Total_number_of_blogs: totalBlogs,
        Longest_title: blogWithLongestTitle,
        Privacy_number: numberOfBlogsWithPrivacy,
        Unique_blog_title: uniqueBlogTitles
      };
  
      // Convert to JSON and store it in output.json
      ConvertToJson(getdata);
  
      return getdata;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  // Memoize function for cache memory
  const memoizedFetchAndAnalyze = _.memoize(FetchAndAnalyzeBlogData, () => Date.now() - 3600000);


async function GetData(req,res){
    try {
        const getdata = await memoizedFetchAndAnalyze();
        res.json(getdata);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports={GetData};
const router = require("express").Router();
const bookModel = require("../models/booksModel");
const request = require('request');
const cheerio = require('cheerio');

router.post("/get-news", async (req,res)=>{
    let options = {url: 'https://uplb.edu.ph/news-and-updates-2/',
        headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'}};
    try{
        function doGetNewsLinks() {
            return new Promise(function (resolve, reject) {
                request(options, function(err, resp, html) {
                    var newsLinks = [], newsTitle = [], newsDate = [], newsImg = [];
                    if (!err) {
                        const $ = cheerio.load(html);
                        let finalTagLink = '.jet-smart-listing__post-content > .jet-smart-listing__post-title > a'; // get the news links
                        let finalTagDate = '.post__date-link  > time'; // get the news date
                        let finalTagImg = '.jet-smart-listing__post-thumbnail  > a > img'; // get the news date 
                        let lenNewsLinks = $(finalTagLink, html).length; // length of array
                        
                        for(i=0;i<lenNewsLinks;i++) newsLinks.push($(finalTagLink, html)[i].attribs.href); //loop the result of the data (link)
                        for(i=0;i<lenNewsLinks;i++) newsImg.push($(finalTagImg, html)[i].attribs.src); //loop the result of the data (link)
                        $(finalTagLink).each((index, li) => {newsTitle[index] = $(li).text();}) //loop the result of the data (title)
                        $(finalTagDate).each((index, li) => {newsDate[index] = $(li).text();}) //loop the result of the data (date)
                        
                    }
                    var newsInformation = {newsLinks,newsTitle, newsDate, newsImg};
                    resolve(newsInformation); //acts as return statement
                })
            });
        }
        let respond = await doGetNewsLinks();
        res.send(respond);
    }catch(err){
        res.status(404).send("404 Not Found");
    }
});






router.get("/get-news", async (req,res)=>{
    console.log("here")
});

router.post("/", async (req,res)=>{
    try{
        const {title, author} = req.body; 

        // sample verification: incomplete fields
        if(!title||!author){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newBook = new bookModel ({
            title, author
        });

        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user:'naveenkumawat19952',
    database:'naveenkumawat19952',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = {
    'article-one': {
    title: 'article one naveen',
    date: 'sep 5, 2017',
    heading: 'article one',
    content:` 
    <p>
                
                This is the content for my last article. This is the content for my last article This is the content for my last article This is the content for my last article
    </p>
            
    <p>
                
                This is the content for my last article. This is the content for my last article This is the content for my last article This is the content for my last article
    </p>
    <p>
                This is the content for my last article. This is the content for my last article This is the content for my last article This is the content for my last article
    </p>`
},
    'article-two': { title: 'article 2 , naveen',
    heading: 'artile two',
    date: 'sep 12, 2017',
    content: `
    <p>
                
                This is the second article
            </p>
            
            <p>
                
                This is my 222222222222222
            <p>
                This is pta nhi 
            </p>`},
    'article-three': {}
};
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `<html>
    <head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scal=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    <body>
        <div class="container">
            <div>
                <a href="/">home</a>
            </div>
        <hr>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000,512, 'sha512' );
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('@');
}

app.post('/create-user', function(req,res){
    
    
   var username = req.body.username;
   var password = req.body.password;
    
   var salt= crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
    pool.query('INSERT INTO "user"(username,password)VALUES($1,$2)',[username,dbString],function(err,result){
        if(err){
           res.status(500).send(err.toString())
;         
       }
       
       else{
           res.send("user successfully created: "+username);
       }
    });
});

app.get('/hash/:input', function(req,res){
    var hashedString = hash (req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
   var salt = crypto.getRandomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username,password)VALUES($1,$2)', [username,dbString],function(err,result){
        if(err){
           res.status(500).send(err.toString())
;         
       }
       
       else{
           res.send("User successfully created:" +username);
       }
       
   });
    
});

var pool = new Pool(config); 

app.get('/test-db', function(req,res){
    //return a response
   pool.query('SELECT *  FROM test', function(err,result){
       if(err){
           res.status(500).send(err.toString())
;         
       }
       
       else{
           res.send(JSON.stringify(result.rows));
       }
   }) ;
} );

var counter=0;
app.get('/counter',function(req , res){
    counter = counter+1;
    res.send(counter.toString());
    
});

var names = []; 
app.get('/submit-name',function(req,res){
    var name = req.query.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req,res){
    //var articleName = req.params.articleName;
    
    
    pool.query("SELECT * FROM article WHERE title = $1" + [req.params.articleName], function(err,result){
        if(err){
            res.status(500).send(toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(404).send('Article not found');
            }else{
                var articleData= result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi2.png'));
});
 

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
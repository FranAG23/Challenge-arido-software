const express = require('express');
const app = express();
const cors = require('cors');

//middlewares
app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(cors());

//routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('server on port 3000');
const express = require("express");
const db = require('./config/db');
const app = express();
const port = 7000;
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});

db.query('SELECT * FROM Login', function(err, rows) {
    if (err) throw err;
    console.log('Response: ', rows);
});
app.post("/signin", function(req, res) {
    const { id, password } = req.body;
    db.query(
      `SELECT * FROM Login WHERE id='${id}' AND password='${password}'`,
      function(err, rows, fields) {
        console.log(id);
        if (rows.length === 0) {
          return res.send('false');
        };
        console.log(rows);
        return res.send('true');
      }
    );
});
app.post("/createAcc", function(req, res) {
    const { id, password } = req.body;
    db.query(
      `INSERT INTO Login(id, password) VALUES('${id}', '${password}')`,
      function(err, rows, fields) {
        if (err) throw err;
        return res.send('true');
      }
    );
});



db.query('SELECT * FROM Book',function(err,rows){
    if(err) throw err;
    console.log('Response: ', rows);
});
app.post("/book",function(req, res){
    db.query(
        `SELECT * FROM Book `,
        function(err,rows,fields){
           return res.send(rows); 
        }
    );
})
app.post("/delBook",function(req, res){
    const {id} = req.body;
    console.log(id);
    db.query(`DELETE FROM Book WHERE id=${id}`,
    function(err,rows,fields){
       return res.send(rows);
    });
});
app.post("/addBook",function(req, res){
    const {id,name,type,author,seller} = req.body;
    console.log(name);
    db.query(`INSERT INTO Book(id, name, type, author, seller) VALUES('${id}', '${name}', '${type}', '${author}', '${seller}')`,
    function(err,rows,fields){
        console.log(rows);
       return res.send('true');
    });
});
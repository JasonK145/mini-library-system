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
    const {id,name,type,author,seller,state} = req.body;
    db.query(`INSERT INTO Book(id, name, type, author, seller, state) VALUES('${id}', '${name}', '${type}', '${author}', '${seller}','${state}')`,
    function(err,rows,fields){
        console.log(rows);
       return res.send('true');
    });
});
app.post("/CorBook",function(req, res){
    const {id,name,type,author,seller} = req.body;
    console.log({name}.name+"a");
    db.query(`UPDATE Book SET id='${id}', name='${name}', type='${type}', author='${author}', seller='${seller}' WHERE id='${id}'`,
    function(err, rows, fields){
        return res.send(rows);
    });
});
app.post("/upDateState",function(req, res){
    const {id,state} = req.body;
    db.query(`UPDATE Book SET state='${state}' WHERE id=${id}`,
    function(err, rows, fields){
        return res.send(rows);
    });
});
app.post("/borrowed_book",function(req, res){
    db.query(
        `SELECT * FROM Book WHERE state='借出' `,
        function(err,rows,fields){
           return res.send(rows); 
        }
    );
})
app.post("/have_not_borrow_book",function(req, res){
    db.query(
        `SELECT * FROM Book WHERE state='未借出' `,
        function(err,rows,fields){
           return res.send(rows); 
        }
    );
})
app.post("/search",function(req, res){
    const {select} = req.body;
    console.log(select);
    db.query(
        `SELECT * FROM Book WHERE type='${select}'`,
        function(err,rows,fields){
            console.log(rows);
            return res.send(rows);
        }
    )
})
app.post("/borrow_search",function(req, res){
    const {select} = req.body;
    console.log("borrow_search");
    db.query(
        `SELECT * FROM Book WHERE state='未借出' AND type='${select}'`,
        function(err,rows,fields){
            console.log(rows);
            return res.send(rows);
        }
    )
})
app.post("/return_search",function(req, res){
    const {select} = req.body;
    console.log("return_search");
    db.query(
        `SELECT * FROM Book WHERE state='借出' AND type='${select}'`,
        function(err,rows,fields){
            console.log(rows);
            return res.send(rows);
        }
    )
})
app.post("/search_booktype",function(req, res){
    const {select} = req.body;
    console.log(select);
    db.query(
        `SELECT * FROM Book WHERE type='${select}' OR id='${select}' OR name='${select}' OR author='${select}' OR seller='${select}'`,
        function(err,rows,fields){
            console.log(rows);
            return res.send(rows);
        }
    )
})

/*
db.query('SELECT * FROM Borrowed_Book',function(err,rows){
    if(err) throw err;
    console.log('Response: ', rows);
});

app.post("/InsertBorrowedBook",function(req, res){
    const {id,name,type,author,seller} = req.body;
    console.log(id);
    db.query(`INSERT INTO Borrowed_Book(id, name, type, author, seller) VALUES('${id}', '${name}', '${type}', '${author}', '${seller}')`,
    function(err,rows,fields){
       return res.send('true');
    });
});
app.post("/returnBook",function(req, res){
    const {id} = req.body;
    db.query(`DELETE FROM Borrowed_Book WHERE id='${id}'`,
    function(err, rows, fields){
        return res.send(rows);
    });
});
*/
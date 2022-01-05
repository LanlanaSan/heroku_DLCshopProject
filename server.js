const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

var mysql = require('mysql');
var ss = require('express-session');
var bp = require('body-parser');
var path = require('path');
const session = require('express-session');
const { response } = require('express');
const { dirname } = require('path/posix');
var cookieParser = require('cookie-parser')

app.get("/", (req, res)=>{
    //res.json({result: "ok", data:[1,2,3,4,5]})
    res.sendFile('./all.html', { root: __dirname });
})

const s = ['s_20','s_imas','s_miku','s_god','s_christ','s_touhou'];
const s1 = [];

/*
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'account'
})
connection.connect(function (err) { // check database connection
    if (err) throw err;
    console.log("Connected!");
});
connection.query(`SELECT `+s[1]+` FROM accounts WHERE username = 'don' AND password = 'taikono2000'`, (err, res) => {
    return console.log(res);
});
*/

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.get('/login', function (req, res) {
    //res.sendFile(path.join(__dirname + 'login.html'))
    res.sendFile('./login.html', { root: __dirname });
});

/*
app.post('/regis', function (req, response) {
    var username = req.body.username;
    var password = req.body.password;
    var q = `INSERT INTO accounts(username, password) VALUES ('`+username+`','`+password+`')`;
    connection.query(q, (err, res) => {});
    response.redirect('/login')
})
app.post('/auth-login', function (req, response) {
    var username = req.body.username;
    var password = req.body.password;
    //console.log("u ="+ username);
    //console.log("p ="+ password);
    var q = `SELECT id FROM accounts WHERE username = '` + username + `' AND password = '` + password + `'`;
    connection.query(q, (err, res, fields) => {
        console.log(q);
        console.log(res);
        if (res.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            //document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
            //(username)
            //response.send('success');
            //response.sendFile('./mdon.html', { root: __dirname })
            for (let i = 0; i < s.length; i++) {
                connection.query(`SELECT `+s[1]+` FROM accounts WHERE username = '`+req.body.username+`'`, (err, res) => {
                    s1[i] = res.toString;
                    console.log(s1[i]);
                });
                //s1[i] = ;
              }
            response.redirect('/md')
            //console.log(req.session.username);
        } else {
            response.send('Incorrect user');
            //res.end;
        }//res.end;
    })
});
*/

app.get('/md', function (req, res) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {

        

        var t = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Cart</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <style>
                .jumbotron{
                    background-color: coral;
                }
                
                .btn btn-primary{
                    background-color: coral;
                }
            </style>
        </head>
        <body>
        
        <div class="jumbotron text-center white">
          <h1>Donder Store</h1>
          <p>好きな楽曲を購入してどこドン！！</p>
        </div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">My Don</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><a href="/home">Home</a></li>
              <li><a href="/all">All music</a></li>
            <li><a href="/cart">Cart</a></li>
            </ul>
          </div>
        </nav>
        <h1>Welcome, ` + req.session.username + `</h1>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Songs Pack</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>太鼓の達人２０周年</td>
            <td>`+s1[0]+`</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>THE IDOLM@STER 限定版</td>
            <td>`+s1[1]+`</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>達人チャレンジパック</td>
            <td>`+s1[2]+`</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>東方Projectアレンジパック</td>
            <td>`+s1[3]+`</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>初音ミクパック</td>
            <td>`+s1[4]+`</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>クリスマスパック</td>
            <td>`+s1[5]+`</td>
          </tr>
        </tbody>
      </table>
      <br>
      <a href='/logout'>Log out</a>
    </body>`

    res.send(t)
    }
})

app.get('/reg', function (req, res) {
    res.sendFile('./reg.html', { root: __dirname });
});


app.get('/logout', function (req, res) {
    req.session.loggedin = false;
    res.redirect('/login');
});

app.get('/gg', function (req, res) {
    if (req.session.loggedin) {
        res.send('WB' + req.session.username);
    } else {
        res.send('login してくれ');
    }
});

app.get('/tt', function (req, res) {
    res.sendFile('./login.html', { root: __dirname });
});

app.get('/all', function (req, res) {
    res.sendFile('./all.html', { root: __dirname });
});

app.get('/home', function (req, res) {
    res.sendFile('./Homepage.html', { root: __dirname });
});

app.get('/cart', function (req, res) {
    res.sendFile('./cart.html', { root: __dirname });
});

app.get('/mdon', function (req, res) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        res.sendFile('./mdon.html', { root: __dirname });
    }
});

/*
app.get('/add_20y', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_20y = 1 WHERE username = '` + req.session.username + `'`)
        //alert("Add to cart successfully");
        console.log("Add s_20y to cart successfully u = " + req.session.username)
        //var t = connection.query(`SELECT s_20y FROM accounts WHERE username = '` + req.session.username + `'`)
        //console.log(t)
    } 
})
app.get('/buy_20y', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_20y = 2 WHERE username = '` + req.session.username + `'`)
        //alert("Purchase successfully");
        console.log("buy s_20y to cart successfully u = " + req.session.username)
    }
})
app.get('/add_imas', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_imas = 1 WHERE username = '` + req.session.username + `'`)
        //alert("Add to cart successfully");
        console.log("Add s_imas to cart successfully u = " + req.session.username)
    }
})
app.get('/buy_imas', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_imas = 2 WHERE username = '` + req.session.username + `'`)
        //alert("Purchase successfully");
        console.log("buy s_imas to cart successfully u = " + req.session.username)
    }
})
app.get('/add_miku', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_miku = 1 WHERE username = '` + req.session.username + `'`)
        //alert("Add to cart successfully");
        console.log("Add s_miku to cart successfully u = " + req.session.username)
    }
})
app.get('/buy_miku', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_miku = 2 WHERE username = '` + req.session.username + `'`)
        //alert("Purchase successfully");
        console.log("buy miku to cart successfully u = " + req.session.username)
    }
})
app.get('/add_god', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_god = 1 WHERE username = '` + req.session.username + `'`)
        //alert("Add to cart successfully");
        console.log("Add s_god to cart successfully u = " + req.session.username)
    }
})
app.get('/buy_god', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_god = 2 WHERE username = '` + req.session.username + `'`)
        //alert("Purchase successfully");
        console.log("buy s_god to cart successfully u = " + req.session.username)
    }
})
app.get('/add_christ', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_christ = 1 WHERE username = '` + req.session.username + `'`)
        //alert("Add to cart successfully");
        console.log("Add s_christ to cart successfully u = " + req.session.username)
    }
})
app.get('/buy_christ', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_christ = 2 WHERE username = '` + req.session.username + `'`)
        //alert("Purchase successfully");
        console.log("buy s_christ to cart successfully u = " + req.session.username)
    }
})
app.get('/add_touhou', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_touhou = 1 WHERE username = '` + req.session.username + `'`)
        //alert("Add to cart successfully");
        console.log("Add s_miku to cart successfully u = " + req.session.username)
    }
})
app.get('/buy_touhou', function (req, res, field) {
    if (!req.session.loggedin) {
        res.sendFile('./login.html', { root: __dirname });
    } else {
        connection.query(`UPDATE accounts SET s_touhou = 2 WHERE username = '` + req.session.username + `'`)
        //alert("Purchase successfully");
        console.log("buy s_touhou to cart successfully u = " + req.session.username)
    }
})
*/
app.listen(PORT, ()=>{
    console.log(`Serer is running. ${PORT}`)
})

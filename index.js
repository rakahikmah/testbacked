const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const multer = require('multer');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testlogique'
});



//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

// //tampilkan semua data product
app.get('/api/users', (req, res) => {

    if (req.headers.key != 'HiJhvL$T27@1u^%u86g') {
        return res.json({
            status: 403,
            error: "API key is missing"
        });
    }
    let sql = "SELECT * FROM users";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });


});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({
    storage: storage
});

app.post('/api/image-upload', upload.single('image'), (req, res) => {
    const image = req.image;
    res.send(apiResponse({
        message: 'File uploaded successfully.',
        image
    }));
});

function apiResponse(results) {
    return JSON.stringify({
        "status": 200,
        "error": null,
        "response": results
    });
}


// //tampilkan data users berdasarkan id
app.get('/api/user/:id', (req, res) => {
    if (req.headers.key != 'HiJhvL$T27@1u^%u86g') {
        return res.json({
            status: 403,
            error: "API key is missing"
        });
    }
    let sql = "SELECT * FROM users WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

// //Tambahkan data users baru
app.post('/api/user', (req, res) => {
    if (req.headers.key != 'HiJhvL$T27@1u^%u86g') {
        return res.json({
            status: 403,
            error: "API key is missing"
        });
    }

    let data = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body,
        password,
        photos: req.body.photos,
        creditcard_type: req.body.creditcard_type,
        creditcard_number: req.body.creditcard_number,
        creditcard_expired: req.body.creditcard_expired,
        creditcard_cvv: req.body.creditcard_cvv
    };

    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Edit data users berdasarkan id
app.put('/api/user/:id', (req, res) => {
    let sql = "UPDATE users SET name='" + req.body.name + "', address='" + req.body.address + ", email='" + req.body.email + "', passowrd='" + req.body.passowrd + "', photos='" + req.body.photos + "', creditcard_type='" + req.body.creditcard_type + "', creditcard_number='" + req.body.creditcard_number + "', creditcard_expired='" + req.body.creditcard_expired + "', creditcard_cvv='" + req.body.creditcard_cvv + "' WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});


//Server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});
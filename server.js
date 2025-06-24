const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pavlo2004$',
    database: 'EmploymentAgency'
});

db.connect(err => {
    if (err) {
        console.error('Помилка підключення до БД:', err);
        return;
    }
    console.log('Підключення до БД встановлено');
});


app.get('/applicants', (req, res) => {
    db.query('SELECT * FROM Applicants', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.post('/applicants', (req, res) => {
    const { FirstName, LastName, Email, Phone, Resume } = req.body;
    const sql = 'INSERT INTO Applicants (FirstName, LastName, Email, Phone, Resume) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [FirstName, LastName, Email, Phone, Resume], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Кандидат створений', id: result.insertId });
    });
});

app.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});

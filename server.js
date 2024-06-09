const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const timestamp = new Date().toISOString();

    // Save the name to a log file
    const logEntry = `[${timestamp}] ${name}\n`;
    fs.appendFile('log.txt', `${logEntry}`, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
        } else {
            res.send(`Hello, ${name}! Your name has been saved.`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

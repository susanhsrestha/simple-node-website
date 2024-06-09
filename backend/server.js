const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/submit', (req, res) => {
    const name = req.body.name;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${name}\n`;

    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
        } else {
            res.json({ message: `Hello, ${name}! Your name has been saved.` });
        }
    });
});

app.get('/names', (req, res) => {
    fs.readFile('log.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            res.status(500).send('Server error');
        } else {
            const names = data.trim().split('\n').map(entry => {
                const match = entry.match(/\[(.*?)\]\s*(.*)/);
                if (match) {
                    const [timestamp, name] = match.slice(1, 3);
                    return { timestamp, name };
                }
                return null; // Return null for invalid entries
            }).filter(entry => entry !== null); // Filter out invalid entries
            res.json(names);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

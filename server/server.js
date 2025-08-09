const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint to receive and save data
app.post('/api/footprint', (req, res) => {
    const footprintData = req.body;
    console.log('Received data:', footprintData);

    // For now, we'll save it to a local JSON file.
    // In a real application, you would save this to a database.
    const filePath = path.join(__dirname, 'footprints.json');
    
    fs.readFile(filePath, (err, data) => {
        const footprints = (err || !data.toString()) ? [] : JSON.parse(data.toString());
        footprints.push(footprintData);
        
        fs.writeFile(filePath, JSON.stringify(footprints, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving data:', writeErr);
                return res.status(500).json({ message: 'Error saving data' });
            }
            console.log('Data saved successfully.');
            res.status(201).json({ message: 'Data received and saved successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
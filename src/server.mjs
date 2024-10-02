import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
  
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //setting the view engine to ejs and the views to the views folder

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index'); //rendering the index page
});

app.get('/device-leaderboard', (req, res) => {
    res.render('deviceLeaderboard'); //rendering the device leaderboard page
});

app.get('/usage-statistics', (req, res) => {
    res.render('usageStatistics'); //rendering the usage statistics page
});

app.get('/search-location', (req, res) => {
    res.render('locationSelection'); //rendering the location selection page
});

// API routes
app.get('/api/devices', (req, res) => {
    const devices = JSON.parse(localStorage.getItem('devices')) || [];
    res.json(devices);
});

app.post('/api/devices', (req, res) => {
    const devices = JSON.parse(localStorage.getItem('devices')) || [];
    const newDevice = req.body;
    devices.push(newDevice);
    localStorage.setItem('devices', JSON.stringify(devices));
    res.status(201).json(newDevice);
});

app.delete('/api/devices/:id', (req, res) => {
    const devices = JSON.parse(localStorage.getItem('devices')) || [];
    const updatedDevices = devices.filter(device => device.id !== req.params.id);
    localStorage.setItem('devices', JSON.stringify(updatedDevices));
    res.status(204).send();
});

app.get('/api/conversions', (req, res) => {
    const conversions = JSON.parse(localStorage.getItem('conversions')) || [];
    res.json(conversions);
});

app.post('/api/conversions', (req, res) => {
    const conversions = JSON.parse(localStorage.getItem('conversions')) || [];
    const newConversion = req.body;
    conversions.push(newConversion);
    localStorage.setItem('conversions', JSON.stringify(conversions));
    res.status(201).json(newConversion);
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page not found' }); //rendering the error page
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' }); //rendering the error page
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); //logging the server to the console
});

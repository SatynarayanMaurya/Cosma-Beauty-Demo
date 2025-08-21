const express = require('express');
const app = express();
require('dotenv').config();
const database = require('./config/db');
const cors = require('cors');   
const routes = require('./routes/routes');
const PORT = process.env.PORT || 4000;

database.connectDB();


app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL    ));
    withCredentials: true 
}));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to Cosma Beauty API');
});
app.get('/health', (req, res) => {      
    res.status(200).json({ message: 'Server is healthy' });
});

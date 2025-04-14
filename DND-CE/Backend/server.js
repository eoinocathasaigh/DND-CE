const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MongoDB Connection
mongoose.connect('mongodb+srv://dnduser:dndpass@dndcluster.xlb2uao.mongodb.net/?retryWrites=true&w=majority&appName=DNDCluster'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//COMBAT TRACKING SCHEMAS
//This schema defines the attributes/elements of a fighter
const fighterSchema = new mongoose.Schema({
    type: String,
    hp: Number,
    initiative: Number,
});

//This schema defines the attributes for combat encounters themselves
const encounterSchema = new mongoose.Schema({
    //Give them a name
    name: String,
    //Then initialize the fighters that are apart of the particular encounter
    fighters: [fighterSchema],
});

// Define Models
const CombatModel = mongoose.model('combatData', encounterSchema);

//API endpoints
// Get all combat encounters
app.get('/api/CombatTracker', async (req, res) => {
    try {
        const encounters = await CombatModel.find({});
        res.status(200).json({ myEncounter: encounters });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching combat encounters', error });
    }
});

// Add a new combat encounter
app.post('/api/CombatTracker', async (req, res) => {
    try {
        const { name, fighters } = req.body;
        const newEncounter = new CombatModel({ name, fighters });
        await newEncounter.save();
        res.status(201).json({ message: 'Encounter created successfully', encounter: newEncounter });
    } catch (error) {
        res.status(500).json({ message: 'Error creating combat encounter', error });
    }
});

// Update an existing combat encounter
app.put('/api/CombatTracker/:id', async (req, res) => {
    try {
        const { name, fighters } = req.body;
        const updatedEncounter = await CombatModel.findByIdAndUpdate(
            req.params.id,
            { name, fighters },
            { new: true }
        );
        res.status(200).json({ message: 'Encounter updated successfully', encounter: updatedEncounter });
    } catch (error) {
        res.status(500).json({ message: 'Error updating combat encounter', error });
    }
});

// Delete a combat encounter
app.delete('/api/CombatTracker/:id', async (req, res) => {
    try {
        const deletedEncounter = await CombatModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Encounter deleted successfully', encounter: deletedEncounter });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting combat encounter', error });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
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
mongoose.connect('mongodb+srv://dnduser:dndpass@dndcluster.xlb2uao.mongodb.net/combatInfo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//COMBAT TRACKING SCHEMAS
//This schema defines the attributes/elements of a fighter
// Fighter Schema
const fighterSchema = new mongoose.Schema({
    name: String, // Fighter's name
    hp: Number,   // Fighter's health points
    initiative: Number, // Fighter's initiative
});

// Encounter Schema
const encounterSchema = new mongoose.Schema({
    name: String, // Encounter name
    image: String, // Optional image for the encounter
    fighters: [fighterSchema], // Array of fighters
});

// Define Model
const CombatModel = mongoose.model('combatData', encounterSchema); // Use 'combatData' as the collection name
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

// character 
const characterSchema = new mongoose.Schema({
  name: String,
  race: String,
  class: String,
  level: Number,
  alignment: String,
  stats: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  proficiencies: [String],
  inventory: [String],
  spells: [String],
  backstory: String
});

// Define the Character model
const characterModel = mongoose.model('Character', characterSchema); // Collection: 'characters'

// Get all characters
app.get('/api/character', async (req, res) => {
    try {
        const characters = await characterModel.find({});
        res.status(200).json({ characters });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching characters', error });
    }
});

// Add a new character
app.post('/api/character', async (req, res) => {
    try {
        const characterData = req.body; // Getting the form data
        const newCharacter = new characterModel(characterData); // Create a new character
        await newCharacter.save(); // Save to MongoDB
        res.status(201).json({ message: 'Character created successfully', character: newCharacter });
      } catch (error) {
        res.status(500).json({ message: 'Error creating character', error });
      }
});
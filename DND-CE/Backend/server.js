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
mongoose.connect('mongodb+srv://dnduser:dndpass@dndcluster.xlb2uao.mongodb.net/dndDB?retryWrites=true&w=majority', {
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
const CombatModel = mongoose.model('combatData', encounterSchema, 'combatData'); // Use 'combatData' as the collection name
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

app.get('/api/CombatTracker/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const encounter = await CombatModel.findById(id);
      if (!encounter) {
        return res.status(404).json({ message: 'Encounter not found' });
      }
      res.status(200).json(encounter);
    } catch (error) {
      console.error('Error fetching encounter:', error);
      res.status(500).json({ message: 'Error fetching encounter', error });
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
      const { id } = req.params;
      const updatedEncounter = await CombatModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedEncounter) {
        return res.status(404).json({ message: 'Encounter not found' });
      }
      res.status(200).json(updatedEncounter);
    } catch (error) {
      console.error('Error updating encounter:', error);
      res.status(500).json({ message: 'Error updating encounter', error });
    }
});

// Delete a combat encounter
app.delete('/api/CombatTracker/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEncounter = await CombatModel.findByIdAndDelete(id);
        if (!deletedEncounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }
        res.status(200).json({ message: 'Encounter deleted successfully', encounter: deletedEncounter });
    } catch (error) {
        console.error('Error deleting combat encounter:', error);
        res.status(500).json({ message: 'Error deleting combat encounter', error });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// character 
const characterSchema = new mongoose.Schema({
  name: String,
  img: String,
  race: String,
  class: String,
  level: Number,
  alignment: String,
  armorClass: Number,
  initiative: Number,
  speed: Number,
  proficiencyBonus: Number,
  hitPoints: Number,
  hitDice: String,
  hitPointMax: Number,
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
const characterModel = mongoose.model('Character', characterSchema, 'Character'); // Collection: 'characters'

// Get all characters
app.get('/api/character', async (req, res) => {
    try {
        const characters = await characterModel.find({});
        res.status(200).json(characters)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching characters', error });
    }
});

// Get a Character by ID
app.get('/api/character/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const character = await characterModel.findById(id);
      if (!character) {
        return res.status(404).json({ message: 'character not found' });
      }
      res.status(200).json(character);
    } catch (error) {
      console.error('Error fetching character:', error);
      res.status(500).json({ message: 'Error fetching character', error });
    }
  });

// Add a new Character
app.post('/api/character', async (req, res) => {
    console.log('debug: ', req.body); // Debugging line to check the request body
    try {
        const characterData = req.body; // Getting the form data
        const newCharacter = new characterModel(characterData); // Create a new character
        await newCharacter.save(); // Save to MongoDB
        res.status(201).json({ message: 'Character created successfully', character: newCharacter });
      } catch (error) {
        res.status(500).json({ message: 'Error creating character', error });
      }
});

// Update an existing Character
app.put('/api/character/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCharacter = await characterModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.status(200).json(updatedCharacter);
  } catch (error) {
    console.error('Error updating Character:', error);
    res.status(500).json({ message: 'Error updating Character', error });
  }
});

// Delete a character
app.delete('/api/character/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedCharacter = await characterModel.findByIdAndDelete(id);
      if (!deletedCharacter) {
          return res.status(404).json({ message: 'Character not found' });
      }
      res.status(200).json({ message: 'Character deleted successfully', character: deletedCharacter });
    } catch (error) {
      console.error('Error deleting Character:', error);
      res.status(500).json({ message: 'Error deleting Character', error });
  }
});
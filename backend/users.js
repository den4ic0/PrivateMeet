const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors'); 
const User = require('./User');

const app = express();
app.use(express.json()); 

const router = express.Router();

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!', error: err.message });
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/users/:id', getUser, (req, res) => {
    res.json(res.user);
});

router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if(!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    const user = new User({ name, email });

    const newUser = await user.save();
    res.status(201).json(newUser);
});

router.patch('/users/:id', getUser, async (req, res) => {
    const { name, email } = req.body;
    if(name != null) {
        res.user.name = name;
    }
    if(email != null) {
        res.user.email = email;
    }

    const updatedUser = await res.user.save();
    res.json(updatedUser);
});

router.delete('/users/:id', getUser, async (req, res) => {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (error) {
        return next(error); 
    }

    res.user = user;
    next();
}

module.exports = router;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
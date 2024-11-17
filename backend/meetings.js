const express = require('express');
const Meeting = require('./meetingModel');
require('dotenv').config();

const router = express.Router();

router.post('/meetings', async (req, res) => {
    try {
        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).send(meeting);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/meetings', async (req, res) => {
    try {
        const meetings = await Meeting.find({});
        res.send(meetings);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/meetings/:id', async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) {
            return res.status(404).send();
        }
        res.send(meeting);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/meetings/:id', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!meeting) {
            return res.status(404).send();
        }
        res.send(meeting);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/meetings/:id', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.id);
        if (!meeting) {
            return res.status(404).send();
        }
        res.send(meeting);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
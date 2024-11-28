const express = require('express');
const MeetingModel = require('./meetingModel');
require('dotenv').config();

const meetingsRouter = express.Router();

meetingsRouter.post('/meetings', async (req, res) => {
    try {
        const newMeeting = new MeetingModel(req.body);
        await newMeeting.save();
        res.status(201).send(newMeeting);
    } catch (error) {
        res.status(400).send(error);
    }
});

meetingsRouter.get('/meetings', async (req, res) => {
    try {
        const allMeetings = await MeetingModel.find({});
        res.send(allMeetings);
    } catch (error) {
        res.status(500).send(error);
    }
});

meetingsRouter.get('/meetings/:id', async (req, res) => {
    try {
        const singleMeeting = await MeetingModel.findById(req.params.id);
        if (!singleMeeting) {
            return res.status(404).send();
        }
        res.send(singleMeeting);
    } catch (error) {
        res.status(500).send(error);
    }
});

meetingsRouter.patch('/meetings/:id', async (req, res) => {
    try {
        const updatedMeeting = await MeetingModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedMeeting) {
            return res.status(404).send();
        }
        res.send(updatedMeeting);
    } catch (error) {
        res.status(400).send(error);
    }
});

meetingsRouter.delete('/meetings/:id', async (req, res) => {
    try {
        const deletedMeeting = await MeetingModel.findByIdAndDelete(req.params.id);
        if (!deletedMeeting) {
            return res.status(404).send();
        }
        res.send(deletedMeeting);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = meetingsRouter;
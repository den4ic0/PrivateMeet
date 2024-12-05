const express = require('express');
const MeetingModel = require('./meetingModel');
const logger = require('./logger');
const authenticate = require('./authenticate');
require('dotenv').config();

const meetingsRouter = express.Router();

meetingsRouter.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
});

meetingsRouter.post('/meetings', authenticate, async (req, res) => {
    try {
        const newMeeting = new MeetingModel(req.body);
        await newMeeting.save();
        res.status(201).send(newMeeting);
    } catch (error) {
        logger.error(`Creating meeting failed: ${error}`);
        res.status(400).send(error);
    }
});

meetingsRouter.get('/meetings', async (req, res) => {
    const { startDate, endDate } = req.query;
    let filterOptions = {};

    if (startDate && endDate) {
        filterOptions.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const allMeetings = await MeetingModel.find(filterOptions);
        res.send(allMeetings);
    } catch (error) {
        logger.error(`Fetching meetings failed: ${error}`);
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
        logger.error(`Fetching single meeting failed: ${error}`);
        res.status(500).send(error);
    }
});

meetingsRouter.patch('/meetings/:id', authenticate, async (req, res) => {
    try {
        const updatedMeeting = await MeetingModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedMeeting) {
            return res.status(404).send();
        }
        res.send(updatedMeeting);
    } catch (error) {
        logger.error(`Updating meeting failed: ${error}`);
        res.status(400).send(error);
    }
});

meetingsRouter.delete('/meetings/:id', authenticate, async (req, res) => {
    try {
        const deletedMeeting = await MeetingModel.findByIdAndDelete(req.params.id);
        if (!deletedMeeting) {
            return res.status(404).send();
        }
        res.send(deletedMeeting);
    } catch (error) {
        logger.error(`Deleting meeting failed: ${error}`);
        res.status(500).send(error);
    }
});

module.exports = meetingsRouter;
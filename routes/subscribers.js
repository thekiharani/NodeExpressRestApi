const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// get all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (e) {
        res.status(500).json({ message: e.message}) 
    }
})
// get one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})
// create one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    })
    try {
        const newSubscribers = await subscriber.save()
        res.status(201).json(newSubscribers)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})
// update one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedChannel != null) {
        res.subscriber.subscribedChannel = req.body.subscribedChannel
    }

    try {
        updatedSubscriber = await res.subscriber.save()
        res.json({ message: "Subscriber Updated!" })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})
// delete one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Subscriber Deleted!' })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "Subscriber not found" })
        }
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router
const express = require('express');
const cors = require('cors');
const events = require('events');

const emitter = new events.EventEmitter();

const PORT = 5001;

const app = express();

app.use(cors())
app.use(express.json())

app.get('/get-messages', ((req, res) => {
    emitter.once('mewMessage', (message) => {
        res.status(200).json(message);
    })
}))

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('mewMessage', message);
    res.status(200).json({ res: true });
}))

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
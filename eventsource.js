const express = require('express');
const cors = require('cors');
const events = require('events');

const emitter = new events.EventEmitter();

const PORT = 5001;

const app = express();

app.use(cors())
app.use(express.json())

app.get('/connect', ((req, res) => {
    // res.writeHead(200, {
    //     'Connection': 'keep-alive',
    //     'Content-Type': 'text/event-stream',
    //     'Cache-Control': 'no-cache'
    // })
    emitter.once('newMessage', (message) => {
        console.log('after', message)
        res.status(200).write(`data: ${JSON.stringify(message.message)} \n\n`)
    })
}))

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    console.log('before', message)
    emitter.emit('mewMessage', message);
    res.status(200).json({ res: true });
}))

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
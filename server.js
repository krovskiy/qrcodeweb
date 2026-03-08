const qrcode = require('qrcode');
const express = require('express');
const ejs = require('ejs');
const path = require('path');


const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'view'));

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, response) =>{
    response.render('index');
});

app.post("/scan", (req, res) => {
    const input_text = req.body.text;
    
    if (!input_text || input_text.trim().length === 0) {
        return res.status(400).send('Input text cannot be empty');
    }
    
    if (input_text.length > 2953) {
        return res.status(400).send('Input text exceeds maximum length');
    }

    qrcode.toDataURL(input_text, (err, src) => {
        if (err) {
            return res.status(500).send('Error generating QR code');
        }
        res.render('scan', { qr_code: src });
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send('Server error');
});

app.listen(port, console.log(`Listening on port ${port}`));

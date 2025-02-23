const qrcode = require('qrcode');
const express = require('express');
const ejs = require('ejs');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'view'));

app.get('/', (req, response) =>{
    response.render('index');
});

app.post("/scan",(req,res)=>{
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text,(err,src)=>{
        res.render('scan',{
            qr_code: src
        })
    })
})
app.listen(port, console.log(`Listening on port ${port}`));

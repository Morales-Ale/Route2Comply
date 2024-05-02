import express from 'express';
import nodemailer from 'nodemailer';
import  dotenv from 'dotenv';
const app = express();
const port = 3000;
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    let domain = `${req.protocol}://${req.hostname}`;

    domain = domain.replace(/http/, 'https');

    res.locals.domain = domain;

    next();
});

app.get('/', (req, res) => {
    res.render("main");
});

app.get('/about', (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post("/send_email", function (req, response) {

    const from = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'support@route2comply.com',
            pass: 'gktv hhhb ojly qida'
        }
    });
    const mailOptions = {
        from: from,
        to: 'support@route2comply.com',
        subject: `Contact request from ${name}`,
        text:
            ` Client email  ${from} 
          Client name  ${name} 
          Message:  ${message} `
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error: ", error);
        } else {
            console.log("Message sent:", info);
        }
          response.redirect("/");

    })
   
})
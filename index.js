import express from 'express';
import nodemailer from 'nodemailer';
const app = express();
const port = 3000;
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
 res.render("main");
});

app.get('/about', (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post("/send_email", function(req, response){

 

    const transporter = nodemailer.createTransport({
        
          port: 587,
  secure: false,
        service :'gmail', 
        auth:{
        user: 'alejandramoralesestrada@gmail.com',
        pass:'gtud tdts egyj gmcj'
     }

    });

    // async..await is not allowed in global scope, must use a wrapper
async function main() {
    const from = req.body.email;
    const name = req.body.name;
    const message = req.body.message;
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from:'contact@route2comply.com' , 
        to: 'alejandramoralesestrada@gmail.com', 
        subject:`Contact request from ${name}` , 
        text:
        ` Client email  ${from} 
          Client name  ${name} 
          Message:  ${message} `
    });
  
    console.log("Message sent: %s", info);
  }
  
  main().catch(console.error);
  

})
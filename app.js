const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html/signup.html')
})

app.post('/', function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address : email,
      status : 'subscribed',
      merge_fields : {
          FNAME : firstName,
          LNAME : lastName,
        }
    }]
  }

const JsonData = JSON.stringify(data);

const url =  "https://us9.api.mailchimp.com/3.0/lists/2bc76e28a8";
const options = {
  method : "POST",
  auth : "Mohd:1c481420ee65aa8d24cc135edc6ae537-us9"
}

 const request = https.request(url , options , function(response){

   if(response.statusCode===200){
     res.sendFile(__dirname + "/html/success.html")
   }
   else{
           res.sendFile(__dirname + "/html/failure.html")
   }
response.on('data' , function(data){
  console.log(JSON.parse(data))
})

 })
 request.write(JsonData)
 request.end()
})

app.post('/failure' , function(req, res){
  res.redirect('/')
})

app.listen( process.env.PORT || 3000, function() {
  console.log('The app sat at post 3000')
})

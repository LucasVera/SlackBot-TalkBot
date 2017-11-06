require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const WebClient = require('@slack/client').WebClient;
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const twilio = require('twilio');
const firebase = require('firebase');

// bot token and auth token
const bot_token = process.env.SLACK_BOT_TOKEN || '';
const auth_token = process.env.SLACK_AUTH_TOKEN || '';
// verification token for events adapter
// (verifies that events received are from slack)
const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);

// firebase config obj
const firebaseConfig = {
    apiKey:process.env.FIREBASE_API_KEY || '',
    authDomain:process.env.FIREBASE_AUTH_DOMAIN || '',
    databaseURL:process.env.FIREBASE_DB_URL || '',
    projectId:process.env.FIREBASE_PROJECTID || '',
    storageBucket:process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId:process.env.FIREBASE_MESSAGING_SENDERID || ''
};
// firebase init
const db = firebase.initializeApp(config).database();


// express http listening server
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// slack web client
const web = new WebClient(auth_token);
const bot = new WebClient(bot_token);


const port = 4390;
const channel = '#general';

app.listen(port, function(){
    console.log('Listening on port ' + port);
});

app.post('/sms', (req,res)=>{
    // gets msg from Twilio
    let msg = req.body.Body ? req.body.Body : '';

    // gets phone number from sender without the +
    let num = req.body.From ? req.body.From.slice(1) : '';

    sendMsg(msg + ' from ' + num, channel, num);
});

app.get('/', (req,res)=>{
    res.type('html');
    res.write('<h2>Lucas Slackbot-TalkBot: </h2>');
    res.write('<h4>Uses Twilio to receive SMS and write them to a slack bot app.</h4>');
    res.write('<p>For more info, visit <a href="https://github.com/slackapi/TalkBot">THIS TUTORIAL</a></p>');
    res.end();
});
// (601) 882-0452      +16018820452

function sendMsg(text, channel, phoneNum){
    web.chat.postMessage(channel, text, function(err, info){
        if(err){
            console.log(err);
        }
    });
}

sendMsg('Talkbot is up and running! ready to take sms! :)', '#general', 0);



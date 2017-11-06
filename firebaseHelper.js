const firebase = require('firebase');
module.exports = {
    // firebase config obj
    firebaseConfig = {
        apiKey:process.env.FIREBASE_API_KEY || '',
        authDomain:process.env.FIREBASE_AUTH_DOMAIN || '',
        databaseURL:process.env.FIREBASE_DB_URL || '',
        projectId:process.env.FIREBASE_PROJECTID || '',
        storageBucket:process.env.FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId:process.env.FIREBASE_MESSAGING_SENDERID || ''
    },
// firebase init
    db: firebase.initializeApp(config).database(),
    updateChannel(id){
        this.db.ref('channel/id').set(id);
    },
    getChannel(){
        const ref = this.db.ref('channel/id');
        ref.on('value', (snapshot)=>{
            channel = snapshot.val();
        });
    },
    createUser(num,id){
        this.db.ref('users/'+ num).set(id);
    }
}


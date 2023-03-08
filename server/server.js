const express = require('express'); // for express server
const path = require('path'); // for production
const app = express(); // for express server
const cors = require('cors'); // for cross origin resource sharing
const port = 3001; // for development
const { createConnection } = require('./src/database'); // for database connection
const firebaseAdmin = require("firebase-admin"); // for authentication
const serviceAccount = require("./serviceAccount.json"); // for authentication

// firebaseAdmin is used for authentication
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./src/router'));

// For production
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// For production

// Launch server
createConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    })
    .catch(console.log)
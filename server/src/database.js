const mysql = require('mysql2');

let connection;

exports.createConnection = (autoConnect = true) => new Promise((resolve, reject) => {

    try {

        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'gds437',
            database: 'scheduler_events'
        });

        if (autoConnect) {
            this.connect()
                .then(() => resolve(connection))
                .catch(console.log)
        } else {
            resolve(connection);
        }


    } catch (error) {

        reject(error.message);

    }
})

exports.connect = () => new Promise((resolve, reject) => {

    connection.connect((error) => {

        if (error) {
            reject(error.message);
        }

        resolve(true);

    });

});

exports.query = (query, values) => {

    return new Promise((resolve, reject) => {

        connection.query(query, values, function (error, results) {

            if (error) {
                reject(error.message);
            }

            resolve(results);

        });

    });

}
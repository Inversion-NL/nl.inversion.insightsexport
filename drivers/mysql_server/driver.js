'use strict';

const Homey = require('homey');
const mysql = require('mysql');

class MySQLServerDriver extends Homey.Driver {

  onPair(socket) {
    socket.on('check', function(data, callback) {

      const connection = mysql.createConnection({
        host     : data.host,
        port     : data.port,
        user     : data.username,
        password : data.password,
        database : data.db
      });

      console.log('Data:', data);

      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ', err);
          callback(err.sqlMessage, false);
        } else {
          // Successfully connected to MySQL
          console.log('connected as id ', connection.threadId);

          var query = 'CREATE TABLE MyGuests (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(50), reg_date TIMESTAMP )'

          connection.query(query, function (error, results, fields) {
            console.log('Creating tables');
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            if (!err) {

              // Tell the pairing wizard the connection was successful
              callback(null, connection);

              // End the connection gracefully
              connection.end(function(err) {
                // The connection is terminated now
              });
            } else {
              // Tell the pairing wizard something went wrong
              console.log('Error creating tables', err);
              callback('Failed to create tables in the database. Does the user have sufficient rights?', true);
            }
          });


        }
      });
    });
  }

}

module.exports = MySQLServerDriver;
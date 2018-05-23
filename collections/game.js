var MongoClient    = require('mongodb').MongoClient;
const dbConf = require("../config").get("db");

class Game {
    constructor() {
        this.host = dbConf.host; 
        this.database = dbConf.database;
        this.collection = "games";
    }

    insert (data) {
        var self = this;

        return new Promise((resolve, reject) => {
            MongoClient.connect(this.host, (err, db) => {
                var dbo = db.db(this.database);    
                
                dbo.collection(this.collection).insertOne(data , function(err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        });
       
    }

    get() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.host, (err, db) => {
                if (err) reject(err);
                var dbo = db.db(this.database);     
                dbo.collection(this.collection).find().sort({_id:-1}).limit(5).toArray(function(err, result) {
                    if (err) reject(err)
                    resolve(result);
                    db.close();
                });
            });
        });
    }
};

module.exports = Game;
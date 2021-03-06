"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};
var moment = require('moment');

fs
    .readdirSync(__dirname)

    //this code to read all files in the model folder !!
    .filter(function(file) {

        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(__dirname + '/' + file);



        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {

        db[modelName].associate(db);

    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


var Post= db["Post"];
var Comment = db["Comment"];

var User = db["User"];







//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_

Comment.belongsTo(Post,{ foreignKey: 'Post_idPost'});
Post.hasMany(Comment,{ foreignKeyConstraint:true,foreignKey: 'Post_idPost'});





//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_




module.exports = db;
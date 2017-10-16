const { myHost, myDB, myUser, myPass } = require('../../config').mySQLdb;

const knex = require('knex')({
                client: 'mysql',
                connection: {
                    host     : myHost,
                    user     : myUser,
                    password : myPass,
                    database : myDB
                },
                debug: false
            })

const Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('registry');

module.exports = {
    knex,
    Bookshelf
};
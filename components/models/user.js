const bookshelf = require('./../../bookshelf');

const { Model } = bookshelf;

class User extends Model { 
    get tableName() {
        return 'user';
    }
}

module.exports = bookshelf.model('User', User);
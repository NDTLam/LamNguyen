const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/T_Lam')

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    password: String
},{
    collection: 'account'
});
const AccountModel =mongoose.model('account',AccountSchema)
module.exports = AccountModel
/*for (let i = 0; i < 20; i++) {
    AccountModel.create({
        username:'Lam'+i,
        password:'1234'
    })
}
*/
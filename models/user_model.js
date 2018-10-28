const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    }
});



module.exports = (connection) => {
    if (!connection) {
        let User = mongoose.model('user', userSchema);
        console.log("Returning master model -> ", User);
        return User;
    } else {
        const conn = mongoose.createConnection(`${connection.domain}://${connection.host}:${connection.port}/${connection.db}`);
        return conn.model("user", userSchema);
    }
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
    name: {
        type: String
    },
    connection: {
        domain: String,
        db: String,
        host: String,
        port: String
    }
});

TenantSchema.on('pre', () => {
    console.log("Checking document before saving to the database");
});

module.exports = mongoose.model('tenant', TenantSchema);;

// Import Modules
const randomString = require('randomstring');
const mongoose = require('mongoose');

// Import Models
const Tenant = require('../models/base_model');
const User = require('../models/user_model');

module.exports = {
    fetchAllTenants(req, res) {
        Tenant.find({}, (err, tenants) => {
            if (err) return res.status(500).json({ Error: "Unable to fetch tenants from the Master Database" });
            return res.status(200).json({ data: tenants });
        });
    },
};

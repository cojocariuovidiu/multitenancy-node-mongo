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
    register(req, res) {
        if (!req.body.name) {
            return res.status(400).json({ Error: "Please provide proper DB connection information and Tenant Name." });
        }
        let tenant = {
            name: req.body.name,
            connection: {
                domain: req.body.connection.domain ? req.body.connection.domain : "mongodb",
                host: req.body.connection.host ? req.body.connection.host : 'localhost',
                port: req.body.connection.port ? req.body.connection.port : '27017',
                db: req.body.connection.db ? req.body.connection.db : randomString.generate()
            }
        }
        Tenant.create(tenant, (err, doc) => {
            if (err) return res.status(500).json({ "Error": err });
            console.log("New DB Conneection --> ", doc);
            User(doc.connection).create({ name: "master" }, (error, user) => {
                if (error) {
                    return res.status(500).json({ Error: "Unable to insert master user in the new tenant database." });
                }
                return res.status(200).json({ message: "New Tenant created and master user inserted into the new tenant database" });
            });
        });
    },
    findTenant(req, res) {
        Tenant.findOne({ name: req.query.name }, (err, doc) => {
            if (err) {
                return res.status(500).json({ Error: err });
            }
            return res.status(200).json({ data: doc });
        });
    },
    registerUserToTenant(req, res) {
        Tenant.findOne({ name: req.body.tenantName }, (err, tenant) => {
            User(tenant.connection).create(req.body.user, (error, user) => {
                if (error) {
                    return res.status(500).json({ Error: "Unable to insert user in the tenant database." });
                }
                return res.status(200).json({ message: "New user inserted into the tenant database" });
            });
        });
    },

    findUserInTenant(req, res) {
        let tenant = req.query.tenant;
        let user = req.query.user;

        Tenant.findOne({ name: tenant }, (err, t) => {
            if (err) return res.status(500).json({ Error: "Unable to find the tenant." });

            User(t.connection).findOne({ name: req.query.user }, (error, u) => {
                if (error) {
                    return res.status(500).json({ Error: "Unable to find user in the tenant database." });
                }
                if (!u || !u.name) {
                    return res.status(404).json({ data: "User not Found." });
                } else {
                    return res.status(200).json({ data: u });
                }
            });
        });
    }
};

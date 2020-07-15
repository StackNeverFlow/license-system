// import all packages
const express   = require('express');
const router    = express.Router();

// define the auth key
var AUTH_TOKEN      = process.env.AUTH_TOKEN || "123";

// security for blocking spamming
const rateLimit     = require("express-rate-limit");
const slowDown      = require("express-slow-down");

// create the ratelimiter/ request limit
const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 125,
});

// create the speedlimiter/ slowdown
const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 25,
    delayMs: 250,
});

router.get('/', rateLimit, speedLimiter, async (req, res) => {
    res.status(400).send();
});

// request format: 'URL/isProxy/0.0.0.0:1337'
router.post('/license/:key', rateLimiter, speedLimiter, async (req, res) => {
    if(req.header("auth-token") !== null && req.header("auth-token") == AUTH_TOKEN) {
        // console.log(req.params.ip);

        if (req.params.key === "123") {
            return res.json({ auth: '1', programmer: 'StackNeverFlow' });
        } else {
            return res.json({ auth: '0', programmer: 'StackNeverFlow' });
        }
    } else {
        return res.sendStatus(403).send();
    }
});

// exports the routing
module.exports = router;
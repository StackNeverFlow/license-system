const express               = require('express');
const helmet                = require('helmet');
const cors                  = require('cors');
const app                   = express();

const PORT                  = process.env.PORT || 1337;

app.use(cors());
app.use(helmet());

app.get('/', (res, req) => {
    req.status(404).send();
});

app.use('/api/v1', require('./routes/API.js'))

// listen on the port
app.listen(PORT, console.log(`API running on http://localhost:${PORT}`))
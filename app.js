const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

// const upload = multer({ dest: '/uploads/' })
const config = require('./config/config')
const indexRoute = require('./routes/indexRoute')

const port = config.server.port


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use('/uploads', express.static('uploads'))
// app.use(express.static(path.join(__dirname, 'uploads')))

app.use('/api/admin', indexRoute)

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    //res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//allow access to public folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`local server is on port:::${port}`))
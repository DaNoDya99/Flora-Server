const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./src/models')
const routes = require('./src/routes')

const app = express()
const port = 3000

app.use('/public',express.static(__dirname + '/public'));
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use('/api', routes)

try {
    db.sequelize.authenticate().then(() => {
        console.log('Database Connection has been established successfully.')
    }).catch(err => {
        console.error('Unable to connect to the database:', err)
    });
}catch (error) {
    console.error('Unable to connect to the database:', error)
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
//server main code, entry point

import express from 'express'
import cors from 'cors'
import router from './routes/index'

import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', router)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})
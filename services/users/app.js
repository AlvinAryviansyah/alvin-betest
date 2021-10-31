const express = require("express")
const app = express()
const cors = require("cors")
const port = 4001
const Controller = require('./controllers/controller')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const {connect} = require('./config/mongodb')


app.get('/user', Controller.findAll)
app.post('/user', Controller.addUser)


connect()
.then(() => {
    console.log('Connected successfully to server');

    app.listen(port, ()=>{
        console.log("listening to port ", port)
    })
})



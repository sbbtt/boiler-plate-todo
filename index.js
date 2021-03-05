const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require("./models/User")
const config = require('./config/key')

const mongoose = require('mongoose')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())


mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected.'))
  .catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! HNY 2021! new changes gang')

})

app.post('/register', (req, res) => {
    //회원가입 시 필요한 정보를 client 에서 db에 꽂기. router
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// import testx from './mysql/loadFileToDB'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mainRouter from './routers/index'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import payment from './config/payment'
const app = express()

dotenv.config()
var corsOptions = {    
    credentials: true,
    origin : true    
}
app.use(cookieParser())
app.use(fileUpload())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('files'))
app.use('/', mainRouter)
// https://api.baokim.vn/payment/api/v4/account/detail?jwt=getKey()&fbclid=IwAR1UUhrlcCcT1kYW9c_PhgwAbMQ4s4VOa7UjNsjI4sTPtJ3ul8RC3MccuuU
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})
//http://localhost:8080/payment?created_at=2020-12-22+14%3A48%3A52&id=102146575&mrc_order_id=7de9da90-c10e-403d-913c-d9efcfa4973f&stat=c&total_amount=10000.00&txn_id=101962206&updated_at=2020-12-22+14%3A50%3A12&checksum=082e8fd0b3592539e0d4c4c693c0a64ebd840d82e64e86dc7f417d1d44d45cc9
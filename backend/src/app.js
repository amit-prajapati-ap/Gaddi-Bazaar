import express from 'express'
import cors from 'cors'
import {authRouter} from './routes/auth.route.js';
import cookieParser from 'cookie-parser'
import { ownerRoute } from './routes/owner.route.js';
import { bookingRouter } from './routes/booking.route.js';

const app = express()
const allowedOrigins = [`${process.env.FRONTEND_URL}`, '*']

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: allowedOrigins}))

app.get('/', (_,res) => {
    res.send("API Working")
})

//API Endpoint 
app.use('/api/user', authRouter)
app.use('/api/owner', ownerRoute)
app.use('/api/booking', bookingRouter)

export default app
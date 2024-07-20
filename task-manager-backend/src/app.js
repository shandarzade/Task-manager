import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true
}))

app.use(express.json( {
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended:true, limit:"16kb"
}))

app.use(express.static("Public"))
app.use(cookieParser())


// Routes import

import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'


//Routes declaration

app.use("/api/v1/users/", userRouter)
app.use("/api/v1/tasks/", taskRouter)


export default app
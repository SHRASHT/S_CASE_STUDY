import express from "express";
import { getAIResponse } from "./controller/aicontroller.ts"; 

import cors from 'cors'

const app = express()
const port = 3000

app.use(cors());          
app.use(express.json());

app.post('/ask', (getAIResponse));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

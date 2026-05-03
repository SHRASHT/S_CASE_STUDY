import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';


export const getAIResponse=async (req:any,res:any)=>{
    const {question}=await req.body;

    if(!question)
    {
        res.status(400).json({error:"Question is required!"});
    }


const ai = new GoogleGenAI({
     apiKey: process.env.GEMINI_API_KEY,
    
});


     import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';


export const getAIResponse=async (req:any,res:any)=>{
    const {question}=await req.body;

    if(!question)
    {
        res.status(400).json({error:"Question is required!"});
    }


const ai = new GoogleGenAI({
     apiKey: process.env.GEMINI_API_KEY,
    
});


     const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",   
    contents: [
        {
            "role":"user",
         "parts":[{
    
            text:`
        <INSTRUCTIONS>
          Role: Senior Manager at McKinsey.
          Context: High-pressure Business Analyst mock interview.
          Attitude: Unimpressed, busy, no-nonsense.
          Constraints: 
          - DO NOT be helpful.
          - DO NOT suggest frameworks.
          - DO NOT give tips unless specifically asked.
          - Interrupt immediately if I talk too long without a point.
          - Challenge me instantly if my math is slow or logic is weak.
          </INSTRUCTIONS>

          Current Question/Task: ${question}
          `
         }]
        }]
     

  });

   console.log(response.text);

   return res.status(200).json({"message":response.text});


}

   

}


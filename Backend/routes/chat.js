import express from 'express';
import  Thread  from "../models/Thread.js";
const router = express.Router();
import getOpenAIAPIResponse from '../utils/openai.js'

router.post("/test", async(req, res)  => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "testing new thread1"
        });

        const response = await thread.save();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to save in database"});
    }
});

router.get("/thread", async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Failed to save in thread"});

    }
})

router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error: "Thread is not found"});
        }
        res.json(thread.messages)
    } catch (error) {
         console.log(error)
        res.status(500).json({error:"Failed to save in chat"});
    }
})


router.delete("/thread/:threadId", async (req, res) => {
    const {threadId} = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if (!deletedThread) {
            res.status(404).json({error:"Thread not found"});
        }

        res.status(200).json({success: "Thread deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to delete thread"});

    }
})


// router.post("/chat", async(req, res) =>{
//     const {threadId, message} = req.body;

//     if (!threadId || !message) {
//         res.status(400).json({error:"missing required fields"});
//     }
//     try {
//         let thread = await Thread.findOne({threadId});

//         if (!thread) {
//             //create a new thread i database
//             thread = new Thread({
//                 threadId,
//                 title: message,
//                 messages: [{role: "user", content:message}]
//             });
//         }else {
//             thread.messages.push({role: "user", content:message});
//         }
//         const assistantReply = await getOpenAIAPIResponse(message);

//         thread.messages.push({role:"assistant", content: assistantReply});
//         thread.updatedAt = new Date();

//         await thread.save();
//         res.json({reply:assistantReply});


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: "something went wrong"});
//     }
// })


router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: assistantReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});



export default router;
const express = require('express');
const {menuItems} = require('../model/menu');

// const app = express();

let menuRouter = express.Router();

// app.use(express.json());

menuRouter.put('/', async (req,res)=>{
    try {
        const newmenu = await menuItems.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if (!newmenu) return res.status(404).json({error:"Menu not found"});
        res.json(newmenu)
    } catch (error) {
        res.status(400).json({error:"invalid Menu ID"});
    }
});

menuRouter.delete('/', async(req,res)=>{
    try {
        const deletemenus = await menuItems.findByIdAndDelete(req.params.id, req.body,{new:true, runValidators:true});
        if (deletemenus)
        res.json(deletemenus)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
});

// menuRouter.use('/menu',menuItems);

module.exports = menuRouter;

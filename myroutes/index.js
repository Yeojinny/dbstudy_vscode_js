const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({index:`${req.method}:${req.url}`});
});

module.exports=router;
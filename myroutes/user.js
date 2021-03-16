const express = require('express');
const router = express.Router();
const{Op}=require('sequelize');
const{User}=require('../models');

const {sequelize}=require('../models');

//raw query
router.get('/sql',async(req,res)=>{
    const[result,metadata]=await sequelize.query(req.query.con);
    console.log("result",result);
    res.json({result:result});
})




//데이터 수정(업데이트)
router.patch('/', (req,res)=>{
    User.update(req.body.value,req.body.where)
    .then(()=>{
        res.send("정상적으로 업데이트 되었습니다.");
    })
    // User.update({
    //     comment:'happy'
    // },{
    //     where:{id:3}
    // })
    .catch(err=>{
        res.send(err);
    })
});

//데이터 삭제
router.delete('/',(req,res)=>{
    const data = req.body;
    let num = 0;
    // User.destroy({where:{id:req.body.id}
    // });

    for(rec of data){   //foreach, of : 배열 뽑는거 in:객체뽑을 때
        User.destroy({
            where:{id:rec.id},
        });
        num++;
    }
    res.json({note:`${num}개의 데이터가 삭제 되었습니다.`})
});


//create데이터 insert
router.post('/',(req,res)=>{
    const data = req.body;
    let num = 0;
    for(rec of data){
        User.create({
            name:rec.name,
            age: rec.age,
            married:rec.married,
            comment:rec.comment
        });
        num++;
    };
    res.json({note:`${num}개의 데이터가 정상적으로 저장되었습니다.`});
});

//attributes:[] => 원하는 칼럼만 조회
router.get('/', async (req,res)=>{
    const condition = req.body;
    requestPromise="";
    await User.findAll({attributes:condition.attributes})  //st => Promise{} promise객체
    // where:{
    //     [Op.or]:[{age:20},{comment:"hi"}]}})
    .then(rec=>{
        rec.forEach(data=>{
            console.log(data);
            requestPromise += JSON.stringify(data)+"\n";
        });
       res.send(requestPromise);
    });
    
});


// router.post('/',(req,res)=>{
//     const data = req.body;

//     User.create({
//         name:data.name,
//         age: data.age,
//         married:data.married,
//         comment:data.comment
//     });
//     console.log(123);   

//     res.json({note:`데이터가 정상적으로 저장되었습니다.`});
// });

module.exports=router;




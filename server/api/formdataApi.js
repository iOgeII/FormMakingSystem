var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
var dirname = 'D:\\Projects\\VueDemo\\FormMakingSystem\\server\\formdata'


// 获取表单生成数据json
router.get('/fetchJson', (req, res) => {
    var filename = req.query.filename;
    // var file = path.join(dirname,String(filename));
    var file = path.join(dirname,String(filename));
    fs.readFile(file, 'utf-8', function(err,data){
        if(err){
            res.send('Failed to read file:'+ err);
        }
        else{
            // console.log(data)
            res.send(data);
        }
    })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM students ORDER BY ID desc ', function(err,rows){
        if(err) {
            req.flash('error', err);
          res.render('student',{data:''});   
        }else {
        res.render('student',{data:rows});
        }
    })})

    router.get('/sadd', function(req, res, next) {    
    
        res.render('student/sadd', {
            FirstName: '',
            LasttName: '' ,
            ParentName:'',
            Email:'',
            PhoneNumber:''       
        })
    })
    var validator = function(req,res,next){
        
    }
    router.post('/sadd', function(req, res, next) {    
    
        // let name = req.body.name;
        // let author = req.body.author;
        let errors = false;
    
        if(req.body.FirstName.length === 0 ) {
            errors = true;
            req.flash('error', "Please enter FirstName");
            
            res.render('student/sadd', {
                FirstName: req.body.FirstName,
                LasttName: req.body.LasttName ,
                ParentName:req.body.ParentName,
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber ,
                
            })
        }
        if(!errors) {
    
            // var form_data = {
            //     name: req.body.name,
            //     author:  req.body.author
            // }
            
    
            dbConn.query('INSERT INTO students SET ?',  {
                FirstName: req.body.FirstName,
                LasttName: req.body.LasttName ,
                ParentName:req.body.ParentName,
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber ,
                 }, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                     
                    // render to add.ejs
                    res.render('student/sadd', {
                        FirstName: req.body.FirstName,
                        LasttName: req.body.LasttName ,
                        ParentName:req.body.ParentName,
                        Email:req.body.Email,
                        PhoneNumber:req.body.PhoneNumber ,
                                       
                    })
                } else {                
                    req.flash('success', 'student detils successfully added');
                    res.redirect('/student');
                }
            })
        }
    })
    

module.exports = router;

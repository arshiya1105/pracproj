var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const {check, validationResult} = require('express-validator/check');
let MongoClient = require('mongodb').MongoClient;


router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM students ORDER BY ID desc ', function(err,rows){
        if(err) {
            req.flash('error', err);
          res.render('student',{data:''});   
        }else {
        res.render('student',{data:rows});
        }

    })
})

router.get('/sadd', function(req, res, next) {    
    
    res.render('student/sadd', {
        FirstName: '',
        LasttName: '' ,
        ParentName:'',
        Email:'' ,      
        PhoneNumber:''       
      
    })
})
var validator=[check('FirstName').not().isEmpty().withMessage('FirstName field requeried'),
        check('LasttName').not().isEmpty().withMessage('LasttName field requeried'),
        check('ParentName').not().isEmpty().withMessage('ParentName field requeried'),
        check('Email', 'Email value must be neaded').not().isEmpty(),
        check('PhoneNumber').not().isEmpty().isLength({min: 5}).withMessage('PhoneNumber munst be interger'),
]
router.post('/sadd',validator, function (req, res) {
    const errors = validationResult(req);
  
        if (!errors.isEmpty()) {

            req.flash('error',  errors.array());
            // render to add.ejs with flash message
            res.render('student/sadd', {
                FirstName: req.body.FirstName,
                LasttName: req.body.LasttName ,
                ParentName:req.body.ParentName,
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber
               
            })

           
          }else{
            var form_data = {
                FirstName: req.body.FirstName,
                LasttName: req.body.LasttName ,
                ParentName:req.body.ParentName,
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber
                        }
                        
                        // insert query
                        dbConn.query('INSERT INTO students SET ?', form_data, function(err, result) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                 
                                // render to add.ejs
                                res.render('student/sadd', {
                                    FirstName: req.body.FirstName,
                                    LasttName: req.body.LasttName ,
                                    ParentName:req.body.ParentName,
                                    Email:req.body.Email,
                                    PhoneNumber:req.body.PhoneNumber                 
                                })
                            } else {                
                                req.flash('success', 'Book successfully added');
                                res.redirect('/student');
                            }
                        })
          }
   



  });


module.exports = router;

var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const { check, validationResult } = require('express-validator/check');


router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM books ORDER BY ID desc ', function(err,rows){
        if(err) {
            req.flash('error', err);
          res.render('books',{data:''});   
        }else {
        res.render('books',{data:rows});
        }
    })
})

router.get('/add', function(req, res, next) {    
    
    res.render('books/add', {
        name: '',
        author: '' ,
        Description:''       
    })
})
router.post('/add', function(req, res, next) {    

    let name = req.body.name;
    let author = req.body.author;
    let Description = req.body.Description;

    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('books/add', {
            name: name,
            author: author,
            Description:Description
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            author: author,
            Description:Description
        }
        
        // insert query
        dbConn.query('INSERT INTO books SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('books/add', {
                    name: form_data.name,
                    author: form_data.author,
                    Description:form_data.Description                   
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/books');
            }
        })
    }
})

// router.post('/add',
//     [
//         check('name').not().isEmpty().withMessage('Name field r'),
//         check('author', 'author value must be neaded').not().isEmpty(),
//         check('Description').not().isEmpty().isLength({min: 5}).withMessage('Name must have more than 5 characters'),

//     ],
 
//   function (req, res) {
//     const errors = validationResult(req);
  
//         if (!errors.isEmpty()) {

//             req.flash('error',  errors.array());
//             // render to add.ejs with flash message
//             res.render('books/add', {
//                 name: req.body.name,
//                 author: req.body.author,
//                 Description:req.body.Description
//             })

           
//           }else{
//             var form_data = {
//                         name: req.body.name,
//                         author: req.body.author,
//                         Description:req.body.Description
//                         }
                        
//                         // insert query
//                         dbConn.query('INSERT INTO books SET ?', form_data, function(err, result) {
//                             //if(err) throw err
//                             if (err) {
//                                 req.flash('error', err)
                                 
//                                 // render to add.ejs
//                                 res.render('books/add', {
//                                     name: form_data.name,
//                                     author: form_data.author,
//                                     Description:form_data.Description                   
//                                 })
//                             } else {                
//                                 req.flash('success', 'Book successfully added');
//                                 res.redirect('/books');
//                             }
//                         })
//           }
   



//   });


router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        
            res.render('books/edit', {
                title: 'Edit Book', 
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            })
    })
})


router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;
        
       
        req.flash('error', "Please enter name and author");
       
        res.render('books/edit', {
            id: id,
            name: name,
            author: author
        })
    }

    
    if( !errors ) {   
 
        var form_data = {
            name: name,
            author: author
        }
      
        dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function(err, result) {
           
            if (err) {
               
                req.flash('error', err)
               
                res.render('books/edit', {
                    id: id,
                    name: form_data.name,
                    author: form_data.author
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/books');
            }
        })
    }
})

router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
       
        if (err) {
          
            req.flash('error', err)
           
            res.redirect('/books')
        } else {
           
            req.flash('success', 'Book successfully deleted! ID = ' + id)
           
            res.redirect('/books')
        }
    })
})
   
module.exports = router;

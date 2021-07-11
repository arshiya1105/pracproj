var mysql=require('mysql');
// var connection = mysql.createConnection({ 
//     host:'localhost',
//     user:'pracisep',
// 	password:'syed@1105',
// 	database:'pracisep'
// });
// connection.connect(function(error){
//     if(!!error) {
// 		console.log(error);
//     } else {
// 		console.log('Connected books database..!');
// 	}
// })
// module.exports = connection;

var studentconnection = mysql.createConnection({ 
    host:'localhost',
    user:'studentsdata',
	password:'syed@1105',
	database:'studentsdata'
});
studentconnection.connect(function(error){
    if(!!error) {
		console.log(error);
    } else {
		console.log('Connected students database..!');
	}
})
module.exports = studentconnection;


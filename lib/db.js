var mysql=require('mysql');
var connection = mysql.createConnection({ 
    host:'localhost',
    user:'pracisep',
	password:'syed@1105',
	database:'pracisep'
});
connection.connect(function(error){
    if(!!error) {
		console.log(error);
    } else {
		console.log('Connected..!');
	}
})
module.exports = connection;

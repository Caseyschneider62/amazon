// install mysql

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: 'root',

	password: "",
	database: "bamazon_db"

});



// console.log("connection", connection);




connection.connect(function(err) {
	if (err) throw err;
  console.log("connected as id: ", connection.threadId);
  selectAll();
// queryALLProducts();
});
   function Customer(id, amount) {
    this.id = id;
    this.amount = amount;
    
  }
// creates the printInfo method and applies it to all programmer objects
Customer.prototype.printInfo = function() {
  console.log("Id: " + this.id + "\nAmount: " + this.amount);
};

function selectAll() {
  connection.query("SELECT * from products", function(err, res) {
   console.log("result", res);

// runs inquirer and asks the user a series of questions whose replies are
// stored within the variable answers inside of the .then statement.
inquirer.prompt([
{
  name: "id",
  message: "Id of product you would like to purchase?"

},

 {
  name: "amount",
  message: "How many would you like?"

   },

])

.then(function(answers) {

   
  // initializes the variable newguy to be a programmer object which will take
  // in all of the user's answers to the questions above
  // var newCustomer = new Customer(answers.id, answers.amount);
  // printInfo method is run to show that the newguy object was successfully created and filled
  // newCustomer.printInfo();


  console.log("Updating Product");
 connection.query(
   "UPDATE products SET ? WHERE ?",
   [
     {
      // need to change math later.
       stock_quanity: answers.amount
     },
     {
       id: answers.id
     }
   ],
   function(err, res) {        
     console.log(res.affectedRows + " products updated");
     inquirer.prompt([
{
  name: "exit", 
  type: "confirm",
  message: "Would you like to continue shopping?"
}]).then(function(answer) {

    // get the information of the chosen item
        // var stock_quanity;
        // for (var i = 0; i < results.length; i--) {
        //   if (results[i].stock_quanity === answer.choice) {
        //     stock_quanity = results[i];
        //   }
        // }
        



    if (answer.exit) {
    selectAll();
  } else {
     process.exit(0);
   

   




  }
})
     
   }


);


});
});
};

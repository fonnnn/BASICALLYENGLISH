// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixData from 'wix-data'; //setup to use dataset

$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	//console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code
	$w("#dataset1").onReady( () => {

		let count = $w("#dataset1").getTotalCount();	 //count stores the number of total index of database
		let randVerb = Math.floor(Math.random() * count + 1); 	//randomly selects an index to return a random verb | random integer between 0 and max index + 1

		$w("#dataset1").getItems(randVerb, 1)  //get random index which gets random verb
		.then( (result) => { 
		let items = result.items; 
		let totalCount = result.totalCount; 
		//let offset = result.offset; 		//disabled offset to keep index to start at 0
		let value = items[0].word; 
		
		
		$w('#text7').text = value;

		$w('#button1').label = "CHECK";

///////////////////////////////////////////////////////////////////
		//check answer function
		$w('#input1').onChange(
			(event) => {
			
			let userinput = $w('#input1').value.toLowerCase(); //takes what user inputs into box and makes it all lowercase to compare exact letterings
			var answer = value; //takes column from verbs database [wirds] but if subject is singlethird person then takes [3single] 
			

			if (userinput == answer) {	//if input and intended answers are the same then button (which has no function but to make it more obvious to click out of input box) displays different answer states correct wrong or check if nothing is inputed
				$w('#button1').label = "CORRECT!";
			}
			else  if (userinput == '') {
				$w('#button1').label = "CHECK";
			}
			else {
				$w('#button1').label = "WRONG...";
			}
			}
		);
///////////////////////////////////////////////////////////////////

		console.log(value);	//prints the random verb
		} ) 
		.catch( (err) => { 
		let errMsg = err.message; 
		let errCode = err.code; 
		} ); 

	} );
	 


});

// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixData from 'wix-data'; //setup to use dataset

$w.onReady(function () {

	function getTotalNoIndexofDataset(datasetid) {
		let count = $w(datasetid).getTotalCount();	 //count stores the number of total index of database	
		//console.log("count: " + count)
		return count;
	}

	function randomIndexNofromDataset(datasetid) {
		let count = getTotalNoIndexofDataset(datasetid);
		let randVerb = Math.floor(Math.random() * count + 1); 	//randomly selects an index to return a random verb | random integer between 0 and max index + 1
		//console.log("randverb: " + randVerb)
		return randVerb;
	}	

	function exercise()  {
		let randNoun = Math.random();

		var isrdsingular = false;

		if (randNoun <= 0.5) {

		$w("#dataset2").onReady( () => {	
			var datasetid = '#dataset2';
			$w(datasetid).getItems(randomIndexNofromDataset(datasetid), 1)  //get random index which gets random name
			.then( (result) => { 
				let items = result.items; 
				let rdsingular = items[0].singular;
				let name = items[0].name;
				//console.log("value: "+ name);	//prints the random name
				$w('#text8').text = name;
				isrdsingular = true;
			}) 
			.catch( (err) => { 
				let errMsg = err.message; 
				let errCode = err.code; 
			}); 


		}); 
		} else {

		$w("#dataset3").onReady( () => {	
			var datasetid = '#dataset3';
			$w(datasetid).getItems(randomIndexNofromDataset(datasetid), 1)  //get random index which gets random name
			.then( (result) => { 
				let items = result.items; 
				let singularNoun = items[0].word; //gets singular version of noun which is [word] column
				singularNoun = singularNoun.charAt(0).toUpperCase()+singularNoun.slice(1);		//capitalize first letter of word because grammar
				let pluralNoun = items[0].mod;	//gets plural version of noun which is the [mod] column
				pluralNoun = pluralNoun.charAt(0).toUpperCase()+pluralNoun.slice(1);			//capitalize first letter of word because grammar
				//console.log("value: "+ name);	//prints the random name
				let randNoun = Math.random(); //randomly chooses between the singular and the plural version for variety practice
				if (randNoun <= 0.5){$w('#text8').text = singularNoun; isrdsingular = true;}
				else {$w('#text8').text = pluralNoun; isrdsingular = false;}

			}) 
			.catch( (err) => { 
				let errMsg = err.message; 
				let errCode = err.code; 
			}); 


		}); 

		}

		$w("#dataset1").onReady( () => {
			var datasetid = '#dataset1';
			$w(datasetid).getItems(randomIndexNofromDataset(datasetid), 1)  //get random index which gets random verb
			.then( (result) => { 
				let items = result.items; 
				let rdsingular = items[0].singular;
				let notrdsingular = items[0].word;
				//console.log("value: "+ rdsingular);	//prints the random verb
				$w('#text7').text = notrdsingular;
				$w('#button1').label = "CHECK";
			///////////////////////////////////////////////////////////////////
				//check answer function
				$w('#input1').onChange(
					(event) => {
						let userinput = $w('#input1').value.toLowerCase(); //takes what user inputs into box and makes it all lowercase to compare exact letterings
						if (isrdsingular == true) {
						var answer = rdsingular; //takes column from verbs database [wirds] but if subject is singlethird person then takes [3single] 			
						}
						else {answer = notrdsingular}
						console.log(isrdsingular + answer);
						if (userinput == answer) {	//if input and intended answers are the same then button (which has no function but to make it more obvious to click out of input box) displays different answer states correct wrong or check if nothing is inputed
							$w('#button1').label = "CORRECT!";
							$w('#text11').text = "Good job!";
						}
						else  if (userinput == '') {
							$w('#button1').label = "CHECK";
							$w('#text11').text = ":D";
						}
						else {
							$w('#button1').label = "WRONG...";
							var reason;
							if (isrdsingular == true) {reason = 'The subject is singular so you must add "es" or "s" to the verb';}
							else  {reason = 'The subject is plural so you must remove the "es" or "s"  from the verb';}
							$w('#text11').text = reason;
						}
					}
				);
			///////////////////////////////////////////////////////////////////
			}) 
			.catch( (err) => { 
				let errMsg = err.message; 
				let errCode = err.code; 
			}); 
		}); 
	}
	
	exercise();
	$w('#button2').onClick(()=>{ exercise()}); //picks another random noun and verb which is to kind of reset the exercise


});

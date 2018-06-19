////////////////////////////
// FUNCTIONS ON PAGE LOAD //
////////////////////////////

window.onload = function() {
	// setup the Text Submit button 
	document.getElementById("Textsubmit").onclick = function() {
		sendTEXT();
	};

	// setup the JSON Submit button 
	document.getElementById("JSONsubmit").onclick = function() {
		sendJSON();
	};
}




////////////////////////
// SEND TEXT FUNCTION //
////////////////////////

function sendTEXT() {
	// collect the name value
	var name = document.getElementById('nameText').value;

	// log state and the variable to be sent 
	console.log(">> TEXT data : " + name);
	console.log(">> Sending..");

	// AJAX the variable to the server
	// and process the incoming data (text)
	$.ajax({
		type: "POST",
		url: "/text_receiver",
		data: name, 
		contentType:"text/plain; charset=utf-8",
  		dataType:"text",
		success : function(data) {
			// log the current state
			console.log("<< Received TEXT data : " + data);
			console.log("<< Success!");
			// print reponse on the document
			var message = "<b>" + data + "</b>";
			$('#TEXTresultHolder').html(message);
		},
		error : function(){
			console.log("<< Error!")
		}
	});

	// stop link from reloading the page
	event.preventDefault();
} 




////////////////////////
// SEND JSON FUNCTION //
////////////////////////

function sendJSON() {
	// collect variables 
	var name = document.getElementById('nameVar').value;
	var age = document.getElementById('ageVar').value;
	var country = document.getElementById('countryVar').value;

	// build a JavaScript object using the variables
	var data_object = {
			"name"		: name,
			"age"		: age,
			"country" 	: country 
		};

	// convert JavaScript object to JSON object
	var data_json = JSON.stringify(data_object);
	
	// log state and the JavaScript object (to be sent in JSON format)
	console.log(">> JSON data : ");
	console.log(data_object);
	console.log(">> Sending..");

	// AJAX the JSON object to the server 
	// and process the incoming data (JSON)
	$.ajax({
		type: "POST",
		url: "/json_receiver",
		data: data_json, 
		contentType:"application/json; charset=utf-8",
  		dataType:"json",
		success : function(data) {
			// log the current state
			console.log("<< Received JSON data : ");
			console.log(data);
			console.log("<< Success!");
			// genrate reponse and print on the document
			var message = "Hello, <b>" + data['name'] + "</b>. You are : <b>" + data['status'] + "</b> !";
			$('#JSONresultHolder').html(message);
		},
		error : function(){
			console.log("<< Error!")
		}
	});
	
	// stop link from reloading the page
	event.preventDefault();
}
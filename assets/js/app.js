$(document).ready(function(){
    
    // ..................................Code by Indima for words api..............................................

    var apiKey = "f631ef1902msh9f09d2e297d69a3p115d8ajsnfac73288f5c5";

    var queryURL = ""; 

    //This the input word 
    var queryWord = "";

    // This is the option user selects from the dropdown    
    var queryOption = "";

    var results;

    $(document).on("click","#submit",function(event){
        event.preventDefault();
        queryWord = $("#searchTerm").val().trim();        
        queryOption = $("#wordOption").find('option:selected').data("value");
        
        validateInput(queryWord);

        // queryWord = "Cool";
        // queryOption = "rhymes";

        queryURL = "https://wordsapiv1.p.mashape.com/words/"+ queryWord + "/" + queryOption ;        

        $.ajax({
            url : queryURL,
            method : "GET",
            headers : {"X-Mashape-Key":apiKey}
        }).done (function(response){
            // assign the array of words to a variable.

            if(queryOption === "rhymes"){
                // words for rhymes option has a neseted  object as all
                results = response[queryOption].all;              
            }
            else {
                results = response[queryOption];
            }
//....................................................................................................................                      
            // results - the array for the word could
//...............................................................................................................

    ///............................................................................................................
    var cloudObject = {
        type: 'wordcloud',
        options: {
            minLength: 4,
            ignore: ['establish','this'],
            
            rotate: true,
            words: [
                {
                    text:"time",
                    count:20
                },
                {
                    "text":"to",
                    "count":80
                },
                {
                    "text":"get",
                    "count":30
                },
                {
                    "text":"this",
                    "count":60
                },
                {
                    "text":"started",
                    "count":10
                },
                {
                    "text":"party",
                    "count":120
                }
            ]
        }
        };
           
          zingchart.render({ 
              id: 'wordCloud', 
              data: cloudObject, 
              height: 600, 
              width: '100%' 
          });
});
});
// ...........................................function validate input................................................

function validateInput(inputTerm){
// This function will validat   e the search term field for following conditions

//Check if serch term is null

var allowedLetters = /^[A-Za-z\s]+$/;
var inputValid = allowedLetters.test(inputTerm);
var multipleWords = inputTerm.indexOf(" ");

debugger;
try{
    if (inputTerm === "") throw ("Seach word cannot be empty");
       
    if (inputValid === false) throw ("alphabet characters only");
    
    if (multipleWords >0 ) throw ("Please enter a single word");
} 
catch(err) {
    alert(err);
}
}

});
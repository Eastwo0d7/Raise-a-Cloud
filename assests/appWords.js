$(function(){

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

//******************************************Test code*************************************************************** */

        //     //get array length
        //     var length = results.length;

        //    // read response
        //     for (var i = 0; i < length; i++){
        //         console.log(results[i]);
        //         //
        //     }
        });
        
       
    });


})
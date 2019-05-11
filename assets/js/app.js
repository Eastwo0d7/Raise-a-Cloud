$(document).ready(function(){
    var word;
    
    // ..................................Code by Indima for words api..............................................

    var apiKey = "f631ef1902msh9f09d2e297d69a3p115d8ajsnfac73288f5c5";

    var queryURL = ""; 

    //This the input word 
    var queryWord = "";


    // This is the option user selects from the dropdown    
    var queryOption = "";

    // function getWords(url,callback){
        $.ajax({
            queryUrl,
            method : "GET",
            headers : {"X-Mashape-Key":apiKey},
            success: function(data,status,xhr){
                console.log('success');
                callback(data);
            }
        }).done (function(response){
            
            // assign the array of words to a variable.
            if(queryOption === "rhymes"){
                // words for rhymes option has a neseted  object as all
                results = response[queryOption].all;              
            }
            else {
                results = response[queryOption];
            }
        });

    // }

    $("#submit").on("click",function(event){
        // var queryUrl;
        event.preventDefault();
        queryWord = $("#searchTerm").val().trim();
        queryOption = $("#wordOption").find('option:selected').data("value");
        queryURL = "https://wordsapiv1.p.mashape.com/words/"+ queryWord + "/" + queryOption ;
        getWords(queryUrl,function(arr){
            console.log(arr);
        });      
    });
//....................................................................................................................                      
            // results - the array for the word cloud
//...............................................................................................................

    ///............................................................................................................
    var cloudObject = {
        type: 'wordcloud',
        options: {
            minLength: 4,
            ignore: ['establish','this'],
            rotate: true,
            words: []
        }
    };
    function returnRandomNum(){
        var randomNum = (Math.random() * 200) + 1;
        return randomNum.toString();
    }
    for (i=0;i<results.length;i++){
        word = {
            text: results[i],
            count: returnRandomNum()
        }
        console.log(cloudObject.options.words);
        cloudObject.options.words.push(word);
    }
        
    zingchart.render({ 
        id: 'wordCloud', 
        data: cloudObject, 
        height: 800, 
        width: '100%' 
    });
});
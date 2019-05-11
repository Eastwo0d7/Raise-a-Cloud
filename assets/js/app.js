$(document).ready(function(){
    var word;
    
    // ..................................Code by Indima for words api..............................................

    var apiKey = "f631ef1902msh9f09d2e297d69a3p115d8ajsnfac73288f5c5";

    var queryURL = ""; 

    //This the input word 
    var queryWord = "";

    // This is the option user selects from the dropdown    
    var queryOption = "";

    function wordCloudify(wordsArray){
        // debugger;
        console.log(wordsArray);
        words=[];
        console.log(typeof wordsArray);
        // console.log(wordsArray[0]);
        for (i=0;i<wordsArray.length;i++){
            if (wordsArray[i].definition){
                words.push(wordsArray[i].definition);
            } else {
                words.push(wordsArray[i]);
            }
            // console.log(wordsArray[i]);
            
        }
        // console.log(words);

        console.log('words',words);
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
        for (i=0;i<words.length;i++){
            word = {
                text: words[i],
                count: returnRandomNum()
            }
            // console.log(cloudObject.options.words);
            cloudObject.options.words.push(word);
        }
        zingchart.render({ 
            id: 'wordCloud', 
            data: cloudObject, 
            height: 600, 
            width: '100%' 
        });
    }
    $(document).on("click","#submit",function(event){
        event.preventDefault();
        queryWord = $("#searchTerm").val().trim();
        queryOption = $("#wordOption").find('option:selected').data("value");
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
                wordCloudify(results);            
            }
            else {
                results = response[queryOption];
                wordCloudify(results);
            }
        });
    });
});
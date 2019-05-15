$(document).ready(function(){
    var word;
    
    // ..................................Code by Indima for words api..............................................

    var apiKey = "f631ef1902msh9f09d2e297d69a3p115d8ajsnfac73288f5c5";

    var queryURL = ""; 

    //This the input word 
    var queryWord = "";

    // This is the option user selects from the dropdown    
    var queryOption = "";
    function returnRandomWord(array){
        var randomNum = Math.floor(Math.random()*array.length);
        return array[randomNum];
    }
    function scrollTo(target){
        var offsetTop = $(target).offset().top;
        // console.log(offsetTop);
        $(window).scrollTop(offsetTop);
    }
    function wordCloudify(wordsArray){
        // debugger;
        // console.log(wordsArray);
        words=[];
        // console.log(typeof wordsArray);
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

        // console.log('words',words);
        var cloudObject = {
            type: 'wordcloud',
            options: {
                minLength: 4,
                ignore: [],
                rotate: true,
                words: [],
                minFontSize: 20
            }
        };
        function returnRandomNum(){
            var randomNum = Math.floor((Math.random() * 200) + 1);
            // console.log(randomNum);
            return randomNum.toString();
        }
        for (i=0;i<words.length;i++){
            word = {
                text: words[i],
                count: returnRandomNum()
            }
            cloudObject.options.words.push(word);
        }
        // console.log(cloudObject.options.words);
        zingchart.render({ 
            id: 'wordCloud', 
            data: cloudObject, 
            height: 700, 
            width: '100%' 
        });
    }
    function youTubify(searchTerm){
        // console.log('something');
        var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&videoCaption=any&videoEmbeddable=true&key=AIzaSyBFdAj180yBiZ33C3-xrOPQYshWRWEyAdQ&q"+searchTerm
            $.ajax({
            url: queryURL,
            method: "GET" 
    
        }).done(function(response){
            // console.log(response);
            
            var results = response.items;
            var videoIds = [];
    
            for (var i = 0; i < results.length; i++) {
                //div to hold video 
                videoIds.push(results[i].id.videoId);
            }
            // console.log(videoIds);
            // brettsFunction(videoIds);
        });
    }
// Check to see if user has signed up:
    if (localStorage.getItem('wordCloudUser')){
        console.log('user exists');
        $('#username-field').hide();
    } else {
        console.log('user not found');
    }
    $(document).on("click","#submit",function(event){
        event.preventDefault();
        userName = $('#username').val().trim();
        localStorage.setItem('wordCloudUser',userName);
        queryWord = $("#searchTerm").val().trim();
        queryOption = $("#wordOption").find('option:selected').data("value");
        queryURL = "https://wordsapiv1.p.mashape.com/words/"+ queryWord + "/" + queryOption ;        
        $.ajax({
            url : queryURL,
            method : "GET",
            headers : {"X-Mashape-Key":apiKey},
            statusCode : {
                404: function(){
                    alert('404 error!!')
                }
            }
        }).done(function(response){
            // assign the array of words to a variable.
            if(queryOption === "rhymes"){
                // words for rhymes option has a neseted  object as all
                results = response[queryOption].all;  
                wordCloudify(results);   
                youTubify(returnRandomWord(results));         
            }
            else {
                results = response[queryOption];
                wordCloudify(results);
                youTubify(returnRandomWord(results));
            }
        });
        setTimeout(function(){
            scrollTo('#youtube-listing-wrapper');
        });
    });
});


$(document).ready(function(){
    var word;
    
    // ..................................Code by Indima for words api..............................................

    var apiKey = "f631ef1902msh9f09d2e297d69a3p115d8ajsnfac73288f5c5";

    var queryURL = ""; 

    //This the input word 
    var queryWord = "";

    // This is the option user selects from the dropdown    
    var queryOption = "";

    var alertModal = $("#alertModal");

    alertModal.modal({show:false});


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
                ignore: [],
                rotate: true,
                words: [],
                minFontSize: 20
            }
        };
        function returnRandomNum(){
            var randomNum = Math.floor((Math.random() * 200) + 1);
            console.log(randomNum);
            return randomNum.toString();
        }
        for (i=0;i<words.length;i++){
            word = {
                text: words[i],
                count: returnRandomNum()
            }
            cloudObject.options.words.push(word);
        }
        console.log(cloudObject.options.words);
        zingchart.render({ 
            id: 'wordCloud', 
            data: cloudObject, 
            height: 700, 
            width: '100%' 
        });
    }

    // ..........................................................................................................

    function youTubify(){
        console.log('something');
        var thing = $(this).attr("data");
        var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&videoCaption=any&videoEmbeddable=true&key=AIzaSyBFdAj180yBiZ33C3-xrOPQYshWRWEyAdQ"
    
        // $(".instructions").show();
        $.ajax({
            url: queryURL,
            method: "GET" 
    
        }).done(function(response){
            console.log(response);
            
            var results = response.items;
            var videoIds = [];
    
            for (var i = 0; i < results.length; i++) {
                //div to hold video 
                videoIds.push(results[i].id.videoId);
            }
            console.log(videoIds);
            // brettsFunction(videoIds);
        });
    }
    //..............................................................................
// Check to see if user has signed up:
    // if (localStorage.getItem('wordCloudUser')){
    //     console.log('user exists');
    //     $('#username-field').hide();
    // } else {
    //     console.log('user not found');
    // }

    //.........................................................function for submit button.............................
    $(document).on("click","#submit",function(event){
        event.preventDefault();
      
        


        // userName = $('#username').val().trim()  ;
        // localStorage.setItem('wordCloudUser',userName);
        queryWord = $("#searchTerm").val().trim();
        queryOption = $("#wordOption").find('option:selected').data("value");

        validateInput(queryWord);


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
                youTubify();         
            }
            else {
                results = response[queryOption];
                wordCloudify(results);
                youTubify();
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
    // alert(err);
    var errMessage = $("<p>");
    errMessage.text(err);

    console.log($("errMessage".text));
    // $("#submit").data("toggele","modal");
    // $("#myModal").modal('show');
    $("#modalText").append(errMessage);
    alertModal.modal('show');
       
    // $("#sumbit").data("target","#myModal");
}
}

});
          // YouTube API coding//
        //   $(document).on("click", "#submit", function(event){
        //       event.preventDefault();
        //       console.log('something');
        //       var thing = $(this).attr("data");
        //       var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&videoCaption=any&videoEmbeddable=true&key=AIzaSyBFdAj180yBiZ33C3-xrOPQYshWRWEyAdQ"
          
        //       $(".instructions").show();
        //       $.ajax({
        //           url: queryURL,
        //           method: "GET" 
          
        //       }).done(function(response){
        //           console.log(response);
                  
        //           var results = response.data;
          
        //           for (var i = 0; i < results.length; i++) {
        //               //div to hold video 
        //               var topicDiv =$("<div>"); 
        //           }
        //       });
          
        //     });
//         });
//     });
// });


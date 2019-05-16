$(document).ready(function(){
    var word;
    
    // ..................................Code by Indima for words api..............................................

    var apiKey = "f631ef1902msh9f09d2e297d69a3p115d8ajsnfac73288f5c5";

    var queryURL = ""; 

    //This the input word 
    var queryWord = "";
    // var youTubeQuery;

    // This is the option user selects from the dropdown    
    var queryOption = "";
    function initSlick(target){
        $(target).slick({
            slidesToShow: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            centerMode: true,
            adaptiveHeight: true,
            centerPadding: '50px',
            variableWidth: false,
        });
    }
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
        console.log(searchTerm);
        if ($('#youtubebox').hasClass('slick-slider')) {
            $('#youtubebox').slick('unslick');
        }
        // var youTubeQuery;
        try {
            var youTubeQuery = searchTerm.definition;
        } catch {
            var youTubeQuery = searchTerm;
        }
            // console.log(wordsArray[i]);
            
        var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&videoCaption=any&videoEmbeddable=true&key=AIzaSyBFdAj180yBiZ33C3-xrOPQYshWRWEyAdQ&q=" + youTubeQuery
        // $(".instructions").show();
        $.ajax({
            url: queryURL,
            method: "GET" 
    
        }).done(function(response){
            // console.log(response);
            
            var results = response.items;
            console.log(results);
            var videoIds = [];
    
            for (var i = 0; i < results.length; i++) {
                //div to hold video 
                console.log(results[i].snippet.title)
                videoIds.push({
                    id: results[i].id.videoId,
                    title: results[i].snippet.title,
                    img: results[i].snippet.thumbnails.high.url
                });
            }
            // console.log(videoIds);


            var youTubeWrapper;
            var playButton;
            var imageThumb;
            var title;
            var videoId;
            for (var i = 0; i < videoIds.length; i++) {
                videoId = videoIds[i].id;
                youTubeWrapper = $("<div>");
                playButton = $('<div>');
                imageThumb = $('<img>');
                title = $('<div>');
                title.addClass('video-title');
                title.text(videoIds[i].title);
                imageThumb.attr('src', videoIds[i].img);
                youTubeWrapper.addClass('youtube');
                youTubeWrapper.attr('data-id',videoId);
                playButton.addClass('play-button');
                youTubeWrapper.append(playButton);
                youTubeWrapper.append(imageThumb);
                youTubeWrapper.append(title);
                // var video = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoIds[i] + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                // // console.log(videoIds[i]);
                // youTubeWrapper.html(video);
                // console.log(youTubeWrapper);
                $("#youtubebox").append(youTubeWrapper);
            }
            initSlick("#youtubebox");
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
                // console.log(results);
                wordCloudify(results);
                youTubify(returnRandomWord(results));
            }
        });
        setTimeout(function(){
            scrollTo('#youtubebox');
        });
    });
    $(document).on('click','.youtube',function(){
        var iframe = $('<iframe>');
        var source = "https://www.youtube.com/embed/"+ $(this).attr('data-id') +"?rel=0&showinfo=0&autoplay=1";
        iframe.attr('src',source);
        $(this).html('');
        $(this).append(iframe);
    });
});


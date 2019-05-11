$("#buttonArea").on("click", ".btn", function(){
    var thing = $(this).attr("data");
    var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&videoCaption=any&videoEmbeddable=true&key=AIzaSyBFdAj180yBiZ33C3-xrOPQYshWRWEyAdQ"

    $(".instructions").show();
    $.ajax({
        url: queryURL,
        method: "GET" 

    }).done(function(response){
        console.log(response);
        
        var results = response.data;

        for (var i = 0; i < results.length; i++)}
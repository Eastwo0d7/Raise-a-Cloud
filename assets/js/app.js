$(document).ready(function(){
    
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
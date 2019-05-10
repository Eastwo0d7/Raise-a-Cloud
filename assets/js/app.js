$(document).ready(function(){
    
    var cloudObject = {
        type: 'wordcloud',
        options: {
            minLength: 4,
            ignore: ['establish','this'],
            
            rotate: true,
            words: [
                {
                    "text":"time",
                    "count":20
                },
                {
                    "text":"to",
                    "count":80
                },
                {
                    "text":"light",
                    "count":30
                },
                {
                    "text":"this",
                    "count":60
                },
                {
                    "text":"shit",
                    "count":10
                },
                {
                    "text":"on",
                    "count":90
                }
                ,{
                    "text":"fire",
                    "count":120
                }
            ]
        }
        };
           
          zingchart.render({ 
              id: 'wordCloud', 
              data: cloudObject, 
              height: 400, 
              width: '100%' 
          });
});
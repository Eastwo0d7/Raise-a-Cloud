$(document).ready(function(){


    var response;
    var word;
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
    for (i=0;i<response.length;i++){
        word = {
            text: response[i],
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
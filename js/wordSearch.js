var totalWords = 0;
var curWords = 0;

function word(text, color, image)
{
    this.text = text;
    this.color = color;
    this.len = text.length;
	this.getCapture = function(curId)
	{
		//unbind click of the current clicked word
		var temp = this.text;
		var temps = this.color;
		$('#' + curId)
			.css('background', this.color)
			.unbind('click')
			.removeAttr('onClick');
			
		//unbind click technique of rest words
		$('#wordSearch td').each(function(index, element)		//swap onClick to onClicks
		{
			if(!$(this).hasClass(temp))
			{
				var tempEvent = $(this).attr('onClick');
				$(this).removeAttr('onClick');
				$(this).attr('onClicks', tempEvent);
			}
        });//end each function
		
		this.len--;
		
		//word found
		if(this.len == 0)
		{
			//highlight word in the container
			$('#'+this.text).css('color', 'black');				
			$('#'+this.text).css('background', this.color);
			
			//show image in the container
			$('#img' + this.text).fadeIn();
			
			$('#wordSearch td').each(function(index, element)
			{
				if($(this).attr('class') != null)		//swap onClicks to onClick
				{
				   var tempEvent = $(this).attr('onClicks');
				   $(this).removeAttr('onClicks');
				   $(this).attr('onClick', tempEvent);
				}
			});
			
			
			curWords = curWords + 1;
			if(curWords == totalWords)
			{
				completeActivity();
			}
		}//end if
	}//end getCapture
	
	
	//constructor
	$('#wordSearch .' + text).attr('onClick', text + '.getCapture(this.id);');		//add event to each letter of the word
	$('#wordsCollection').append('<span id="' + text + '">' + text + '</span>');	//add the word to the container
	$('#wordsImages').append('<img src="img//wordImg//' + image + '" id="img' + this.text + '"/>');			//add the image to the container (hidden)
	
	totalWords = totalWords + 1;										
}



function addDynamicId()
{
	$('#wordSearch td').each(function(index, element)
	{
        $(this).attr('id', 'word' + index);
    });
}
addDynamicId();

function completeActivity()
{
	document.write('<h3>Activity Completed</h3>');
}

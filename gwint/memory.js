var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var boardHtml = "";

for(i = 0; i < 12; i++)
{
	boardHtml = boardHtml + "<div class=\"card\" id=\"c" + i +"\" onclick=\"revealCard(" + i + ")\"></div>";
}

$('.board').html(boardHtml);

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

shuffleArray(cards);

function revealCard(nr)
{
	var opacityValue = $('#c'+nr).css('opacity');
	//alert('opacity: '+ opacityValue);
	
	if(opacityValue != 0 && lock == false)
	{
		lock = true;
		//alert(nr);
	
		var obraz = "url(img/" + cards[nr] + ")";
		$('#c'+ nr).css('background-image', obraz);
		$('#c'+ nr).addClass('cardA');
		$('#c'+ nr).removeClass('card');
		
		if(oneVisible == false)
		{
			//first card
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
			
			if(cards[visible_nr] == cards[nr])
			{
				//alert("para");
				
				setTimeout(function() {hide2Cards(nr, visible_nr) }, 750);
			}
			else
			{
				//alert("pudło");
				
				setTimeout(function() {restore2Cards(nr, visible_nr) }, 1000);
			}
			
			turnCounter++;
			$('.score').html('Turn counter: ' + turnCounter);
			oneVisible = false;
		}
	}
}

function hide2Cards(nr1, nr2)
{
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	
	pairsLeft--;
	if(pairsLeft == 0)
	{
		$('.board').html('<h1>You win!<br>Done in '+turnCounter+' turns</h1> <br/> <br/> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>');
	}
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	$('#c'+ nr1).css('background-image', 'url(img/karta.png)');
	$('#c'+ nr1).addClass('card');
	$('#c'+ nr1).removeClass('cardA');
	
	$('#c'+ nr2).css('background-image', 'url(img/karta.png)');
	$('#c'+ nr2).addClass('card');
	$('#c'+ nr2).removeClass('cardA');
	
	lock = false;
}

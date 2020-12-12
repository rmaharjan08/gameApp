var cardsArray = [
    {   'name': 'CSS',  'img': 'https://images.unsplash.com/photo-1576080121747-26ade08979f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', },
    {   'name': 'HTML',  'img': 'https://images.unsplash.com/photo-1602980045360-d94be60e4775?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', },
    {   'name': 'jQuery',  'img': 'https://images.unsplash.com/photo-1604335963950-6c890b1cf901?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', },
    {   'name': 'JS',  'img': 'https://images.unsplash.com/photo-1605719720722-a14496ab72f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80', },
    {   'name': 'Node',  'img': 'https://images.unsplash.com/photo-1567650076010-186173332565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80', },
    {   'name': 'Photo Shop',  'img': 'https://images.unsplash.com/photo-1547619378-933802c1fd76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2052&q=80', },
    {   'name': 'PHP',  'img': 'https://images.unsplash.com/photo-1450631835004-9b95ff5cd66f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', },
    {   'name': 'Python',  'img': 'https://images.unsplash.com/photo-1575477690186-2c9d7e60dee2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', },
    {   'name': 'Ruby',  'img': 'https://images.unsplash.com/photo-1535382651921-5e77ea4458f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80', },
    {   'name': 'Sass',  'img': 'https://images.unsplash.com/photo-1463780324318-d1a8ddc05a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', },
    {   'name': 'Sublime',  'img': 'https://images.unsplash.com/photo-1505205296326-2178af1b47bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', },
    {   'name': 'Wordpress',  'img': 'https://images.unsplash.com/photo-1605816246109-01290c07c5a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80', },
];

// Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function() {
    return 0.5 - Math.random();

})

//to acess the first array, use cardsArray[0].name; //css

//grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');

//create a section element and assign it to variable grid
var grid = document.createElement('section');

//give sectioni elemtna a class of grid.
grid.setAttribute('class', 'grid');

//append the grid section to the game-board div
game.appendChild(grid);

//loop through each item in our cards array
for(i=0; i < gameGrid.length; i++) {
    //create a div element and assign to variable card
    var card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';

// Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

//Add match CSS
var match = function() {
    var selected = document.querySelectorAll('.selected');
    //loop through the array like object containing 'selected'class
    for (i=0; i<selected.length; i++){
        selected[i].classList.add('match');
    }
};

var resetGuesses = function() {
    firstGuess = '' ;
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i< selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};

//Add event listener to grid
grid.addEventListener('click', function(event){

    var clicked = event.target;    //Declare a variable to target our clicked item

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected') ) {  // Do not allow the grid section itself to be selected;   // only select divs inside the grid
        return;
    }
    
    if (count < 2) {  // We only want to add 'selected'class if the current count is less than 2
        count++;

        if(count === 1){
            //assign first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.classList.add('selected');
        } else {
            //assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        //if both guesses are not empty
        if (firstGuess !== '' && secondGuess !== '') {
            //and the firstguess matches secondguess
            if(firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;

    }
});
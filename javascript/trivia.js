var counter = 10;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

function nextQuestion() {
    var isQuestionOver = (questionsArray.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('Game Over!!')
        displayResult()
    } else {
        currentQuestion++;
        loadQuestion();
    }

};

function timeUp() {
    clearInterval(timer);
    lost++;
    loadImages('lost')
    setTimeout(nextQuestion, 3 * 1000);
};

function countDown() {
    counter--;
    $('#time').html('Timer: ' + counter);
    if (counter === 0) {
        timeUp();
    };
};


function loadQuestion() {
    counter = 10;
    timer = setInterval(countDown, 1000)
    var question = questionsArray[currentQuestion].question;
    var choice = questionsArray[currentQuestion].choice;
    $('#time').html('Timer: ' + counter)
    $('#game').html(`
    <h4>${question}</h4>
    ${loadChoices(choice)}
    `);
};


function loadChoices(choice) {
    let results = '';
    for (var i = 0; i < choice.length; i++) {
        results += `<p class='choice' data-answer='${choice[i]}'>${choice[i]}</p>`;
    }
    return results;
};
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    var correstAnswer = questionsArray[currentQuestion].correctAnswer;

    if (correstAnswer === selectedAnswer) {
        score++
        loadImages('win');
        setTimeout(nextQuestion, 3 * 1000);
        console.log('win');
    } else {
        lost++
        loadImages('lost');
        setTimeout(nextQuestion, 3 * 1000);
        console.log('lost')
    }

});

function displayResult() {
    var results = `
    <p> You got ${score} question(s) right</p>
    <p> You got ${lost} question(s) wrong</p>
    <p> Total ${questionsArray.length} question(s)</p>
    <button class="btn btn-primary" id="reset"> Reset Game</button>
    `
    $('#game').html(results);
}
$(document).on('click', '#reset', function () {
    counter = 10;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    loadQuestion();
});

function selectImage(images) {
    var random = Math.floor(Math.random() * images.length);
    var selectImage = images[random];
    return selectImage;

}

function loadImages(status){
    var correctAnswer = questionsArray[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
        <p class="preload-image">Correct!!!!!</p>
        <p class="preload-image">The right answer is ${correctAnswer}</p>
        <img src="${selectImage(rightImages)}"/>
        `);
        
    } else{
        $('#game').html(`
        <p class="preload-image">The right answer is ${correctAnswer}</p>
        <p class="preload-image">Wrong!!!!!</p>
        <img src="${selectImage(wrongImages)}"/>
        `);
    }
}

$('#start').click(function(){
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
})
var questionAnswers=[
	{
		question: 'Question 1?',
		answers: {
			'answer 1' : false,
			'answer 2' : true
		}
	},{
		question: 'Question 2?',
		answers: {
			'Answer 1' : false,
			'Answer 2' : true,
			'Answer 3' : false,
			'Answer 4' : true,
			'Answer 5' : false,
			'Answer 6' : true,
			'Answer 7' : false,
			'Answer 8' : true
		}
	}
];

var changedQuestion = false;
var recentQuestionAnswerIndex = null;

function addGoodAnswers () {
	if (typeof(Storage) !== "undefined") {
		//////////////////////////////////////////////
		//change goodTestAnswers to your variable!!!//
		//////////////////////////////////////////////
		if (localStorage.goodTestAnswers && changedQuestion == true) {
		  localStorage.goodTestAnswers = Number(localStorage.goodTestAnswers)+1;
		} else if (!localStorage.goodTestAnswers) {
		  localStorage.goodTestAnswers = 0;
		}
		document.getElementById('goodAnswers').innerHTML = localStorage.goodTestAnswers;
	}
}

function initQuestionAnswerHtml() {
	var index = Math.floor(Math.random() * questionAnswers.length);
	var questionAnswer = questionAnswers[index];
	document.getElementById('question').innerHTML = questionAnswer.question;
	var questions = '';	
	for (var i in questionAnswer.answers) {
		questions += '<input type="checkbox" name="answer" value="' + questionAnswer.answers[i] + '"><span>'+i+'</span></br>';
	}
	document.getElementById('answers').innerHTML = questions;
	changedQuestion = true;
	recentQuestionAnswerIndex = index;
}

function init() {
	addGoodAnswers();
	initQuestionAnswerHtml();	
}

function checkAnswers() {
	var allGood = true;
	var answers = document.getElementsByName('answer');
	for (var i = 0; i < answers.length; i++) {			
		if (answers[i].value == 'true' && answers[i].checked == true || (answers[i].value == 'false' && answers[i].checked == false)) {
			document.getElementsByTagName('span')[i].className = 'lime';
		} else {
			document.getElementsByTagName('span')[i].className = 'red';
			allGood = false;
		}
	}
	if (allGood == true && changedQuestion == true) {
		addGoodAnswers();
		questionAnswers.slice(recentQuestionAnswerIndex,1);
	}
	changedQuestion = false;
}
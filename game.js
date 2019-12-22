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
	},{
		choice: ['choice1', 'choice2', 'choice3'],
		answers: {
			'answer1': 0,
			'answer2': 1,
			'answer3': 2
		}
	}
];

var changedQuestion = false;
var recentQuestionAnswerIndex = null;
var coice = null;

function addGoodAnswers () {
	if (typeof(Storage) !== "undefined") {
		if (localStorage.goodAnswers && changedQuestion == true) {
		  localStorage.goodAnswers = Number(localStorage.goodAnswers)+1;
		} else if (!localStorage.goodAnswers) {
		  localStorage.goodAnswers = 0;
		}
		document.getElementById('goodAnswers').innerHTML = localStorage.goodAnswers;
	}
}

function initQuestionAnswerHtml() {
	var index = Math.floor(Math.random() * questionAnswers.length);
	var questionAnswer = questionAnswers[index];
	var answers = '';
	if (questionAnswer.question != null) {
		coice = false;
		document.getElementById('question').innerHTML = questionAnswer.question;
		for (var i in questionAnswer.answers) {
			answers += '<input type="checkbox" name="answer" value="' + questionAnswer.answers[i] + '"><span>'+i+'</span></br>';
		}
	} else {
		coice = true;
		var combobox = '<select>';
		var questions = '';
		for (var i in questionAnswer.choice) {
			questions += ' ' + questionAnswer.choice[i];
			combobox += '<option value="'+questionAnswer.choice[i]+'">'+questionAnswer.choice[i]+'</option>';
		}
		document.getElementById('question').innerHTML = questions;
		combobox += '</select>'
		for (var i in questionAnswer.answers) {
			answers += combobox + '<span class="inline" answer='+questionAnswer.answers[i]+'>'+[i]+'</span></br>';
		}
	}
	document.getElementById('answers').innerHTML = answers;
	changedQuestion = true;
	recentQuestionAnswerIndex = index;
}

function init() {
	addGoodAnswers();
	initQuestionAnswerHtml();	
}

function checkAnswers() {
	var allGood = true;
	if (coice == false) {
		var answers = document.getElementsByName('answer');
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].value == 'true' && answers[i].checked == true || (answers[i].value == 'false' && answers[i].checked == false)) {
				document.getElementsByTagName('span')[i].className = 'lime';
			} else {
				document.getElementsByTagName('span')[i].className = 'red';
				allGood = false;
			}
		}
	} else {
		var answers = document.getElementsByTagName('select');
		for (var i = 0; i < answers.length; i++) {
			var answerSpan = document.getElementsByTagName('span')[i];
			if (answers[i].selectedIndex == answerSpan.getAttribute('answer')) {
				answerSpan.className = 'lime';
			} else {
				answerSpan.className = 'red';
				allGood = false;
			}
		}
	}
	if (allGood == true && changedQuestion == true) {
		addGoodAnswers();
		questionAnswers.slice(recentQuestionAnswerIndex,1);
	}
	changedQuestion = false;
}
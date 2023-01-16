// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeCrF6vPhvTYcwM4vaMaHB0Pfdyt9Jm0Q",
  authDomain: "quizz-app-ba4a6.firebaseapp.com",
  databaseURL: "https://quizz-app-ba4a6-default-rtdb.firebaseio.com",
  projectId: "quizz-app-ba4a6",
  storageBucket: "quizz-app-ba4a6.appspot.com",
  messagingSenderId: "381334678943",
  appId: "1:381334678943:web:ee0e2aa9bdb40330e0a1aa",
  measurementId: "G-799TX2FJ11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)

let loader = document.getElementById('loading');
let showQuestion = document.getElementById('showQuestion');

// Function for rendor question from databse

function getDataFromDatabase() {
loader.style.display = 'block'
showQuestion.style.display = 'none';


const reference = ref(db,'questions/')
onChildAdded(reference,function(data){
      console.log(data.val())
      questions.push(data.val())
      loader.style.display = 'none'
     showQuestion.style.display = 'block';

      renderQuestion()
 })
}

getDataFromDatabase()



var questions = [];

//Getting Show question

var question = document.getElementById("question");

//Getting question number

var questionNum = document.getElementById("questionNum");

//Getting Options

var ansParent = document.getElementById("ansParent");


var main = document.getElementById("main");

var indexNum = 0;
var marks = 0;

window.checkAnswers = function (a, b) {
  if (a == b) {
      marks++
  }
  if (indexNum + 1 == questions.length) {
      main.innerHTML = `<div><h2 class='text-dark'> YOUR MARKS IS ${marks} </h2></div>`
  }
  else {

      nextQuestion();
  }
}

window.nextQuestion = function () {
  indexNum++
  renderQuestion()
}


function renderQuestion () {
  let obj = questions[indexNum]
  question.innerHTML = obj.question;
  questionNum.innerHTML =
      "Question # " + (indexNum + 1) + "/" + questions.length;

//for empty before starting loop..

  ansParent.innerHTML = ''

  //loop for rendor option
  
  for (var i = 0; i < obj.options.length; i++) {
      ansParent.innerHTML += `<div class="col-md-6 py-2 ">
     <button onclick="checkAnswers('${obj.options[i]}','${obj.correctAns}')" class="btn btn-primary rounded-pill">
    ${obj.options[i]}
    </button>
</div>`
  }
}
renderQuestion()















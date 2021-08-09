// 1) Listen three words with answers
// 2) English to Russian
// 3) Russian to English
// 4) Russian to English keyboard

const db = [
  {
    question: 'Hi',
    answer: 'Привет',
    variants: ['Поехали', 'Привет', 'Как дела?'],
    video: 'first'
  },
  {
    question: "What's up",
    answer: 'Как дела?',
    variants: ['Как дела?', 'Привет', 'Поехали'],
    video: 'second'
  },
  {
    question: "Let's go",
    answer: 'Поехали',
    variants: ['Как дела?', 'Поехали', 'Привет'],
    video: 'third'
  }
];

const dbThird = [
  {
    question: 'Привет',
    answer: 'Hi',
    variants: ["What's up", "Let's go", 'Hi'],
    video: 'first'
  },
  {
    question: "Как дела?",
    answer: "What's up",
    variants: ["What's up", 'Hi', "Let's go"],
    video: 'second'
  },
  {
    question: 'Поехали',
    answer: "Let's go",
    variants: ['Hi', "What's up", "Let's go"],
    video: 'third'
  }
];

const {log} = console;

const allStepsHtml = document.querySelectorAll('.step');
const startBtn = document.querySelector('.start_btn');
const firstStepBtn = document.querySelector('.next_step');
const secondStepBtns = document.querySelectorAll('.step_2_btn_item');

let step = 1;
let start = false;
let firstStepNumber = 0;
let secondStepNumber = 0;
let thirdStepNumber = 0;
let fourthStepNumber = 0;

const hideStep = (number) => {
  const hideElement = document.querySelector(`.step_${number}`);
  hideElement.style.display = 'none';
}

const showStep = (number) => {
  const showElement = document.querySelector(`.step_${number}`);
  showElement.style.display = 'flex';
}

const showFirstStepElement = () => {
  const item = db[firstStepNumber];
  generateFirstStep(item.video, item.question, item.answer);
}

const showSecondStepElement = () => {
  const dbItem = db[secondStepNumber];
  generateSecondStep(dbItem.question, dbItem.variants);
}

const showThirdStepElement = () => {
  const dbItem = dbThird[thirdStepNumber];
  generateThirdStep(dbItem.question, dbItem.variants);
}

const showFourthStepElement = () => {
  const dbItem = dbThird[fourthStepNumber];
  generateFourthStep(dbItem.question, dbItem.answer);
}

const generateFirstStep = (videoName, eng, rus) => {
  const video = document.querySelector('.step_1 video');
  video.src = `./videos/${videoName}.mp4`;
  document.querySelector('.explanation_eng').textContent = eng;
  document.querySelector('.explanation_rus').textContent = rus;
}

const generateSecondStep = (question, variants) => {
  const wrap = document.querySelector('.step_2_wrap');
  document.querySelector('.step_2_question').textContent = question;
  document.querySelectorAll('.step_2_btn_item').forEach(item => {
    item.style.display = 'none';
  });

  for (let index = 0; index < variants.length; index++) {
    const btn = document.createElement('button');
    btn.classList.add('step_2_btn_item');
    btn.textContent = variants[index];
    wrap.append(btn);

    btn.addEventListener('click', () => {
      const element = db[secondStepNumber];
      
      if (btn.textContent === element.answer) {
        btn.style.background = 'lightgreen';
        secondStepNumber++;

        if (secondStepNumber === db.length) {
          secondStepNumber = 0;
          step = 3;
          setTimeout(() => {
            hideStep(2);
            showStep(step);
            processThirdStep();
          }, 1000);
        } else {
          setTimeout(() => {showSecondStepElement()}, 1000);
        }
      } else {
        btn.style.background = 'rgb(230, 115, 115)';
      }
    });
  }
}

const generateThirdStep = (question, variants) => {
  const wrap = document.querySelector('.step_3_wrap');
  document.querySelector('.step_3_question').textContent = question;
  document.querySelectorAll('.step_3_btn_item').forEach(item => {
    item.style.display = 'none';
  });

  for (let index = 0; index < variants.length; index++) {
    const btn = document.createElement('button');
    btn.classList.add('step_3_btn_item');
    btn.textContent = variants[index];
    wrap.append(btn);

    btn.addEventListener('click', () => {
      const element = dbThird[thirdStepNumber];
      
      if (btn.textContent === element.answer) {
        btn.style.background = 'lightgreen';
        thirdStepNumber++;

        if (thirdStepNumber === db.length) {
          thirdStepNumber = 0;
          step = 4;
          setTimeout(() => {
            hideStep(3);
            showStep(step);
            processFourthStep();
          }, 1000);
        } else {
          setTimeout(() => {showThirdStepElement()}, 1000);
        }
      } else {
        btn.style.background = 'rgb(230, 115, 115)';
      }
    });
  }
}

for (let index = 1; index <= allStepsHtml.length; index++) {
  hideStep(index);
}

startBtn.addEventListener('click', () => {
  start = true;

  if (start === true) {
    showStep(step);
    startBtn.style.display = 'none';
    showFirstStepElement();
  }
});

firstStepBtn.addEventListener('click', () => {
  firstStepNumber++;
  
  if (firstStepNumber === db.length) {
    firstStepNumber = 0;
    step = 2;
    hideStep(1);
    showStep(step);
    showSecondStepElement();
  };
  
  showFirstStepElement();
}); 

const processThirdStep = () => {showThirdStepElement()};

const generateFourthStep = (question, answer) => {
  const htmlQuestion = document.querySelector('.step_4_question');
  const input = document.querySelector('.step_4_input');

  htmlQuestion.textContent = question;

  input.addEventListener('input', () => {
    if (input.value === answer) {
      fourthStepNumber++;
      input.style.background = 'lightgreen';

      if (fourthStepNumber === dbThird.length) {
        fourthStepNumber = 0;
        step = 0;
        setTimeout(() => {
          hideStep(4);
          document.querySelector('.done').style.opacity = '1';
        }, 1000);
      } else {
        setTimeout(() => {showFourthStepElement()}, 1000);
      }
    } else {
      input.style.background = 'rgb(230, 115, 115)';
    }
  });
}

const processFourthStep = () => {
  showFourthStepElement();
}
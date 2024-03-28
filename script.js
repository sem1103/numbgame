let p = document.getElementById('text');
let rangeP = document.getElementById('rangeT');
let guiessT = document.getElementById('guiessT');
let startBtn = document.getElementById('start');
let checkNumbs = document.getElementById('setDigit');
let exitBtn = document.getElementById('exit');
let guiessBtn = document.getElementById('guiessBtn');

let startGame = document.getElementById('start_game');
let setDigit = document.getElementById('set_digit');
let guessing = document.getElementById('guessing');

let inpFrom = document.getElementById('from');
let inpTo = document.getElementById('to');

let userDigit = document.getElementById('gDigit');
let guiessNumb, from, to, checkCount = 0;


let floatTex = 'Введите целое число!';
let welcomeText = 'Добро пожаловать в игру "Угадай число". Укажите диапазон чисел и я загадаю число в этом диапазоне. После того как я загадаю число, постарайтесь угадать это число за минимальное количество попыток. Количество попыток ограниченно, их у вас 5. Желаю удачи!!!';
let rangeText = 'Установите диапазон чисел.';
let guiessingText = 'И так! Я загадал число :-) попробуй его отгадать за минимальное количество попыток. Удачи!';

let textWrite;

function writeText(text,display){
    let count = 0;
    display.innerHTML = ''
    textWrite = setInterval(() => {
        if(count < text.length ){
            display.innerHTML += text[count];
            count++;     
        }
    }, 30);
}

function stopAndWrite(text,elem){
    clearInterval(textWrite);
    writeText(text,elem);
}

writeText(welcomeText,p);
startBtn.onclick = start;
guiessBtn.onclick = guiessingHandler;


function start(){
    startGame.style.display = 'none';
    setDigit.style.display = 'block';
    stopAndWrite(rangeText,rangeP);
    
};

checkNumbs.onclick = () => {
    if(inpFrom.value % 1 != 0  || inpTo.value % 1 != 0  ){
        stopAndWrite(floatTex,rangeP)
    }
    else if(inpFrom.value == '' || inpTo.value == ''){
        stopAndWrite('Заполните поля!',rangeP);
    }
    else if(+inpFrom.value > +inpTo.value){
        stopAndWrite('Первое значение не может быть больше второго!',rangeP)
    }
    else {
        from = +inpFrom.value;
        to = +inpTo.value;
        setDigit.style.display = 'none';
        guessing.style.display = 'flex';
        guiessNumb = random(from, to);
        stopAndWrite(guiessingText,guiessT);;
    }
}


function guiessingHandler(){
    let numb = userDigit.value;
    let trying = 5;
    if(checkCount < trying){
        checkCount++;
        if(numb > guiessNumb) {
            stopAndWrite(`Многовато будет. Количество попыток: ${trying - checkCount}`,guiessT);
        }
        else if(numb < guiessNumb){
            stopAndWrite(`Маловато будет. Количество попыток: ${trying - checkCount}`,guiessT);
        }
        else {
            stopAndWrite(`Поздравляю! Вы угадали число! Количество попыток: ${checkCount}`,guiessT);
        }
    } else {
        stopAndWrite(`Увы, у вас закончились попытки. Это было число ${guiessNumb}. Получится в другой раз :)`,guiessT);
        document.getElementById('resetGame').style.display = 'block';
        document.getElementById('guessDigit').style.display = 'none';
    }   

}

function resetGame(){
    checkCount = 0;
    setDigit.style.display = 'none';
    guessing.style.display = 'none';
    stopAndWrite(welcomeText,p);
    startGame.style.display = 'flex';
    document.getElementById('resetGame').style.display = 'none';
    document.getElementById('guessDigit').style.display = 'flex';
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


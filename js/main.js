const main = document.querySelector("#main");
const test = document.querySelector("#test");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {
    var result = select.indexOf(Math.max(...select));
    console.log(result);
    return result;
}

function setResult() {
    let point = calResult();
    const resultName  = document.querySelector('.result-name');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('.result-img');
    var imgURL = 'img/image' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.result-desc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    test.style.display = "none";
    result.style.display = "block";
    var qIdx = 0;
    goNext(qIdx);
    setResult();
    calResult();
}

function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answer-box');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        var children = document.querySelectorAll('.answerList');

        var target = qnaList[qIdx].a[idx].type;
        for(let i=0; i<target.length; i++) {
            select[target[i]]  += 1;
        }

        for(let i=0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.question-box');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
}

function begin() {
    main.style.display = "none";
    test.style.display = "block";
    var qIdx = 0;
    goNext(qIdx);
}
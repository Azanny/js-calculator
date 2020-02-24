const buttons=document.getElementById("buttons"),
      display=document.getElementById("display");
      
function main(){

let firstOperator=true,
    firstNumber=true,
    currentOperator,
    leftNumber="",
    rightNumber="",
    showingResult=false;
    

buttons.addEventListener('click',(event)=>{
    let pressed=event.target.innerText;
    calculate(pressed);
})


window.addEventListener('keydown',(event)=>{
    let {key}=event;
    calculate(key);
})



function calculate(pressed){
    if("0123456789".includes(pressed)){
        if(showingResult){
            show("");
            firstOperator=true;
            firstNumber=true;
            leftNumber="";
            rightNumber="";
            showingResult=false;
        }
        if(firstNumber){
            add(pressed);
            leftNumber+=pressed;}
        else{
            add(pressed);
            rightNumber+=pressed;
        }
    }
    else if("+-/*".includes(pressed)&&leftNumber){
        if(showingResult){
            firstOperator=true;
            rightNumber="";
            showingResult=false;
        }
        if(firstOperator){
            add(pressed);
            currentOperator=pressed;
            firstOperator=false;
            firstNumber=false;
        }
        else if(rightNumber){
            leftNumber=count(currentOperator,parseInt(leftNumber),parseInt(rightNumber));
            currentOperator=pressed;
            show(leftNumber);
            rightNumber="";
            firstOperator=true;
            add(pressed);
        }
    }
    else if(pressed === "C" || pressed ==="Backspace"){
        show("");
        firstOperator=true;
        firstNumber=true;
        leftNumber="";
        rightNumber="";
        showingResult=false;
        currentOperator=""
    }
    else if(pressed === "=" || pressed ==="Enter"){
        if(rightNumber&&(!firstOperator)){
            showingResult=true;
            leftNumber=count(currentOperator,parseInt(leftNumber),parseInt(rightNumber));
            show(leftNumber);
        }
    }
    }
}


function count(operator,leftNumber,rightNumber){
    let result;
    switch(operator){
        case "+":
            result = leftNumber + rightNumber;
            break;
        case "-":
            result = leftNumber - rightNumber;
            break;
        case "*":
            result = leftNumber * rightNumber;
            break;
        case "/":
            result = leftNumber / rightNumber;
            break;
    }
    return ""+result;
}

function show(text){
    display.innerText=text;
}

function add(text){
    display.innerText+=text;
}

main()
function main(){
const buttons=document.getElementById("buttons"),
      display=document.getElementById("display");

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
            display.innerText="";
            firstOperator=true;
            firstNumber=true;
            leftNumber="";
            rightNumber="";
            showingResult=false;
        }
        if(firstNumber){
            display.innerText+=pressed;
            leftNumber+=pressed;}
        else{
            display.innerText+=pressed;
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
            display.innerText+=pressed;
            currentOperator=pressed;
            firstOperator=false;
            firstNumber=false;
        }
        else if(rightNumber){
            leftNumber=count(currentOperator,parseInt(leftNumber),parseInt(rightNumber));
            currentOperator=pressed;
            display.innerText=leftNumber;
            rightNumber="";
            firstOperator=true;
            display.innerText+=pressed;
        }
    }
    else if(pressed === "C" || pressed ==="Backspace"){
        display.innerText="";
        firstOperator=true;
        firstNumber=true;
        leftNumber="";
        rightNumber="";
        showingResult=false;
        currentOperator=""
    }
    else if(pressed === "=" || pressed ==="Enter"){
        if(rightNumber){
            showingResult=true;
            leftNumber=count(currentOperator,parseInt(leftNumber),parseInt(rightNumber));
            display.innerText=leftNumber;
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


main()
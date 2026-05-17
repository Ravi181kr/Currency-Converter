const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");
const swapBtn = document.querySelector("#swapicon");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for(let currCode in countryList){
    // console.log(currCode,countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

async function updateExchangeRate(){
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    // console.log(fromCurr.value,toCurr.value);
    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}

swapBtn.addEventListener("click",()=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    // update flag after swapping
    updateFlag(fromCurr);
    updateFlag(toCurr);
    // after swapping automatically calculate exchange rate
    updateExchangeRate();
});

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});


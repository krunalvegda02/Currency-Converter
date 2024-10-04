const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/currencies";

//Selecting dropdown elements of dropdown list
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){              //iterating all countrycodes from app.js
        
        // Creating one document element which stores all country code and later shows 
        // in dropdown list
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
       
        if(select.name === "from" &&  currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" &&  currCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {    // element is an object which refers to current changed
        updateFlag(evt.target);                     // dropdown item from dropdown list   
    })
}

const updateFlag = (element) => {
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");                                                
     img.src = newSrc;
     console.log(img.src);
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let  amount= document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        alert("PLease Enter a valid amount");
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`);
    let data = await response.json();
    let rate = data[toCurr];
 
    let finalamt = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr} = ${finalamt} ${toCurr} `;


})
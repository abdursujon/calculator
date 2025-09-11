const display = document.getElementById("display");
// Add click handler to every button
function clearError(){
    if(display.value === "error"){
    display.value ="";
    }
}

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay(){
    display.value ="";
}

function calculate(){
    //eval function is js built in function for calculation
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value ="Error";
    }
   
}

function backspace(){
  display.value =display.value.slice(0, -1);
}

function toggleSettings(){
   window.location.href = "settings.html";
}



// Settings js
document.getElementById("settings-btn").addEventListener("click", function(){
document.getElementById("settings-div").innerHTML=`
    <div id="keys-2">
            <p>Change Theme</p> 
            <button type="button" class="change-color-1"></button>
            <button type="button" class="change-color-2"></button>
            <button type="button" class="change-color-3"></button>
            <button type="button" class="change-color-4"></button>
            <button type="button" class="change-color-5"></button>
            <button type="button" class="change-color-6"></button>
            <button type="button" class="change-color-7"></button>
            <button type="button" class="change-color-8"></button>
            <button type="button" class="change-color-9"></button>
            <button  type="button" id="larger-txt">Larger Font</button>
            <button  type="button" id="smaller-txt">Smaller Font</button>
            <button type="button" id="back-btn">Back</button>
    </div>
`;});
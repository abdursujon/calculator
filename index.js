/* =================================================================
   1. INITIALIZATION & GLOBAL VARIABLES
   ================================================================= */

// DOM Elements
const calculatorElement = document.getElementById("calculator");
let display = document.getElementById("display");

// State
const originalCalculatorHTML = calculatorElement.innerHTML; // Store the initial calculator HTML

/* =================================================================
   2. CORE CALCULATOR FUNCTIONS
   (These are called via onclick attributes in the HTML)
   ================================================================= */
function appendToDisplay(value) {
    // Clear "Error" message before appending new value
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Using eval() is generally discouraged due to security risks, but it's a quick way to implement calculation logic.
        display.value = eval(display.value) || "";
    } catch (error) {
        display.value = "Error";
    }
}

/* =================================================================
   3. SETTINGS & CUSTOMIZATION LOGIC
   ================================================================= */

function applyTheme() {
    const savedColor = localStorage.getItem('calculatorTheme');
    if (savedColor) {
        const operatorButtons = document.querySelectorAll('.operator-btn');
        operatorButtons.forEach(button => {
            button.style.backgroundColor = savedColor;
        });
    }
}

function applyFontSize() {
    const savedFontSize = localStorage.getItem('calculatorFontSize');
    if (savedFontSize) {
        calculatorElement.style.fontSize = savedFontSize;
    }
}

// This function dynamically builds and displays the settings view
function showSettings() {
    calculatorElement.innerHTML = ` 
    <div class="container theme-container">
        <div class="row">
            <div class="col-sm-12 d-flex justify-content-center">
                <p>Change Theme</p>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-end">
               <button type="button" id="done-btn">Done</button>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-center">
                <button type="button" class="change-color-1" id="theme-1"></button>
                <button type="button" class="change-color-2" id="theme-2"></button>
                <button type="button" class="change-color-3" id="theme-3"></button>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-center">
                <button type="button" class="change-color-4"  id="theme-4"></button>
                <button type="button" class="change-color-5" id="theme-5"></button>
                <button type="button" class="change-color-6" id="theme-6"></button>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-center">
                <button type="button" class="change-color-7" id="theme-7"></button>
                <button type="button" class="change-color-8" id="theme-8"></button>
                <button type="button" class="change-color-9" id="theme-9"></button>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-center font-btn">
                <button type="button" id="larger-txt">Larger Font</button>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-center  font-btn">
                <button type="button" id="smaller-txt">Smaller Font</button>
            </div>
    
            <div class="col-sm-12 d-flex justify-content-center  font-btn">
                <button type="button" id="back-btn">Back</button>
            </div>
        </div>
    </div>
    `;

    const themeButtons = document.querySelectorAll("button[id^='theme-']");
    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            themeButtons.forEach(btn => {
                btn.classList.remove("active-border");
            });
            button.classList.add("active-border");
        });
    });

    // Add listener for the "Larger Font" button
    document.getElementById("larger-txt").addEventListener("click", function () {
        const defaultFontSize = 18;
        const maxFontSize = 24;

        // Get current size from localStorage or use default
        let currentSize = parseInt(localStorage.getItem('calculatorFontSize') || defaultFontSize);

        if (currentSize < maxFontSize) {
            currentSize += 2;
            // Save the new font size
            localStorage.setItem('calculatorFontSize', currentSize + 'px');
            // Optional: Give feedback that it was changed
            alert(`Font size increased to ${currentSize}px.`);
        } else {
            // Give feedback that the limit is reached
            alert(`Maximum font size of ${maxFontSize}px reached.`);
        }
    });

    // Add listener for the "Smaller Font" button
    document.getElementById("smaller-txt").addEventListener("click", function () {
        const defaultFontSize = 18;
        const minFontSize = 6;

        // Get current size from localStorage or use default
        let currentSize = parseInt(localStorage.getItem('calculatorFontSize') || defaultFontSize);

        if (currentSize > minFontSize) {
            currentSize -= 2;
            // Save the new font size
            localStorage.setItem('calculatorFontSize', currentSize + 'px');
            // Optional: Give feedback that it was changed
            alert(`Font size decreased to ${currentSize}px.`);
        } else {
            // Give feedback that the limit is reached
            alert(`Minimum font size of ${minFontSize}px reached.`);
        }
    });

    // Add listener for the "Done" button
    document.getElementById("done-btn").addEventListener("click", function () {
        const activeThemeButton = document.querySelector(".active-border");
        if (activeThemeButton) {
            // Get the computed background color of the selected theme button
            const themeColor = window.getComputedStyle(activeThemeButton).backgroundColor;
            // Save the color to localStorage
            localStorage.setItem('calculatorTheme', themeColor);
        }

        // Restore the original calculator view
        calculatorElement.innerHTML = originalCalculatorHTML;

        // Re-attach listeners and apply the theme
        reattachListenersAndApplyTheme();
    });

    // Add listener for the "Back" button to return without saving
    document.getElementById("back-btn").addEventListener("click", function () {
        // Restore the original calculator view without saving any new settings 
        calculatorElement.innerHTML = originalCalculatorHTML;
        // Re-attach listeners and apply the original settings
        reattachListenersAndApplyTheme();
    });
}
// This function is called to restore the calculator view and its functionality
function reattachListenersAndApplyTheme() {
    // Re-select the display element as it was replaced
    display = document.getElementById("display");
    // Re-attach the settings button listener
    document.getElementById("settings-btn").addEventListener("click", showSettings);
    // Apply all saved settings
    applyTheme();
    applyFontSize();
}

/* =================================================================
   4. EVENT LISTENERS & INITIAL SETUP
   ================================================================= */

// Apply settings when the page first loads
document.addEventListener('DOMContentLoaded', reattachListenersAndApplyTheme);

// Initial listener for the settings button
document.getElementById("settings-btn").addEventListener("click", showSettings);

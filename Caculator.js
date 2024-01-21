// finds the numbers and their index
function numberFinder(string, start, numToAdd) {
    end = start
    
    while (end+numToAdd >= 0 && end+numToAdd !== string.length && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(string[end+numToAdd])) {
        end += numToAdd
    }
    
    if (numToAdd === -1) {
        return [Number(string.slice(end, start+1)), end]
    }
    return [Number(string.slice(start, end+1)), end]
}

// calculating simple operations
function simpleCalc(string, symbol) {
    while (string.includes(symbol)) {
        let index = string.indexOf(symbol)
        let [firstNum, firstIndex] = numberFinder(string, index-1, -1)
        let [secondNum, secondIndex] = numberFinder(string, index+1, 1)
        
        if (symbol === "+") {
           new_value = firstNum + secondNum 
        } else if (symbol === "X") {
            new_value = firstNum * secondNum 
        } else if (symbol === "/") { 
           new_value = firstNum / secondNum 
        } else if (symbol === "-") {  
            new_value = firstNum - secondNum 
        }
            
            return string.slice(0, firstIndex) + new_value + string.slice(secondIndex+1)
        }
}

// Loops over simpleCalc
function loopCalc(string) {
    while (string.includes("X")) {
        string = simpleCalc(string, "X")
    }
    
    while (string.includes("/")) {
        string = simpleCalc(string, "/")
    }
        
    while (string.includes("+")) {
        string = simpleCalc(string, "+")
    }
        
    while (string.includes("-") && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(string[string.indexOf("-")-1]) && string.indexOf("-")-1 !== -1) {
        string = simpleCalc(string, "-")
    }
    return string
  
}

// rename of calculator input
const text = document.getElementById('text')

// adds event listeners to the numbers
for (let i = 0; i<10; i++) {
    document.getElementById(i.toString()).addEventListener('click', () => {
        text.value += document.getElementById(i.toString()).innerText
        text.focus()
    })
}

// adds event listeners to the symbols
const symbols = ["/", "X", "-", "+", ".", "(", ")"]
symbols.forEach(symbol => {
    document.getElementById(symbol).addEventListener('click', () => {
        text.value += document.getElementById(symbol).innerText
        text.focus()
})
})

// checks if the input only holds the correct numbers or symbols
text.addEventListener("input", () => {
    if (!(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "x", "-", "+", "."].includes(text.value[text.value.length-1]))) {
        text.value = text.value.slice(0, text.value.length-1)
    }
})

// actaul logic for calcuator like 1+1
document.getElementById('=').addEventListener('click', () => {
    let string = text.value
    try {
        if (string === ".1+.2") {
            string = ".3"
        }
        while (string.includes("(")) { 
            all_index = [string.indexOf("("), string.indexOf(")")+1]
            window.prompt(string.slice(all_index[0], all_index[1]))
            
            string.replace("5", "0")
            string = string.replace(string.slice(all_index[0], all_index[1]), loopCalc(string.slice(all_index[0]+1, all_index[1]-1)))
        }
        string = loopCalc(string)
    } catch(e) {
        text.value = e
    }
    text.value = string
})

// adds functionality to the clear button
document.getElementById('c').addEventListener('click', () => {
    text.value = ""
})

text = document.getElementById('text')

for (let i = 0; i<10; i++) {
    document.getElementById(i.toString()).addEventListener('click', () => {
        text.value += document.getElementById(i.toString()).innerText
    })
}

symbols = ["/", "x", "-", "+", ".", "(", ")"]
symbols.forEach(symbol => {
    document.getElementById(symbol).addEventListener('click', () => {
        text.value += document.getElementById(symbol).innerText
})
})

text.addEventListener("input", () => {
    if (!(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "x", "-", "+", "."].includes(text.value[text.value.length-1]))) {
        text.value = text.value.slice(0, text.value.length-1)
    }
})

document.getElementById('=').addEventListener('click', () => {
    let string = text.value
    let new_value = 0
    try {
        window.prompt(string.slice(string.indexOf('+')-1, string.indexOf('+')+2))
        while (string.includes("+")) {
            window.prompt(string.slice(string.indexOf('+')-1, string.indexOf('+')+2))
            new_value = Number(string[string.indexOf('+')-1]) + Number(string[string.indexOf('+')+2])
            string = string.slice(0, string.indexOf('+')-2) + new_value + string.slice(string.indexOf('+')+3)
        }
    } catch(e) {
        text.value = e
    }
    text.value = string
})

document.getElementById('c').addEventListener('click', () => {
    text.value = ""
})
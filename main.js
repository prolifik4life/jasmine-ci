function calculate(inputValue) {
    const expression = /\+|\-|\*|\//;
    const numbers = inputValue.split(expression);
    
    const numberA = parseInt(numbers[0]);
    const numberB = parseInt(numbers[1]);

    const operation = inputValue.match(expression);

    if(Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null) {
        updateResult('Operation is not recogized');
        return;
    }

    const calculator = new Calculator();
    calculator.add(numberA);
    let result;

    switch (operation[0]) {
        case '+':
            result = calculator.add(numberB);
            break;
        case '-':
            result = calculator.substract(numberB);
            break;
        case '*':
            result = calculator.multiply(numberB);
            break;
        case '/':
            result = calculator.divide(numberB);
            break;
    }
    updateResult(result);
}

function updateResult(result) {
    const element = document.getElementById('result');
    if(element) {
        element.innerText = result;
    }
}

function showVersion() {
    const calculate = new Calculator();
    const element = document.getElementById('version');
    // element.innerText = calculate.version;
    calculate.version.then(function(data) {
        element.innerText = data.version;
    })
    .catch(function(error) {
        element.innerText = 'unknown';
    });
}
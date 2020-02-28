document.getElementById('total').oninput = onBillChange;

const buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLInputElement>;

const storedTip = localStorage.getItem('yourTipChoice');

let tipAsNumber: number;

const tenButton = document.getElementById('0.1') as HTMLInputElement;
tenButton.addEventListener('click', tipTen);

const fifteenButton = document.getElementById('0.15') as HTMLInputElement;
fifteenButton.addEventListener('click', tipFifteen);

const twentyButton = document.getElementById('0.2') as HTMLInputElement;
twentyButton.addEventListener('click', tipTwenty);

if (storedTip) {
    tipAsNumber = JSON.parse(storedTip);
    if (!isNaN(tipAsNumber)) {
        onTipChange(tipAsNumber);
        updateButtonStatus(storedTip);
    }
}

function onBillChange() {
    if (storedTip) {

        const inputValue = document.getElementById('total') as HTMLInputElement;
        const inputValueAsNumber: number = parseInt(inputValue.value);
        if (isNaN(inputValueAsNumber)) {
            defaultZero();
            let totalInput = document.getElementById('total') as HTMLInputElement;
            totalInput.className = 'error';
        } else {
            updateBillAmount(inputValueAsNumber);
            updateTipPercent(tipAsNumber);
            updateTipAmount(inputValueAsNumber, tipAsNumber);
            updateTotalPaid(inputValueAsNumber, tipAsNumber);
        }
    }
}

function onTipChange(tip: number) {
    if (isNaN(tip)) {
        defaultZero();
    } else {
        const inputValue = document.getElementById('total') as HTMLInputElement;

        const inputValueAsNumber: number = parseInt(inputValue.value);

        updateChosenTip(tip);
        updateTipPercent(tip);
        saveIt(tip.toString());

        if (inputValueAsNumber > 0) {

            updateBillAmount(inputValueAsNumber);
            updateTipAmount(inputValueAsNumber, tip);
            updateTotalPaid(inputValueAsNumber, tip);

        }
    }
}

function updateChosenTip(tipPercentAsNumber: number) {
    document.getElementById('chosenTip').innerHTML = `You chose to tip: ${tipPercentAsNumber * 100}%`;
}

function updateBillAmount(inputValueAsNumber: number) {
    document.getElementById('billAmount').innerHTML = `Bill Amount: $${inputValueAsNumber}`;
}

function updateTipPercent(tipPercentAsNumber: number) {
    document.getElementById('tipPercent').innerHTML = `Tip percent: ${tipPercentAsNumber * 100}%`;
}

function updateTipAmount(inputValueAsNumber: number, tipPercentAsNumber: number) {
    document.getElementById('tipAmount').innerHTML = `Amount of tip: $${tipPercentAsNumber * inputValueAsNumber}`;
}

function updateTotalPaid(inputValueAsNumber: number, tipPercentAsNumber: number) {
    const totalValue = inputValueAsNumber + (inputValueAsNumber * tipPercentAsNumber);
    document.getElementById('totalPaid').innerHTML = `Total to be paid: $${totalValue}`;
}

function defaultZero() {
    document.getElementById('billAmount').innerHTML = `Bill Amount: $0`;
    document.getElementById('tipAmount').innerHTML = `Amount of tip: $0`;
    document.getElementById('totalPaid').innerHTML = `Total to be paid: $0`;
}

function saveIt(tipPercent: string) {
    localStorage.setItem('yourTipChoice', tipPercent);
}

function convertToDecimal(input: number) {
    const output = input / 100;
    return output;
}

function tipTen() {
    const decimalValue = convertToDecimal(parseInt(tenButton.value));
    onTipChange(decimalValue);
    updateButtonStatus(tenButton.id);
}

function tipFifteen() {
    const decimalValue = convertToDecimal(parseInt(fifteenButton.value));
    onTipChange(decimalValue);
    updateButtonStatus(fifteenButton.id);
}

function tipTwenty() {
    const decimalValue = convertToDecimal(parseInt(twentyButton.value));
    onTipChange(decimalValue);
    updateButtonStatus(twentyButton.id);
}

function updateButtonStatus(input: string) {
    buttons.forEach(x => {
        if (x.id === input) {
            x.setAttribute('disabled', 'disabled');
        } else {
            x.removeAttribute('disabled');
        }
    });
}

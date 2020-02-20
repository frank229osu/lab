document.getElementById('selectedValue').onchange = onTipChange;
document.getElementById('total').oninput = onBillChange;
let tipValue = document.getElementById('selectedValue') as HTMLInputElement;

const storedTip = localStorage.getItem('yourTipChoice');

if (storedTip) {
    document.getElementById('selectedValue').setAttribute(tipValue.value, storedTip);
}

function onBillChange() {
    const inputValue = document.getElementById('total') as HTMLInputElement;
    const tipPercent = document.getElementById('selectedValue') as HTMLInputElement;

    const inputValueAsNumber: number = parseInt(inputValue.value);
    const tipPercentAsNumber: number = parseInt(tipPercent.value) / 100;

    if (tipPercentAsNumber > 0) {
        updateBillAmount(inputValueAsNumber);
        updateTipPercent(tipPercentAsNumber);
        updateTipAmount(inputValueAsNumber, tipPercentAsNumber);
        updateTotalPaid(inputValueAsNumber, tipPercentAsNumber);
    }
}

function onTipChange() {
    const inputValue = document.getElementById('total') as HTMLInputElement;
    const tipPercent = document.getElementById('selectedValue') as HTMLInputElement;

    const inputValueAsNumber: number = parseInt(inputValue.value);
    const tipPercentAsNumber: number = parseInt(tipPercent.value) / 100;

    updateChosenTip(tipPercentAsNumber);

    if (inputValueAsNumber > 0) {

        updateBillAmount(inputValueAsNumber);
        updateTipPercent(tipPercentAsNumber);
        updateTipAmount(inputValueAsNumber, tipPercentAsNumber);
        updateTotalPaid(inputValueAsNumber, tipPercentAsNumber);
        saveIt();
    }
}

function updateChosenTip(tipPercentAsNumber: number) {
    document.getElementById('chosenTip').innerHTML = `You chose to tip: ${tipPercentAsNumber * 100}%`;
}

function updateBillAmount(inputValueAsNumber: number) {
    document.getElementById('billAmount').innerHTML = `Bill Amount: $${inputValueAsNumber}`;
}

function updateTipPercent(tipPercentAsNumber: number) {
    document.getElementById('tipPercent').innerHTML = `Tip percent: ${tipPercentAsNumber}%`;
}

function updateTipAmount(inputValueAsNumber: number, tipPercentAsNumber: number) {
    document.getElementById('tipAmount').innerHTML = `Amount of tip: $${tipPercentAsNumber * inputValueAsNumber}`;
}

function updateTotalPaid(inputValueAsNumber: number, tipPercentAsNumber: number) {
    const totalValue = inputValueAsNumber + (inputValueAsNumber * tipPercentAsNumber);
    document.getElementById('totalPaid').innerHTML = `Total to be paid: $${totalValue}`;
}

function saveIt() {
    localStorage.setItem('yourTipChoice', tipValue.value);
}

import './styles.css';

document.getElementById('total').oninput = onBillChange;

const buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLInputElement>;

let storedTipAsString: string;
let storedTipAsNumber: number;

const tenButton = document.getElementById('10') as HTMLInputElement;
tenButton.addEventListener('click', () =>
    onTip(parseInt(tenButton.id, 10)),
    false);

const fifteenButton = document.getElementById('15') as HTMLInputElement;
fifteenButton.addEventListener('click', () =>
    onTip(parseInt(fifteenButton.id, 10)),
    false);

const twentyButton = document.getElementById('20') as HTMLInputElement;
twentyButton.addEventListener('click', () =>
    onTip(parseInt(twentyButton.id, 10)),
    false);

function accessStoredTip() {
    storedTipAsString = localStorage.getItem('yourTipChoice');
    if (storedTipAsString) {
        storedTipAsNumber = JSON.parse(storedTipAsString);
        if (!isNaN(storedTipAsNumber) && storedTipAsNumber !== null) {
            onTipChange(storedTipAsNumber);
            updateButtonStatus(storedTipAsString);
        }
    }
}

accessStoredTip();


function onBillChange() {
    accessStoredTip();
    if (storedTipAsString) {
        const inputValue = document.getElementById('total') as HTMLInputElement;
        if (inputValue.value === '') {
            defaultZero();
            inputValue.className = 'normal';
        } else if (isNaN(Number(inputValue.value))) {
            defaultZero();
            inputValue.className = 'error';
        } else {
            const inputValueAsNumber: number = parseInt(inputValue.value, 10);
            inputValue.className = 'normal';
            updateBillAmount(inputValueAsNumber);
            updateTipPercent(storedTipAsNumber);
            updateTipAmount(inputValueAsNumber, storedTipAsNumber);
            updateTotalPaid(inputValueAsNumber, storedTipAsNumber);
        }
    }
}

function onTipChange(tip: number) {
    if (isNaN(tip)) {
        defaultZero();
    } else {
        const inputValue = document.getElementById('total') as HTMLInputElement;
        const inputValueAsNumber: number = parseInt(inputValue.value, 10);

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
    document.getElementById('chosenTip').innerHTML = `You chose to tip: ${tipPercentAsNumber}%`;
}

function updateBillAmount(inputValueAsNumber: number) {
    document.getElementById('billAmount').innerHTML = `Bill Amount: $${roundNumberTwoDecimalPlaces(inputValueAsNumber)}`;
}

function updateTipPercent(tipPercentAsNumber: number) {
    document.getElementById('tipPercent').innerHTML = `Tip percent: ${tipPercentAsNumber}%`;
}

function updateTipAmount(inputValueAsNumber: number, tipPercentAsNumber: number) {
    const totalTipAmount = (tipPercentAsNumber / 100) * inputValueAsNumber;
    document.getElementById('tipAmount').innerHTML = `Amount of tip: $${roundNumberTwoDecimalPlaces(totalTipAmount)}`;
}

function updateTotalPaid(inputValueAsNumber: number, tipPercentAsNumber: number) {
    const totalValue = inputValueAsNumber + (inputValueAsNumber * (tipPercentAsNumber / 100));
    document.getElementById('totalPaid').innerHTML = `Total to be paid: $${roundNumberTwoDecimalPlaces(totalValue)}`;
}

function defaultZero() {
    document.getElementById('billAmount').innerHTML = `Bill Amount: $0`;
    document.getElementById('tipAmount').innerHTML = `Amount of tip: $0`;
    document.getElementById('totalPaid').innerHTML = `Total to be paid: $0`;
}

function saveIt(tipPercent: string) {
    localStorage.setItem('yourTipChoice', tipPercent);
}

function onTip(input: number) {
    onTipChange(input);
    updateButtonStatus(input.toString());
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

function roundNumberTwoDecimalPlaces(input: number) {
    const inputAsString = input.toFixed(2);
    return inputAsString;

}

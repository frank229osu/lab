document.getElementById('total').oninput = onBillChange;
const storedTip = localStorage.getItem('yourTipChoice');
let tipAsNumber: number;

if (storedTip) {
    tipAsNumber = JSON.parse(storedTip);
    onTipChange(tipAsNumber);
}

function onBillChange() {
    if (storedTip) {

        const inputValue = document.getElementById('total') as HTMLInputElement;
        const inputValueAsNumber: number = parseInt(inputValue.value);
        if (isNaN(inputValueAsNumber)) {
            defaultZero();
        } else {
            updateBillAmount(inputValueAsNumber);
            updateTipPercent(tipAsNumber);
            updateTipAmount(inputValueAsNumber, tipAsNumber);
            updateTotalPaid(inputValueAsNumber, tipAsNumber);
        }
    }
}

function onTipChange(tip: number) {
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

const tenButton = document.getElementById('tenButton') as HTMLInputElement;
const fifteenButton = document.getElementById('fifteenButton') as HTMLInputElement;
const twentyButton = document.getElementById('twentyButton') as HTMLInputElement;

tenButton.addEventListener('click', tipTen);
fifteenButton.addEventListener('click', tipFifteen);
twentyButton.addEventListener('click', tipTwenty);

const tipValue = null;

function tipTen() {
    this.tipValue = .1;
    onTipChange(this.tipValue);
    updateButtonStatus();
}

function tipFifteen() {
    this.tipValue = .15;
    onTipChange(this.tipValue);
}

function tipTwenty() {
    this.tipValue = .2;
    onTipChange(this.tipValue);
}

const buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLInputElement>;

function updateButtonStatus() {
    const that = this as HTMLDivElement;

}
















import './styles.css';

const secretNumber = Math.floor(Math.random() * 10);

const squares = document.querySelectorAll('.square') as NodeListOf<HTMLDivElement>;

console.log(squares);

let currentSquare = 1;

squares.forEach(sq => {
    if (currentSquare === secretNumber) {
        sq.dataset.secret = 'true';
    }
    currentSquare++;
    sq.addEventListener('click', handleClick);
});

function handleClick() {
    const that = this as HTMLDivElement;

    if (that.dataset.secret) {
        that.classList.add('winner');
        that.removeEventListener('click', handleClick);
        squares.forEach(sq => {
            if (sq !== that) {
                sq.classList.add('loser');
            }
        });
    } else {
        that.classList.add('loser');
        that.removeEventListener('click', handleClick);
    }

}

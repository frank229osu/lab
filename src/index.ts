document.getElementById('selectedValue').onchange = newTip;
document.getElementById('total').oninput = runCalcs;

function newTip() {
    const tipValue = document.getElementById('selectedValue') as HTMLInputElement;
    document.getElementById('chosenTip').innerHTML = `You've chosen to tip ${tipValue.value}%`;
    document.getElementById('tipPercent').innerHTML = `Tip percent: ${tipValue.value}%`;
}

function runCalcs() {
    const inputValue = document.getElementById('total') as HTMLInputElement;
    const tipValue = document.getElementById('selectedValue') as HTMLInputElement;
    const tipAmount: number = parseInt(inputValue.value) * (parseInt(tipValue.value) / 100);
    const totalPaid: number = parseInt(inputValue.value) + tipAmount;
    document.getElementById('billAmount').innerHTML = `Bill Amount: ${inputValue.value}%`;

    document.getElementById('tipAmount').innerHTML = `Amount of tip: $${tipAmount}`;
    document.getElementById('totalPaid').innerHTML = `Total to be paid: $${totalPaid}`;
}

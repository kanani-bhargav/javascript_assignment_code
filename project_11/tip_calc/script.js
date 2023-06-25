const slidersInput = document.querySelectorAll("input[type='range']");
slidersInput.forEach(function(slider){
    slider.addEventListener("input",calculateTip);
});

const billAmount = document.getElementById("bill");
billAmount.addEventListener("change",calculateTip);


function calculateTip(){
    let bill = parseFloat(billAmount.value);
    let tipPercent = document.getElementById("tip").value;
    let noOfPeople = document.getElementById("no-of-people").value;

    billAmount.value = bill;

    let totalTip = parseFloat((bill * (tipPercent/100)).toFixed(2));
    let total = parseFloat((bill + totalTip));

    let tipPerPerson = (totalTip / noOfPeople).toFixed(2);
    let totalPerPerson = (total / noOfPeople).toFixed(2);

    document.getElementById("tip-amount").innerHTML = "$ " + totalTip;
    document.getElementById("total-amount").innerHTML = "$ " + total;
    
    document.getElementById("tip-percent").innerHTML = tipPercent + " %"
    document.getElementById("split-num").innerHTML = noOfPeople;

    document.getElementById("tip-per-person").innerHTML = "$ " + tipPerPerson;
    document.getElementById("total-per-person").innerHTML = "$ " + totalPerPerson;
}

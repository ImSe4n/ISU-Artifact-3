function showContent(content) {
  var mainDiv = document.querySelector('.item2');

  // Hide all content initially
  var allContent = mainDiv.querySelectorAll('.content');
  allContent.forEach(function (elem) {
    elem.style.display = 'none';
  });

  // Show the selected content
  var selectedContent = mainDiv.querySelector('.' + content);
  if (selectedContent) {
    console.log("Displaying content:", content); // Add this line for debugging
    selectedContent.style.display = 'block';
    // Store the selected content in localStorage
    localStorage.setItem('selectedContent', content);
  }
}

window.addEventListener('load', function () {
  // Retrieve the last displayed content from localStorage
  var lastContent = localStorage.getItem('selectedContent');
  if (lastContent) {
    console.log("Last displayed content:", lastContent); // Add this line for debugging
    showContent(lastContent);
  }
});



var simpleInterest = true;

var simpleInterestRadio = document.getElementById('simpleInterest');
simpleInterestRadio.addEventListener('change', function () {
  if (this.checked) {
    simpleInterest = true;
  }
});

var compoundInterestRadio = document.getElementById('compoundInterest');
compoundInterestRadio.addEventListener('change', function () {
  if (this.checked) {
    simpleInterest = false;
  }
});


function calculateInterest() {
  if (simpleInterest) {
    document.getElementById("simpleError").innerHTML = "<p style='color: green;'>✓</p>";
    document.getElementById("compoundError").innerHTML = "<p></p>";
  } else {
    document.getElementById("compoundError").innerHTML = "<p style='color: green;'>✓</p>";
    document.getElementById("simpleError").innerHTML = "<p></p>";
  }



  var principal = Number(document.getElementById('principalAmount').value);
  var principalValid = false;
  if (isNaN(principal) || principal < 0.01 || (principal).toFixed(2) != principal) {
    text = "<p style='color: red;'>Input should be > 0 with increments of 0.01</p>";
    principalValid = false;
  } else {
    text = "<p style='color: green;'>✓</p>";
    principalValid = true;
  }
  document.getElementById("principalError").innerHTML = text;



  var rate = Number(document.getElementById('interestRate').value);
  var rateValid = false;
  if (isNaN(rate) || rate < 0.01 || (rate).toFixed(2) != rate) {
    text = "<p style='color: red;'>Input should be > 0 with increments of 0.01</p>";
    rateValid = false;
  } else {
    text = "<p style='color: green;'>✓</p>";
    rateValid = true;
  }
  document.getElementById("rateError").innerHTML = text;



  var freq = document.getElementById('interestFreq').value;
  document.getElementById("freqError").innerHTML = "<p style='color: green;'>✓</p>";



  var duration = Number(document.getElementById('duration').value);
  var durationValid = false;
  if (isNaN(duration) || duration < 1 || duration > 100 || Math.round(duration) != duration) {
    text = "<p style='color: red;'>Input should be an integer between 1 and 100</p>";
    durationValid = false;
  } else {
    text = "<p style='color: green;'>✓</p>";
    durationValid = true;
  }
  document.getElementById("durationError").innerHTML = text;



  const timesPerYear = {"Annually" : 1,"Semiannually" : 2,"Quarterly" : 4,"Monthly" : 12};
  var times = duration * timesPerYear[freq];


  if (principalValid && rateValid && durationValid) {
    rate = rate / 100;
    var output = "<table class='resultTable'><tr><th>Year</th><th>Interest (per year)</th><th>Total Amount</th></tr>";
    if (simpleInterest) {
      for (var i = timesPerYear[freq]; i <= times; i+=timesPerYear[freq]) {
        var total = principal + principal * rate * i;
        var year = Math.ceil(i / timesPerYear[freq]);
        output += "<tr><td style='text-align: center;'>" + year + "</td>";
        output += "<td style='text-align: right;'>$" + (principal * rate * timesPerYear[freq]).toFixed(2) + "</td>";
        output += "<td style='text-align: right;'>$" + total.toFixed(2) + "</td></tr>";
      }
    } else {
      for (var i = timesPerYear[freq]; i <= times; i+=timesPerYear[freq]) {
        var total = principal * (1 + rate) ** i;
        var year = Math.ceil(i / timesPerYear[freq]);
        output += "<tr><td style='text-align: center;'>" + year + "</td>";
        output += "<td style='text-align: right;'>$" + (principal * (1 + rate) ** i - principal * (1 + rate) ** (i-timesPerYear[freq])).toFixed(2) + "</td>";
        output += "<td style='text-align: right;'>$" + total.toFixed(2) + "</td></tr>";
      }
    }
  }

  output += "</table>";
  document.getElementById('results').innerHTML = output;

}

let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

//Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting default values
fromDropDown.value = "USD";
toDropDown.value = "CAD";

let convertCurrency = () => {
  //Create References
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If amount input field is not empty
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

//Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});

function calculateAppreciationDepreciation() {
    const initialValue = parseFloat(document.getElementById('initialValue').value);
    const finalValue = parseFloat(document.getElementById('finalValue').value);
    const change = finalValue - initialValue;
    const percentChange = (change / initialValue) * 100;

    if (percentChange > 0) {
        document.getElementById('appreciationDepreciationResult').innerText = `Appreciation: $${change.toFixed(2)} (${percentChange.toFixed(2)}%)`;
    } else if (percentChange < 0) {
        document.getElementById('appreciationDepreciationResult').innerText = `Depreciation: $${Math.abs(change).toFixed(2)} (${Math.abs(percentChange).toFixed(2)}%)`;
    } else {
        document.getElementById('appreciationDepreciationResult').innerText = `No change`;
    }

    closeSidebar();
}
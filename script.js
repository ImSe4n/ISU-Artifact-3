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
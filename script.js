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

var budgetController = (function(){
    
    
    
  var Expense = function(id,desc,value){
      
      
      
      this.id = id;
      this.desc = desc;
      this.value = value;
      console.log(id);
      
  };      
  
  
    var Income = function(id,desc,value){
      
      
      
      this.id = id;
      this.desc = desc;
      this.value = value;
      
  };        
  
  
  
      var calculateTotal = function(type){
          
          var suma = 0;
          data.allItems[type].forEach(function(cur) {
              
              
              suma = suma + cur.value;
             
          })
          
          
          data.totals[type] = suma;
          
      };
    
  
      var data = {
          
          
          allItems : {
              
              exp: [],
              inc: []
              
          },
          totals:{
              exp:0,
              inc:0
              
          },
          
      
              
          budget: 0
              
          
          
          
      }
          
      return{
          
          addItem: function(type,des,val){
              
              var newItem, ID;
              
              
              if(data.allItems[type].length > 0){
              ID = data.allItems[type][data.allItems[type].length - 1].id+1;
              }   else { ID = 0 ;}
              
              
              if (type === 'exp'){
                   newItem = new Expense(ID,des,val);
                  
              } else if(type === 'inc') {
                  newItem = new Income(ID,des,val);
                  
              }
              
             data.allItems[type].push(newItem);
             return newItem; 
              
              
              
          },
          
          
          calculateBudget : function(){
              
              calculateTotal('exp');
              calculateTotal('inc');

              
              data.budget = data.totals.inc - data.totals.exp;
              
              
              
              
          },
          
          
          deleteItem : function(type,id){
              
              var ids,index;
            
              
              
              ids = data.allItems[type].map(function(cur) {
                  return cur.id;
          });
          
              index = ids.indexOf(id);
              
              
              if(index !== -1 ){
              data.allItems[type].splice(index,1);
              }
                                           
              
              
          },
          
          
          
          
          
          
          getBudget: function(){
              
            return {
                
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp
                   
            };  
              
              
          },
          
          
          
          testing : function(){
              
              console.log(data.allItems.inc[0]);
              
          }
          
          
          
      };
      
      
      
      
      
  
})();








var UIController = (function(){
  
  
  
  
  var DOMstring = {
      
      type : '.add__type' ,
      description  : '.add__description' ,
      value : '.add__value',
      incomeContainer : '.income__list',
      expenseContainer : '.expenses__list',
      Income : '.budget__income--value',
      Expenses : '.budget__expenses--value',
      AllBudgetValue : '.budget__value',
      conatainer : '.container'
      
  };
  

  
  return {
  
  getInput : function(){
      
      return {
          
      type : document.querySelector('.add__type').value,
      description  : document.querySelector('.add__description').value,
      value  : parseFloat(document.querySelector('.add__value').value)
          
          
      };
      
  },
      
  addListItem: function(obj,type) {
      
      var html,newHTML,element;
      
      if(type === 'inc'){
      
      element = DOMstring.incomeContainer;
          
      html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
      }
      else if(type === 'exp'){
      
      
      element = DOMstring.expenseContainer;
          
      html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
      }
      
      
      
      newHtml = html.replace('%id%',obj.id);
      console.log(obj.desc);
      newHtml = newHtml.replace('%description%',obj.desc);
      newHtml = newHtml.replace('%value%',obj.value);
      
      
      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
      
      
      
      
  },
      
  updateMonth(){
    
      
      now = new Date();
      
      months = now.getMonth();
      
      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      
      document.querySelector('.budget__title--month').textContent = month[months];
      
      
      
      
  }, 
      
      
      
      
      
      
      
      
  deleteList : function(selector){
      
      
      var el = document.getElementById(selector);
      el.parentNode.removeChild(el);
              
      
  },   
      
      
  clearField: function(){
      
      var fields,fieldsArr;
      
      fields = document.querySelectorAll(DOMstring.description + ',' + DOMstring.value)
      
      fieldsArr = Array.prototype.slice.call(fields);
      
      console.log(fieldsArr);
      
      
      
      
      fieldsArr.forEach(function(current,index,array){
          
          current.value = '';
          
      });
      fieldsArr[0].focus();
      
      
  },
      
  
  addHeader : function(IE){
          
          console.log(IE.totalInc);    console.log(IE.totalExp); 
      
      
          document.querySelector(DOMstring.Income).textContent = IE.totalInc;  

          document.querySelector(DOMstring.Expenses).textContent = IE.totalExp;         

          document.querySelector(DOMstring.AllBudgetValue).textContent = IE.budget;
      
          
          
      }
      
      
      
      
      

  
};
  
  
  
  
  
  
})();




var controller = (function(UIcontroller,budgetcontroller){
  
  
      UIcontroller.updateMonth();
 
      var updateBudget = function () {
          
          // 1 calculate the budget
          
          // Take budget from dataStorage 
          
          budgetcontroller.calculateBudget();
          
          
        
          // 2 Return the budget
          
          var budget =  budgetcontroller.getBudget();  // caly budzet jest w obiekcie
          
          // 3 Display the budget UI
          UIcontroller.addHeader(budget);
     
          
      }
      
  
      var addButton= function(){
      

          var input, newItem;

          //1. Get Data

          var input = UIcontroller.getInput();


          if(input.description !=="" && !isNaN(input.value) && input.value > 0 ){    

          console.log(input.type,input.description,input.value);

          // 2. add the item to the budget controller

          newItem =  budgetcontroller.addItem(input.type,input.description,input.value);

          // 3. add this to UI

          UIcontroller.addListItem(newItem,input.type);

          // 4. Clear Field and set cursor to the input form, after submit

          UIcontroller.clearField();


          updateBudget();

          }
              else { 

                  alert("You must put data in your input") };

          
      // 
      
  }
  
      
  var DeleteItem = function(event){
      
      // Take number and type from side
      
      var ItemID, splitID, type, ID;
              
      ItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
      
       console.log(ItemID);
     
      splitID = ItemID.split('-');
      
      type = splitID[0];
      ID = parseInt(splitID[1]);
      
      
      
      // Delete from budget 
      
      budgetcontroller.deleteItem(type,ID);
      
      
      // Delete from UI
      
      UIcontroller.deleteList(ItemID);
      
      
      
      updateBudget();
      
  }    
      
  
  

  
  document.querySelector('.add__btn').addEventListener('click',addButton);   
  
  
  
  document.querySelector('.container').addEventListener('click',DeleteItem);
  
 
  
  
  
  
  
  
})(UIController,budgetController);



















/**


   
var budgetController = (function(){
  
  
  
  var Income = function(Id,desc,value){
      
      
      this.id = Id;
      this.desc = desc;
      this.value = value;
      
      console.log(this.id);
      
  };
  
  var Expanse = function(id,desc,value){
      
         
      this.id = id;
      this.desc = desc;
      this.value = value;
     
      
      
      
  };
      
var data = {
    
    
    totalItems : {
        
        inc : [],
        exp : []
    
        
        
      },    
    
    
    totals : {
    
          
      exp : 0,
      inc: 0
        
        
      }   
};


 var calculateBudget = function(){
      
      
      data.totals.exp = 0;
      data.totals.inc = 0;
      
      
      console.log(data.totalItems['inc']);
     
       data.totalItems['inc'].forEach(function(cur)
                                                        
      {
             data.totals.inc +=  cur.value;                      
              
          
                                     
       })
                               
                           
      data.totalItems['exp'].forEach(function(cur)
      {                               
               data.totals.exp +=  cur.value ;                    
                                     
       })
              
     
  } 

  return {
           
      addBudget : function(type,desc,val){
      
      var ID, newItem;
              
      if(data.totalItems[type].length > 0) 
      {ID = data.totalItems[type][data.totalItems[type].length - 1].id+1; }
      
      else {ID = 0;}
      
          
      if( type === 'exp'){
      newItem =  new Expanse(ID,desc,val);
      } 
      
      else if ( type === 'inc'){
      
      newItem = new Income(ID,desc,val); 
      console.log(newItem);
      } 
      
      
      data.totalItems[type].push(newItem);
      
      
      return newItem;
  },
      
   getBudget : function(){
      
      calculateBudget();
      
      return {
          
          income: data.totals.inc,
          expenses : data.totals.exp,
          all:  data.totals.inc-data.totals.exp
          
          
      } ;       
      
   
      
  }    
      
      
      
      
      
  };
  
  
          
     
      
      
      
      
  
})();








var UIController = (function(){
  
  
  
  
  var DOMstring = {
      
      type : '.add__type' ,
      description  : '.add__description' ,
      value : '.add__value',
      incomeContainer : '.income__list',
      expenseContainer : '.expenses__list',
      Income : '.budget__income--value',
      Expenses : '.budget__expenses--value',
      AllBudgetValue : '.budget__value',
      conatainer : '.container'
      
  };
  
    

  return {
      
      
      
      getInput : function(){
          
          
          return {
       
              type : document.querySelector('.add__type').value,
              desc  : document.querySelector('.add__description').value,
              value  : parseFloat(document.querySelector('.add__value').value)
          
              
      
          };
      },
      
      inputHeader : function(budgetHeader){
          
      
          document.querySelector(DOMstring.Income).textContent = budgetHeader.income;
          document.querySelector(DOMstring.Expenses).textContent = budgetHeader.expenses;
          
          document.querySelector(DOMstring.AllBudgetValue).textContent = budgetHeader.all
      },
  
         
      
      showAll : function(obj,type){
          
          
          
          var html, newHtml,element;
          
          if(type==='inc'){
              
            element = '.income__list';
              
              
              html= '<div class="item clearfix" id="income-%i%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
              
          }
          
          
          
           if(type==='exp'){
              
            element = DOMstring.expenseContainer;
              
              
              html= '<div class="item clearfix" id="expense-%i%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
              
          }
          
          
          newHtml = html.replace('%i%',obj.id);
          newHtml =  newHtml.replace('%desc%',obj.desc);
          newHtml = newHtml.replace('%value%',obj.value);
          
          
          document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
          
          
          
      }
      
          
  };
  
  
      
  })();




var controller = (function(UIcontroller,budgetcontroller){
  
  
  
  
  var headerBudget = function(){
      
      
      //Calculate the Dubet
      
          var budgetHeader = budgetcontroller.getBudget();
          
          console.log(budgetHeader.all);
      
      // Get date to isert in DOM structure; 
      
          UIcontroller.inputHeader(budgetHeader);
      
      
      
      
      
  }
  
  
 
    
      
  
      var addButton= function(){
      

          var input, newItem, budget;

          //1. Get Data

         
          input = UIcontroller.getInput();


      
          console.log(input.type+input.desc+input.value);
          // 2. add the item to the budget controller

          
          
          budget = budgetcontroller.addBudget(input.type,input.desc,input.value);
          
          
          // 3. add this to UI

          UIcontroller.showAll(budget,input.type);
          
          
          // 4. Add header budget 
          
          headerBudget();
       

          // 5. Clear Field and set cursor to the input form, after submit

          
          UIcontroller.clear()
          
          
          
          
          
             
      // 
      
  }
  
      
  var ctrlDeleteItem = function(){
      
      
      
      
      
      
      
      
      
      
  }    
      
  
  
  
  
  document.querySelector('.add__btn').addEventListener('click',addButton);   
  
  
  

  
  
  
  
  
  
  
})(UIController,budgetController);























































/**





var budgetControler = (function(){
        
        
        var Expense = function(id,desc,value){
            
            this.id = id;
            this.desc = desc;
            this.value = value;
            
        };
         var Icnome = function(id,desc,value){
            
            this.id = id;
            this.desc = desc;
            this.value = value;
            
        };
        
        
        var allExpenses = [] ;
        var allIncomes = [] ;
        var totalExpenses = 0 ;
        
        
        var data = {
            allitems: {
                
                exp: [],
                inc: []
            },
            
            totals:{
                exp: 0,
                inc: 0
            }
            
            
        }
        
        
        
        
        
    })();
    


var Expense = function(id,desc,value){
            
            this.id = id;
            this.desc = desc;
            this.value = value;
            
        }
      
  
      var UIController = (function(){
          
          
          
          var DOMstring = {
              
              inpuType: '.add__type',
              inputDesc : '.add__description' ,
              inputValue : '.add__value',
              inputBtn : '.add__btn'
              
          };
          
          
          
      
              return {
              
              
              getInput : function(){
                  return {
                  type : document.querySelector(DOMstring.inpuType).value, // Either inc or ex[]
                  desc : document.querySelector(DOMstring.inputDesc).value,
                  value   : document.querySelector(DOMstring.inputValue).value
                  
                  };
                                     
              },
              
              getDOMstring : function(){
              
                  return DOMstring;
          }
              
                  
              };
  
                      
      })();
      
      
      var controller = (function(UIcontroller,bdController){
          
          
          var DOM = UIcontroller.getDOMstring();
          
          
          
          var ctrlAddUser = function(){
                      
           // 1. Get fill input data
              
              console.log(UIcontroller.getInput());
              
              // 2. Add new item to budget Controller
                            
              
              // 3. Add the item tothe uI
              
              // 4 Calculate the dubget
              
              // 5. Dsplay the budget on the UI    
                              
              console.log('gooo');
          }
          
      
          
          document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddUser);
          
          
          document.addEventListener('keypress',function(event){
              
              
             if(event.keyCode === 13 || event.which === 13){
                 console.log('enter was pressed')
             };
              
              
              
          });
          
          
          
          
          
          
      })(UIController,budgetControler);
      
      

**/
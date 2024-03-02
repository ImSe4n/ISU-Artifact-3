<html>
<head>
  <title>ISU Part 3</title>
  <link href="style.css" rel="stylesheet" type="text/css"/>
</head>
<body>
  <div class="grid-container">
    <div class="item1">
      <p class="title">ISU Part 3</p>
      <table style="width: 100%; margin: auto;">
        <tr><td>
          <button onclick="showContent('content1')">Budget Management</button>
        </td></tr>
        <tr><td>
          <button onclick="showContent('content2')">Interest Calculator</button>
        </td></tr>
        <tr><td>
          <button onclick="showContent('content3')">Stock App</button>
        </td></tr>
        <tr><td>
          <button onclick="showContent('content4')">Currency Converter</button>
        </td></tr>
        <tr><td>
          <button onclick="showContent('content5')">Appreciation & Depreciation Calculator</button>
        </td></tr>
      </table>
    </div>
    <div class="item2">

      <div class="content content4" style="display: none;">
        <div class="wrapper">
          <div class="app-details">
            <p class="title">Currency Converter</p>
          </div>
          <label for="amount">Amount:</label>
          <input type="number" id="amount" value="100" />
          <div class="dropdowns">
            <select id="from-currency-select"></select>
            <select id="to-currency-select"></select>
          </div>
          <button id="convert-button">Convert</button>
          <p id="result"></p>
        </div>
      </div>

      <div class="content content5" style="display: none;">
      <p class="title">Appreciation & Depreciation Calculator</p></p>
      </div>

      <div class="content content1" style="display: none;">
      <div class="top">
            <div class="budget">
                <div class="budget__title">
                    Available Budget in <span class="budget__title--month">%Month%</span>:
                </div>
                
                
                
                <div class="budget__value">+ 0</div>
                
                <div class="budget__income clearfix">
                    <div class="budget__income--text">Income</div>
                    <div class="right">
                        <div class="budget__income--value">+ 0</div>
                        <div class="budget__income--percentage">&nbsp;</div>
                    </div>
                </div>
                
                <div class="budget__expenses clearfix">
                    <div class="budget__expenses--text">Expenses</div>
                    <div class="right clearfix">
                        <div class="budget__expenses--value">- 0</div>
                        <div class="budget__expenses--percentage">45%</div>
                    </div>
                </div>
            </div>
        </div>
        
        
        
        <div class="bottom">
            <div class="add">
                <div class="add__container">
                    <select class="add__type">
                        <option value="inc" selected>+</option>
                        <option value="exp">-</option>
                    </select>
                    <input type="text" class="add__description" placeholder="Add description">
                    <input type="number" class="add__value" placeholder="Value">
					
                    <input type="submit" class="add__btn" type='button'>
                </div>
            </div>
            
            <div class="container clearfix">
                <div class="income">
                    <h2 class="icome__title">Income</h2>
                    
                    <div class="income__list">
                       
                        <!--
                        <div class="item clearfix" id="income-0">
                            <div class="item__description">Salary</div>
                            <div class="right clearfix">
                                <div class="item__value">+ 2,100.00</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="item clearfix" id="income-1">
                            <div class="item__description">Sold car</div>
                            <div class="right clearfix">
                                <div class="item__value">+ 1,500.00</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                        -->
                        
                    </div>
                </div>
                
                
                
                <div class="expenses">
                    <h2 class="expenses__title">Expenses</h2>
                    
                    <div class="expenses__list">
                       
                        <!--
                        <div class="item clearfix" id="expense-0">
                            <div class="item__description">Apartment rent</div>
                            <div class="right clearfix">
                                <div class="item__value">- 900.00</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>

                        <div class="item clearfix" id="expense-1">
                            <div class="item__description">Grocery shopping</div>
                            <div class="right clearfix">
                                <div class="item__value">- 435.28</div>
                                <div class="item__percentage">10%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                        -->
                        
                    </div>
                </div>
            </div>
            
            
        </div>
      </div>

      <div class="content content2" style="display: none;">
        <p class="title">Interest Calculator</p>
        <div>
          <table>
            <tr>
              <td>
                <label>Select Interest Type:</label>
              </td>
              <td>
                <label><input type="radio" id="simpleInterest" name="type" checked>
                   Simple</label>
              </td>
              <td id="simpleError">
                <p></p>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <label><input type="radio" id="compoundInterest" name="type">
                   Compound</label>
              </td>
              <td id="compoundError">
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Principal Amount ($):</label>
              </td>
              <td>
                <input type="number" id="principalAmount" step="0.01">
              </td>
              <td id="principalError">
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Interest Rate (%):</label>
              </td>
              <td>
                <input type="number" id="interestRate" step="0.01">
              </td>
              <td id="rateError">
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Interest Frequency:</label>
              </td>
              <td>
                <select id="interestFreq" tabindex="1">
                  <option value="Annually">Annually</option>
                  <option value="Semiannually">Semiannually</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </td>
              <td id="freqError">
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <label>Duration (years):</label>
              </td>
              <td>
                <input type="number" id="duration" step="1">
              </td>
              <td id="durationError">
                <p></p>
              </td>
            </tr>
          </table>
        </div>

        <button id="calculateButton" onclick="calculateInterest()" style="width:125px;">Calculate</button>
        <br>
        <br>
          <p class="title">Results</p>
          <div id="results" style="margin: 0px;">
            <table class='resultTable'><tr><th>Year</th><th>Interest (per year)</th><th>Total Amount</th></tr>
              <?php 
              for ( $i = 1; $i <= 15; $i++ ) {
                echo "
                  <tr>
                  <td style='text-align: center;'>$i</td>
                  <td style='text-align: right;'>$0.00</td>
                  <td style='text-align: right;'>$0.00</td>
                  </tr>
                  ";
              }
              ?>
            </table>
          </div>
    </div>

      <div class="content content3" style="display: none;">
        <p class="title">Stock App</p>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>

            canvas {
                display: block;
                margin: 20px auto;
                max-width: 100%;
                height: 400px; /* Increase the height for better visibility */
            }

            label {
                display: block;
                margin-bottom: 10px;
            }

            input {
                padding: 8px;
                width: 60%;
                font-size: 16px;
            }

            #stockInfo {
                margin-top: 20px;
            }

            #peRatio {
                margin-top: 20px;
                font-weight: bold;
            }
        </style>
        <body>

        <main>
            <label for="ticker">Enter Stock Ticker:</label>
            <input type="text" id="ticker" placeholder="E.g: AAPL, MSFT">
            <button onclick="fetchStockData()">Get Stock Data</button>

            <canvas id="stockChart"></canvas>

            <div id="stockInfo"></div>
            <div id="peRatio"></div>
        </main>

        <script>
            document.addEventListener('DOMContentLoaded', function () {
                window.fetchStockData = async function () {
                    const ticker = document.getElementById('ticker').value.toUpperCase();
                    const apiKey = '2X8AHKH6M7SLGS8H'; // Replace with your Alpha Vantage API key
                    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`;

                    try {
                        const response = await fetch(apiUrl);
                        const data = await response.json();

                        if (data['Time Series (Daily)']) {
                            const stockData = Object.entries(data['Time Series (Daily)']).map(([date, entry]) => ({
                                date,
                                close: parseFloat(entry['4. close']),
                                high: parseFloat(entry['2. high']),
                                low: parseFloat(entry['3. low']),
                                open: parseFloat(entry['1. open']),
                                volume: parseFloat(entry['5. volume'])
                            }));

                            createStockChart(stockData.reverse());
                            displayStockInfo(stockData);
                            calculatePE(stockData);
                        } else {
                            alert('No data available for the given ticker');
                        }
                    } catch (error) {
                        console.error('Error fetching stock data:', error);
                    }
                };

                function createStockChart(stockData) {
                    const dates = stockData.map(entry => entry.date);
                    const closingPrices = stockData.map(entry => entry.close);

                    const ctx = document.getElementById('stockChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [{
                                label: 'Closing Prices',
                                borderColor: 'rgb(75, 192, 192)',
                                data: closingPrices,
                            }]
                        }
                    });
                }

                function displayStockInfo(stockData) {
                    const latestEntry = stockData[stockData.length - 1];

                    document.getElementById('stockInfo').innerHTML = `
                        <p>Current Stock Price: ${latestEntry.close.toFixed(2)}</p>
                        <p>Today's High: ${latestEntry.high.toFixed(2)}</p>
                        <p>Today's Low: ${latestEntry.low.toFixed(2)}</p>
                        <p>Today's Volume: ${latestEntry.volume.toFixed(2)}</p>
                        <p>Today's Open Price: ${latestEntry.open.toFixed(2)}</p>
                    `;
                }

                function calculatePE(stockData) {
                    const latestClosingPrice = stockData[stockData.length - 1].close;
                    const earningsPerShare = 5;  // Replace with actual earnings per share
                    const peRatio = latestClosingPrice / earningsPerShare;

                    document.getElementById('peRatio').innerHTML = `<p>P/E Ratio: ${peRatio.toFixed(2)}</p>`;
                }
            });
        </script>
      </div>
    </div>
          
  </div>
  <script src="currency-codes.js"></script>
  <script src="api-key.js"></script>
  <script src="script.js"></script>
</body>
</html>

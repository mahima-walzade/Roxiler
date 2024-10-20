const apiUrl = 'http://localhost:3000'; // Base URL for your APIs
let currentPage = 1;
const perPage = 10;
const defaultMonth = 'March';

// Get DOM elements
const monthDropdown = document.getElementById('month');
const searchBox = document.getElementById('search');
const transactionTableBody = document.getElementById('transactionTable').querySelector('tbody');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const totalSaleAmountElem = document.getElementById('totalSaleAmount');
const totalSoldItemsElem = document.getElementById('totalSoldItems');
const totalNotSoldItemsElem = document.getElementById('totalNotSoldItems');
const barChartCanvas = document.getElementById('barChart');
const pieChartCanvas = document.getElementById('pieChart');

// Chart instances
let barChart;
let pieChart;

// Fetch transactions and update the table
async function fetchTransactions(month, searchQuery = '', page = 1) {
    const response = await fetch(`${apiUrl}/transactions?month=${month}&search=${searchQuery}&page=${page}&perPage=${perPage}`);
    const data = await response.json();
    updateTransactionTable(data.transactions);
    updatePaginationControls(data.page, data.totalPages);
}

// Update transaction table
function updateTransactionTable(transactions) {
    transactionTableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = `<tr>
            <td>${transaction.title}</td>
            <td>${transaction.description}</td>
            <td>$${transaction.price}</td>
            <td>${new Date(transaction.dateOfSale).toLocaleDateString()}</td>
        </tr>`;
        transactionTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Update pagination controls
function updatePaginationControls(page, totalPages) {
    pageInfo.textContent = `Page ${page}`;
    prevPageBtn.disabled = page <= 1;
    nextPageBtn.disabled = page >= totalPages;
}

// Fetch and update statistics
async function fetchStatistics(month) {
    const response = await fetch(`${apiUrl}/statistics?month=${month}`);
    const data = await response.json();
    totalSaleAmountElem.textContent = `$${data.totalSaleAmount}`;
    totalSoldItemsElem.textContent = data.totalSoldItems;
    totalNotSoldItemsElem.textContent = data.totalNotSoldItems;
}

// Fetch and render bar chart
async function fetchBarChartData(month) {
    const response = await fetch(`${apiUrl}/bar-chart?month=${month}`);
    const data = await response.json();

    if (barChart) barChart.destroy();

    const labels = data.map(item => item.priceRange);
    const values = data.map(item => item.numberOfItems);

    barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: '# of Items',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Fetch and render pie chart
async function fetchPieChartData(month) {
    const response = await fetch(`${apiUrl}/pie-chart?month=${month}`);
    const data = await response.json();

    if (pieChart) pieChart.destroy();

    const labels = data.map(item => item.category);
    const values = data.map(item => item.numberOfItems);

    pieChart = new Chart(pieChartCanvas); {
        type: 'pie',
        data; {
            labels,
            datasets; [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)']
                }]
            }
        }
    }

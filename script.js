document.addEventListener("DOMContentLoaded", () => {
    fetch("./superstore.json")
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data);
  
        // DataTables for the first table
        let tableBody = document.getElementById("sales-table-body");
        data.forEach(function(item) {
          let row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.sub_category}</td>
            <td>${item.sales}</td>
          `;
          tableBody.appendChild(row);
        });
        $("#sales-table").DataTable();
  
        // Cloning data for the second table
        let clonedData = JSON.parse(JSON.stringify(data));
        let tableBody2 = document.getElementById("product-table-body");
        clonedData.forEach(function(item) {
          let row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.product_name}</td>
            <td>${item.sales}</td>
          `;
          tableBody2.appendChild(row);
        });
        $("#product-table").DataTable();
  
        // Chart.js
        let categories = data.reduce(function (acc, item) {
          acc[item.category] = (acc[item.category] || 0) + item.sales;
          return acc;
        }, {});
  
        let labels = Object.keys(categories);
        let salesData = Object.values(categories);
  
        let ctx = document.getElementById("sales-chart").getContext("2d");
        let salesChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Total Sales",
                data: salesData,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
  });
  
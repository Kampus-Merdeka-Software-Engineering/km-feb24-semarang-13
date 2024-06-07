document.addEventListener("DOMContentLoaded", () => {
    fetch("./superstore.json")
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data);

        // Mengubah sales, quantity, discount, dan profit dari string menjadi angka
        let convertedData = data.map(item => {
          return {
            ...item,
            sales: parseFloat(item.sales),
            quantity: parseInt(item.quantity),
            discount: parseFloat(item.discount),
            profit: parseFloat(item.profit)
          };
        });

        console.log('converted data: ', convertedData);

        let shippModeOrders = convertedData.reduce((acc, item) => {
            acc[item.ship_mode] = (acc[item.ship_mode] || 0) + 1;
            return acc;
        }, {});

        let labels = Object.keys(shippModeOrders);
        let salesData = Object.values(shippModeOrders);

        let ctx = document.getElementById("ship-mode-orders").getContext("2d");

        let salesChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  axis: 'y',
                  label: "Sales by shipmode-by-preferences",
                  data: salesData,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)'
                  ],
                  borderColor: "rgba(54, 162, 235,1)",
                  borderWidth: 1,
                },
              ],
            },
        });
    });
});

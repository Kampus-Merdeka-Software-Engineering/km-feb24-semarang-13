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

        let segmentation = convertedData.reduce((acc, item) => {
            acc[item.segment] = (acc[item.segment] || 0) + item.sales;
            return acc;
        }, {});

        let labels = Object.keys(segmentation);
        let salesData = Object.values(segmentation);

        let ctx = document.getElementById("sales-by-segment").getContext("2d");

        let salesChart = new Chart(ctx, {
            type: "pie",
            data: {
              labels: labels,
              datasets: [
                {
                  // axis: 'y',
                  label: "Sales by Segment Customers",
                  data: salesData,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)'
                  ],
                  borderWidth: 1,
                },
              ],
            },
        });
    });
});

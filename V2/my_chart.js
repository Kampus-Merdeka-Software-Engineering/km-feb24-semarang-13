fetch('assets/superstore.json')
    .then(response => response.json())
    .then(data => {
        // Buat objek untuk mengelompokkan data berdasarkan bulan dan tahun
        const monthlySales = {
            "2014": Array(12).fill(0),
            "2015": Array(12).fill(0),
            "2016": Array(12).fill(0),
            "2017": Array(12).fill(0)
        };

        // Loop melalui data dan kelompokkan berdasarkan bulan
        data.forEach(record => {
            const date = new Date(record.order_date);
            const year = date.getFullYear();
            const month = date.getMonth(); // 0 = January, 11 = December

            // Convert sales to a number
            const sales = parseFloat(record.sales);

            if (monthlySales[year]) {
                monthlySales[year][month] += sales;
            }
        });

        // Buat array bulan dengan total penjualan
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const totalMonthlySales = months.map((month, index) => {
            return {
                month: month,
                totalSales: monthlySales["2014"][index] + monthlySales["2015"][index] + monthlySales["2016"][index] + monthlySales["2017"][index]
            };
        });

        // Sort array berdasarkan total penjualan secara menurun
        totalMonthlySales.sort((a, b) => b.totalSales - a.totalSales);

        // Buat data untuk grafik
        const chartData = {
            labels: months,
            datasets: [
                {
                    label: '2014',
                    data: monthlySales["2014"],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false
                },
                {
                    label: '2015',
                    data: monthlySales["2015"],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: false
                },
                {
                    label: '2016',
                    data: monthlySales["2016"],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false
                },
                {
                    label: '2017',
                    data: monthlySales["2017"],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false
                }
            ]
        };

        // Buat grafik
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Sales'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error loading the data:', error));
``
// Memuat data penjualan dari superstore.json
fetch('assets/superstore.json')
  .then((response) => response.json())
  .then((salesData) => {
    // Mengelompokkan penjualan berdasarkan segmen
    const salesBySegment = salesData.reduce((segments, sale) => {
      const segment = sale.segment;
      const sales = parseFloat(sale.sales);  // Mengonversi penjualan ke angka
      if (!segments[segment]) {
        segments[segment] = 0;
      }
      segments[segment] += sales;
      return segments;
    }, {});

    // Menyiapkan data untuk Chart.js
    const labels = Object.keys(salesBySegment);
    const data = Object.values(salesBySegment);

    // Membuat bar chart
    const ctx = document.getElementById('barchart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales',
          data: data,
          backgroundColor: '#5960E6',  // Warna latar belakang bar
          borderColor: '#3F50B4',      // Warna garis bar
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',  // Mengubah sumbu indeks menjadi y untuk horizontal bar chart
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Segment'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.raw.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
              }
            }
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error('Error loading or processing data:', error);
  });

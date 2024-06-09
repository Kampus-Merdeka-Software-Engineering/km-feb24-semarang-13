// Memuat data penjualan dari superstore.json
fetch('assets/superstore.json')
  .then((response) => response.json())
  .then((salesData) => {
    // Mengelompokkan total pesanan berdasarkan ship_mode dengan menghitung distinct id_order
    const ordersByShipMode = salesData.reduce((shipModes, sale) => {
      const shipMode = sale.ship_mode;
      const orderId = sale.id_order;

      if (!shipModes[shipMode]) {
        shipModes[shipMode] = new Set();
      }
      shipModes[shipMode].add(orderId);  // Menggunakan Set untuk menghitung distinct id_order
      return shipModes;
    }, {});

    // Menyiapkan data untuk Chart.js
    const labels = Object.keys(ordersByShipMode);
    const data = labels.map(label => ordersByShipMode[label].size);  // Menghitung ukuran Set

    // Membuat bar chart
    const ctx = document.getElementById('columnchart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Orders',
          data: data,
          backgroundColor: '#5960E6',  // Warna latar belakang bar
          borderColor: '#3F50B4',      // Warna garis bar
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ship Mode'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Orders'
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
                return context.raw.toLocaleString('en-US');
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

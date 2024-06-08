// Memuat data geografis
fetch('https://unpkg.com/us-atlas/states-10m.json')
  .then((response) => response.json())
  .then((us) => {
    const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
    const states = ChartGeo.topojson.feature(us, us.objects.states).features;

    // Memuat data penjualan
    fetch('assets/superstore.json')
      .then((response) => response.json())
      .then((salesData) => {
        // Membuat peta (mapping) nama negara bagian ke nilai total penjualan
        const salesMap = salesData.reduce((map, data) => {
          const state = data.state;
          const sales = parseFloat(data.sales);  // Mengonversi penjualan ke angka
          if (!map[state]) {
            map[state] = 0;
          }
          map[state] += sales;
          return map;
        }, {});

        // Memetakan data penjualan ke negara bagian
        const stateData = states.map((d) => ({
          feature: d,
          value: salesMap[d.properties.name] || 0,  // Default ke 0 jika tidak ada data penjualan
        }));

        // Menentukan nilai maksimum penjualan untuk skala warna
        const maxSales = Math.max(...stateData.map(d => d.value));

        // Membuat chart
        const chart = new Chart(document.getElementById('geo').getContext('2d'), {
          type: 'choropleth',
          data: {
            labels: states.map((d) => d.properties.name),
            datasets: [{
              label: 'Penjualan per Negara Bagian',
              outline: nation,
              data: stateData,
            }],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              projection: {
                axis: 'x',
                projection: 'albersUsa',
              },
              color: {
                axis: 'x',
                quantize: 4,  // Menggunakan 4 skala warna
                // Menentukan skema warna kustom
                legend: {
                  position: 'bottom-right',
                  align: 'bottom',
                scale: {
                  range: ['#6066bc', '#CCD1EC', '#8A94EB', '#5960E6']  // Warna dari cerah ke tua
                  },
                },
              },
            },
          },
        });
      });
  });

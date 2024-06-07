document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/js/superstore.json")
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data)
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
      });
});
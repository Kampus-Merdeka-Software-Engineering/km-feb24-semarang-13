// document.addEventListener("DOMContentLoaded", () => {
//     fetch("assets/js/superstore.json")
//       .then(response => response.json())
//       .then(data => {
//         console.log('data: ', data)
//         let tableBody2 = document.getElementById("product-table-body");
//         data.forEach(function(item) {
//           let row = document.createElement("tr");
//           row.innerHTML = `
//             <td>${item.product_name}</td>
//             <td>${item.sales}</td>
//           `;
//           tableBody2.appendChild(row);
//         }, {});
//         $("#product-table").DataTable();
//       });
// });


// Cloning data for the second table
        // let clonedData = JSON.parse(JSON.stringify(data));
        // let tableBody2 = document.getElementById("product-table-body");
        // clonedData.forEach(function(item) {
        //   let row = document.createElement("tr");
        //   row.innerHTML = `
        //     <td>${item.product_name}</td>
        //     <td>${item.sales}</td>
        //   `;
        //   tableBody2.appendChild(row);
        // }, {});
        // $("#product-table").DataTable();

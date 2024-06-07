$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'assets/js/superstore.json',
        dataType: 'json',
        success: function (data) {
            console.log("Data berhasil diambil:", data); 

            
            var selectedData = data.map(function (item) {
                return {
                    "id_row": item.id_row,
                    "segment": item.segment,
                    "category": item.category,
                    "product_name": item.product_name,
                    "sales": item.sales * item.quantity
                };
            });

            console.log("Data yang dipilih:", selectedData); 

            
            var table = $('#example').DataTable({
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                data: selectedData,
                columns: [{
                        "data": "id_row",
                        "title": "No"
                    },
                    {
                        "data": "segment",
                        "title": "Segment"
                    },
                    {
                        "data": "category",
                        "title": "Category"
                    },
                    {
                        "data": "product_name",
                        "title": "Product Name"
                    },
                    {
                        "data": "sales",
                        "title": "Sales"
                    }
                ]
            });
            table.buttons().container()
                .appendTo('#example_wrapper .col-md-6:eq(0)');
            console.log(table)

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error loading JSON data: ' + textStatus);
        }
    });
});
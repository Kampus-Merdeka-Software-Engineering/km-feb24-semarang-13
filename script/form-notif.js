document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the SweetAlert notification
    contoh();

    // Optionally, clear the form fields
    this.reset();
});

function contoh() {
    swal({
        title: "Berhasil!",
        text: "Pesan berhasil di kirim!",
        icon: "success",
        button: true
    });
}

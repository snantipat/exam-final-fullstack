$(function () {

    var searchParams = new URLSearchParams(window.location.search);
    var pid = searchParams.get("pid");
    var url = "/api/products/" + pid;

    // Get data when first time open
    getData();

    function getData() {
        // #14 Get a selected product and display as a form
        // use $.get
        $.get(url, function (data, status) {
            console.log(status);
            if (status === 'success') {
                console.log("retreive data by id : ", data);
                _data = data[0];
                var serialno = _data.serialno;
                var name = _data.name;
                var category = _data.category;
                var price = _data.price;
                var photo = _data.photo;
                $("#serialno").val(serialno);
                $("#name").val(name);
                $("#category").val(category);
                $("#price").val(price);
                $("#photo").val(photo);
                $("#preview").attr("src", $("#photo").val());
            }
        });
        // ===============================
    }

    // Update photo when URL has changed
    $("#photo").change(function () {
        $("#preview").attr("src", $("#photo").val());
    })

    // Save edited product data
    $("#saveproduct").click(function () {
        var editproduct = {
            serialno: $("#serialno").val(),
            name: $("#name").val(),
            category: $("#category").val(),
            price: $("#price").val(),
            photo: $("#photo").val()
        }
        $.ajax({
            url: url,
            type: 'PUT',
            data: editproduct,
            success: function (result) {
                //Show updated status
                $("#modalbody").text("Updated product " + pid);
                $('#alertModal').modal('toggle');
                // Refresh data
                getData();
            }
        });
    });

    $("#deleteproduct").click(function () {
        $('#confirmModal').modal('toggle');
    });

    $("#confirmdelete").click(function () {
        // #15 Delete a selected product and go back to product list
        // use $.get and winidow.location.href
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (result) {
                console.log(result);
                winidow.location.href = "product.html";
            }
        });
        // ===============================
    });
});
var backendURL = "http://192.168.100.26:8080/demo/api/book";
window.onload = function() {


    dupaAutor = document.getElementById("dupaAutor");
    dupaAutor.onkeyup = findByAuthor;
};


function findByAuthor() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var books = JSON.parse(this.responseText);
            adaugaInTabel(books);
            // aici adaugam linie in tabel
        }
    };
    xhttp.open("GET", backendURL + "?author=" + dupaAutor.value, true);
    xhttp.send();
}

function adaugaInTabel(books) {
    var table = document.getElementById("myTable");
    curataTabel();

    var nrOfBooks = books.length;
    for (var i = 0; i < nrOfBooks; i++) {
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = books[i]['authorName'];
        cell2.innerHTML = books[i]['title'];
        cell3.innerHTML = books[i]['pageCount'];
        cell4.innerHTML = books[i]['publishYear'];
    }



}

function curataTabel() {
    var table = document.getElementById("myTable");
    var totalRowCount = table.rows.length; // 5
    for (var i = totalRowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

}
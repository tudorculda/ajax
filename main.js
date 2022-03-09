var backendURL = "http://ec2-15-237-142-192.eu-west-3.compute.amazonaws.com:8080/demo/api/book";
window.onload = function() {


    dupaAutor = document.getElementById("dupaAutor");
    dupaAutor.onkeyup = findByAuthor;

    dupaTitle = document.getElementById("dupaTitle");
    dupaTitle.onkeyup = findByTitle;
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

function findByTitle() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var books = JSON.parse(this.responseText);
            adaugaInTabel(books);

        }
    };
    xhttp.open("GET", backendURL + "?title=" + dupaTitle.value, true);
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

function salveazaDate() {
    var author = document.getElementById("authorId").value;
    var titlu = document.getElementById("titluId").value;
    var an = document.getElementById("anId").value;
    var pagini = document.getElementById("nrPagId").value;
    var newBook = {
        authorName: author,
        title: titlu,
        pageCount: pagini,
        publishYear: an
    }

    trimiteDatePentruSalvare(newBook);

}


function trimiteDatePentruSalvare(newBook) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("datele au fost salvate");

        }
    };
    xhttp.open("POST", backendURL, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newBook));



}
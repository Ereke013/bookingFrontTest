function getHotelById() {
    let params = window.location.search.substring(1).split("&");
    let id = params[0].split("=")[1];
    let url = 'http://localhost:8080/hotel/' + id
    console.log('getHotelById id=', id);
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            document.getElementById('hotel-name').innerText = data.name;
            document.getElementById('hotel-description').innerText = data.description;


        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getAllHotels() {
    let url = 'http://localhost:8080/hotel/all'
    console.log('getAllHotels');
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById('hotels-table');
            var column_size = 2

            var i = 0;
            var sum = 0;
            var tdd = ""
            data.forEach(hotel => {
                var td = "<td>\n" +
                    "          <div class=\"hotel-card\">\n" +
                    "            <img src=" + hotel.image + " alt=\"Hotel\" width=\"300\">\n" +
                    "            <div>\n" +
                    "              <h2>" + hotel.name + "</h2>\n" +
                    "              <p>Hotel Class: " + hotel.star + "</p>\n" +
                    "              <p>Number of Floors: " + hotel.num_of_floor + "</p>\n" +
                    "              <p>Total Number of Rooms: " + hotel.num_of_floor + "</p>\n" +
                    "              <p>Room Sizes: Single, Double</p>\n" +
                    "              <a href=\"hotel.html?id=" + hotel.id + "\" class=\"btn\">View Details</a>\n" +
                    "            </div>\n" +
                    "\n" +
                    "          </div>\n" +
                    "        </td>";
                tdd += td;
                i++;
                sum++;
                if (column_size == i  || sum == data.length) {
                    var newRow = table.insertRow();
                    console.log("innerHTML");
                    newRow.innerHTML = "<tr>" + tdd + "</tr>";
                    tdd = "";
                    i=0;
                }
            });


        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
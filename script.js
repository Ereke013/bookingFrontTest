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

function getRoomsByHotelId() {
    let params = window.location.search.substring(1).split("&");
    let id = params[0].split("=")[1];
    let url = 'http://localhost:8080/room/all'

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let filteredData = data.filter(function (room) {
                return room.hotel.id == id;
            })
            let table = document.getElementById('room-table');
            filteredData.forEach(room => {
                var newRow = table.insertRow();
                newRow.innerHTML = "<tr>\n" +
                    "          <td>" + room.room_type +"</td>\n" +
                    "          <td>" + room.area +"</td>\n" +
                    "          <td>$" + room.base_price + "</td>\n" +
                    "        </tr>"
            })


        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function bookRoom() {
    let url = 'http://localhost:8080/booking/add'

    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let checkin = document.getElementById("input-checkin").value;
    let checkout = document.getElementById("input-checkout").value;
    let adults_option = document.getElementById("input-adults-option").value;
    let children_option = document.getElementById("input-children-option").value;
    let room_option = document.getElementById("input-room-option").value;
    let transfer_checkbox = document.getElementById("transfer_checkbox").checked;
    let gym_checkbox = document.getElementById("gym_checkbox").checked;
    let laundry_checkbox = document.getElementById("laundry_checkbox").checked;
    console.log("name: ", name)
    console.log("email: ", email)
    console.log("checkin: ", checkin)
    console.log("checkout: ", checkout)
    console.log("adults_option: ", adults_option)
    console.log("children_option: ", children_option)
    console.log("room_option: ", room_option)
    console.log("transfer_checkbox: ", transfer_checkbox)
    console.log("gym_checkbox: ", gym_checkbox)
    console.log("laundry_checkbox: ", laundry_checkbox)


    if ((checkin != undefined || checkin != "") && (checkout != undefined || checkout != "")) {

        let data = {
            check_in_date : checkin,
            check_out_date : checkout
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data)


            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

}
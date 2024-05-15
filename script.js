function getHotelById() {
  let params = window.location.search.substring(1).split("&");
  let id = params[0].split("=")[1];
  let url = "http://localhost:8080/hotel/" + id;
  console.log("getHotelById id=", id);
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      document.getElementById("hotel-name").innerText = data.name;
      document.getElementById("hotel-description").innerText = data.description;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getStarHotel(star) {
  let starCount = "";
  let emptyStar = "&#9734";
  let fullStar = "&#9733";
  for (let i = 0; i < star; i++) {
    starCount += fullStar;
  }
  for (let i = 0; i < 5 - star; i++) {
    starCount += emptyStar;
  }
  return "<span >" + starCount + "</span>";
}

function getAllHotels() {
  let url = "http://localhost:8080/hotel/all";
  console.log("getAllHotels");
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let table = document.getElementById("hotels-table");
      var column_size = 1;

      var i = 0;
      var sum = 0;
      var tdd = "";
      data.forEach((hotel) => {
        var td =
          "<td>\n" +
          '          <div class="hotel-card">\n' +
          "            <img src=" +
          hotel.image +
          ' alt="Hotel" width="300">\n' +
          '            <div class="hotel_content">\n' +
          "              <h2>" +
          hotel.name +
          "</h2>\n" +
          "              <p>Hotel Class: " +
          getStarHotel(hotel.star) +
          "</p>\n" +
          "              <p>Number of Floors: " +
          hotel.num_of_floor +
          "</p>\n" +
          "              <p>Total Number of Rooms: " +
          hotel.num_of_floor +
          "</p>\n" +
          "              <p>Room Sizes: Single, Double</p>\n" +
          '              <a href="hotel.html?id=' +
          hotel.id +
          '" class="btn">View Details</a>\n' +
          "            </div>\n" +
          "\n" +
          "          </div>\n" +
          "        </td>";
        tdd += td;
        i++;
        sum++;
        if (column_size == i || sum == data.length) {
          var newRow = table.insertRow();
          console.log("innerHTML");
          newRow.innerHTML = "<tr>" + tdd + "</tr>";
          tdd = "";
          i = 0;
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getRoomsByHotelId() {
  let params = window.location.search.substring(1).split("&");
  let id = params[0].split("=")[1];
  let url = "http://localhost:8080/room/all";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let filteredData = data.filter(function (room) {
        return room.hotel.id == id;
      });
      let table = document.getElementById("room-table");
      let options = "";
      let priceInput_innerHTML = "";
      let selectRoom = document.getElementById("input-room-option");
      let priceInput = document.getElementById("room_prices_input");
      //priceInput
      filteredData.forEach((room) => {
        var newRow = table.insertRow();
        newRow.innerHTML =
          "<tr>\n" +
          "          <td>" +
          room.room_type +
          "</td>\n" +
          "          <td>" +
          room.area +
          "</td>\n" +
          "          <td >$" +
          room.base_price +
          "</td>\n" +
          "        </tr>";
        options +=
          '<option value="' + room.id + '">' + room.room_type + "</option>";
        priceInput_innerHTML +=
          '<input type="hidden" id=' +
          "room_price_input_" +
          room.id +
          ' value="' +
          room.base_price +
          '"/>';
      });
      console.log("priceInput", priceInput);
      console.log("priceInput_innerHTML", priceInput_innerHTML);
      selectRoom.innerHTML = options;
      priceInput.innerHTML = priceInput_innerHTML;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function calculateDayDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d2 > d1) {
    const timeDifference = d2 - d1;

    const dayDifference = timeDifference / (1000 * 3600 * 24);

    return dayDifference;
  } else {
    return 0;
  }
}

function bookRoom() {
  let url = "http://localhost:8080/booking/add";
  let params = window.location.search.substring(1).split("&");
  let id = params[0].split("=")[1];

  let firstname = document.getElementById("input-first-name").value;
  let lastname = document.getElementById("input-last-name").value;
  let email = document.getElementById("input-email").value;
  let checkin = document.getElementById("input-checkin").value;
  let checkout = document.getElementById("input-checkout").value;
  let adults_option = document.getElementById("input-adults-option").value;
  let tel = document.getElementById("input-tel").value;

  let room_option = document.getElementById("input-room-option").value;
  let transfer_checkbox = document.getElementById("transfer_checkbox").checked;
  let gym_checkbox = document.getElementById("gym_checkbox").checked;
  let laundry_checkbox = document.getElementById("laundry_checkbox").checked;

  let total_costs = 0;

  if (transfer_checkbox) {
    total_costs += 100;
  }
  if (gym_checkbox) {
    total_costs += 90;
  }
  if (gym_checkbox) {
    total_costs += 200;
  }

  // Convert the dates to Date objects
  const checkin_date = new Date(checkin);
  const checkout_date = new Date(checkout);

  // Check if date2 is greater than date1
  if (checkout_date > checkin_date) {
    // Calculate the time difference in milliseconds
    const timeDifference = checkout_date - checkin_date;

    // Convert time difference from milliseconds to days
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (room_option) {
      let room_price = document.getElementById(
        "room_price_input_" + room_option
      ).value;
      let price = parseInt(room_price);
      total_costs += price * dayDifference;
    } else {
      alert("room is invalid");
      return;
    }
    // return dayDifference;
  } else {
    alert("Date is invalid");
    return;
  }

  console.log("email: ", email);
  console.log("tel: ", tel);
  console.log("firstname: ", firstname);
  console.log("lastname: ", lastname);
  console.log("checkin: ", checkin);
  console.log("checkout: ", checkout);
  console.log("adults_option: ", adults_option);

  console.log("room_option: ", room_option);
  console.log("transfer_checkbox: ", transfer_checkbox);
  console.log("gym_checkbox: ", gym_checkbox);
  console.log("laundry_checkbox: ", laundry_checkbox);

  if (
    (checkin != undefined || checkin != "") &&
    (checkout != undefined || checkout != "")
  ) {
    let data = {
      total_costs: total_costs,
      guest: {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: tel,
      },
      room: {
        id: room_option,
        // id:
      },
      check_in_date: checkin,
      check_out_date: checkout,
      num_of_adults: parseInt(adults_option || "1"),
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        document.getElementById("input-first-name").value = "";
        document.getElementById("input-last-name").value = "";
        document.getElementById("input-email").value = "";
        document.getElementById("input-checkin").value = "";
        document.getElementById("input-checkout").value = "";
        document.getElementById("input-adults-option").value = "";
        document.getElementById("input-tel").value = "";

        document.getElementById("input-room-option").value = "";
        document.getElementById("transfer_checkbox").checked = false;
        document.getElementById("gym_checkbox").checked = false;
        document.getElementById("laundry_checkbox").checked = false;
        alert("Success");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function getAllBooking() {
  let url = "http://localhost:8080/booking/by-guest";
  let email = document.getElementById("booking-email").value;

  let tel = document.getElementById("booking-tel").value;
  let data = {
    email: email,
    phone: tel,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      let table = document.getElementById("hotels-table");
      table.innerHTML = "";
      var column_size = 1;

      var i = 0;
      var sum = 0;
      var tdd = "";
      data.forEach((booking) => {
        var td =
          "<td>\n" +
          '          <div style="align-items: center;justify-content:center;" class="hotel-card">\n' +
          "            <img src=" +
          booking.room.hotel.image +
          ' alt="Hotel" width="300">\n' +
          '            <div class="hotel_content">\n' +
          "              <h2>" +
          booking.room.hotel.name +
          "</h2>\n" +
          "              <p>Check-in/out: <b>" +
          new Date(booking.check_in_date).toLocaleDateString("ru") +
          " - " +
          new Date(booking.check_out_date).toLocaleDateString("ru") +
          "</b></p>\n" +
          "              <p>Total Cost: <b>" +
          booking.total_costs +
          "</b></p>\n" +
          "              <p>Room Type: <b>" +
          booking.room.room_type +
          "</b></p>\n" +
          "<p>Number of Adults<b>:" +
          booking.num_of_adults +
          "</b></p>\n";
        tdd += td;
        i++;
        sum++;
        if (column_size == i || sum == data.length) {
          var newRow = table.insertRow();
          console.log("innerHTML");
          newRow.innerHTML = "<tr>" + tdd + "</tr>";
          tdd = "";
          i = 0;
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

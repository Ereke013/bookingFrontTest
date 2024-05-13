<?php
// Проверяем, был ли отправлен POST-запрос
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $room_type = $_POST["room_type"];
    $checkin = $_POST["checkin"];
    $checkout = $_POST["checkout"];
    $guests = $_POST["guests"];

    // В этом примере просто выводим полученные данные
    echo "Room Type: " . $room_type . "<br>";
    echo "Check-in Date: " . $checkin . "<br>";
    echo "Check-out Date: " . $checkout . "<br>";
    echo "Number of Guests: " . $guests . "<br>";

    // Здесь можно добавить код для сохранения данных в базе данных или отправки их на почту администратору гостиницы и т.д.
} else {
    // Если это не POST-запрос, просто выводим сообщение об ошибке
    echo "Error: This page cannot be accessed directly.";
}
?>
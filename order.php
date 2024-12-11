<?php
$servername = "127.0.0.1:5500";
$username = "Suzuki016"; // Замените на ваше имя пользователя
$password = "54002969F"; // Замените на ваш пароль
$dbname = "phpmyadmin"; // Замените на название вашей базы данных

// Подключение к базе данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получение данных из запроса
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$itemName = $data['itemName'];
$quantity = $data['quantity'];

// SQL-запрос для добавления заказа
$sql = "INSERT INTO food_ordering (user_id, item_name, quantity) VALUES ('$userId', '$itemName', '$quantity')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => 'Заказ успешно добавлен']);
} else {
    echo json_encode(['message' => 'Ошибка: ' . $conn->error]);
}

// Закрытие подключения
$conn->close();

if ($connection->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к базе данных']);
    exit;
}

// ... остальной код ...

if ($connection->query($orderQuery) === TRUE) {
    // Ваш код
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка добавления заказа: ' . $connection->error]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Обработка данных здесь
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
    exit;
}

?>


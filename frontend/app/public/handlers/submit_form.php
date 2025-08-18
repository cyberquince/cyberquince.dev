<?php
header('Content-Type: application/json');

$data = [];
foreach ($_POST as $key => $value) {
    $data[$key] = $value;
}

$filenames = [];
if (!empty($_FILES['attachments'])) {
    foreach ($_FILES['attachments']['name'] as $name) {
        $filenames[] = $name;
    }
}

$response = [
    'status' => 'success',
    'fields' => $data,
    'filenames' => $filenames
];

echo json_encode($response);

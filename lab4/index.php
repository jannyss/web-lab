<?php

$action = isset($_GET['action']) ? $_GET['action'] : "";

switch ($action) {
    default:
        mainPage();
}

function mainPage()
{
    require("templates/main_page.php");
}
<?php

$mysqli = null;
function connectToDB()
{
    $dbport = 3306;
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpassword = 'root';
    $dbname = 'news';

    try {
        $mysqli = new mysqli($dbhost, $dbuser, $dbpassword, $dbname, $dbport);
        return $mysqli;
    } catch (mysqli_sql_exception $e) {
        $e->getMessage();
    }
}
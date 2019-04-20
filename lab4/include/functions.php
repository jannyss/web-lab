<?php
require("config/dbconnect.php");

function fetchArticles()
{
    $mysqli = connectToDB();
    $sql = "SELECT id, title, text, datetime, author FROM news ORDER BY datetime DESC";
    $res = $mysqli->query($sql);
    return $res;
}


function getArticle($article_id)
{
    $mysqli = connectToDB();
    $sql = " SELECT id, title, text, datetime, author FROM news WHERE id = '$article_id'";
    $res = $mysqli->query($sql);
    return $res;
}

function deleteArticle($article_id)
{
    $mysqli = connectToDB();
    $sql = " DELETE FROM news WHERE id = '$article_id'";
    $res = $mysqli->query($sql);
    if ($res === TRUE) return 1;
    else {
        echo $mysqli->error;
        return 0;
    }
}
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
    $sql = "SELECT id, title, text, datetime, author FROM news WHERE id = '$article_id'";
    $res = $mysqli->query($sql);
    return $res;
}

function deleteArticle($article_id, $article_title)
{
    $mysqli = connectToDB();
    $sql = "DELETE FROM news WHERE id = '$article_id'";
    $res = $mysqli->query($sql);
    if ($res === TRUE) {
        return "<b>$article_title</b> was deleted successfully";
    } else {
        echo $mysqli->error;
        return 0;
    }
}

function createArticle($article_title, $article_text, $article_author = null)
{
    $mysqli = connectToDB();
    if (is_null($article_author)) {
        $sql = "INSERT INTO news (title, text) values ('$article_title','$article_text')";
    } else {
        $sql = "INSERT INTO news (title, text, author) values ('$article_title','$article_text','$article_author')";
    }
    $res = $mysqli->query($sql);
    if ($res === TRUE) {
        return "<b>$article_title</b> was created successfully
                <p>One more?</p>";
    } else {
        echo $mysqli->error;
        return 0;
    }
}
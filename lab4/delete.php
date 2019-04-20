<?php
include 'include/functions.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST["article_id"] && $_POST["article_title"]) {
        echo deleteArticle($_POST["article_id"], $_POST["article_title"]);
        echo "<div>
                <a href = 'admin.php'>
                    Go back to admin page
                </a>
              </div>";
    } else {
        echo "No article id or title was received";
    }
} else {
    echo 'Invalid method';
}

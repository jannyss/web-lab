<?php include 'include/functions.php' ?>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST["article_text"] && $_POST["article_title"] && $_POST["article_author"]) {
        echo createArticle($_POST["article_title"], $_POST["article_text"], $_POST["article_author"]);
        echo "<div>
                <a href = 'admin.php'>
                    Go back to admin page
                </a>
              </div>";
    } elseif ($_POST["article_text"] && $_POST["article_title"]) {
        echo createArticle($_POST["article_title"], $_POST["article_text"]);
        echo "<div>
                <a href = 'admin.php'>
                    Go back to admin page
                </a>
              </div>";
    } else {
        echo "Not enough parameters were received";
    }
} else {
    echo '<b>Create new article</b>';
}
?>

<form action="create.php" method="post">
    <p>
    <label for="article_title">Title:</label>
    <input type="text" name="article_title" id="article_title">
    </p>
    <p>
    <label for="article_text">Description:</label>
    <input type="text" name="article_text" id="article_text">
    <p>
    </p>
    <label for="article_author">Author:</label>
    <input type="text" name="article_author" id="article_author">
    </p>
    <button type="submit">Create</button>
</form>

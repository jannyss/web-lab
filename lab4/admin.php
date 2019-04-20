<?php include "include/functions.php" ?>
<?php include "templates/header.php" ?>

    <a href="create.php">Create new article</a>
    <?php
    $articles = fetchArticles();

    while ($row = $articles->fetch_assoc()) {

        $content = "<div>
                         <div>
                            <h3>{$row['title']}</h3>
                            <p>Description: <b>{$row['text']}</b></p>
                            <p>Date and time of creation:<b>{$row['datetime']}</b></p>
                            <p>Author:<b> {$row['author']}</b></p>
                        </div>
                        <form action='delete.php' method='post'>
                            <input type='hidden' value='{$row['id']}' name='article_id'>
                            <input type='hidden' value='{$row['title']}' name='article_title'>
                            <button type='submit'>Delete</button>
                        </form>
                    </div>";
        echo $content;
    }
    ?>

    <?php include "templates/footer.php" ?>

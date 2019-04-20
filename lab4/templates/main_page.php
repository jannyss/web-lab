<?php include "include/functions.php" ?>
<?php include "templates/header.php" ?>
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
                    </div>";
        echo $content;
    }
    ?>
<?php include "templates/footer.php" ?>

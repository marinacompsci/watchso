<?php
include_once("../classes/SORequest.php");
include_once("../classes/Question.php");

$site = "stackoverflow";
$tag = $_GET["tag"];
$req = new SORequest("desc", "activity", "False", 0, "False", $tag, $site);
$questions = $req->sendRequest();

?>

<html>
    <body>
        <ul>
            <?php foreach($questions as $question): ?>
            <li>
                <?= $question->getTitle(); ?>
                <p>Created <?= date("D, j F Y h:i:sA", $question->getCreationDate()); ?> </p>
                <p>Owner's reputation: <?= $question->getOwner(); ?> </p>
                <a href="<?= $question->getLink(); ?>">Answer on Stackoverflow</a>
            </li>
            <?php endforeach; ?>
        </ul>
    </body>

</html>
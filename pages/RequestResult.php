<?php
include_once("../classes/SORequest.php");
include_once("../classes/Question.php");

$site = "stackoverflow";
$tag = $_GET["tag"];
$req = new SORequest("desc", "activity", "False", 0, "False", $tag, $site);
$questions = $req->sendRequest();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <link href="../public/css/normalize.css" rel="stylesheet" type="text/css">
    <link href="../public/css/skeleton.css" rel="stylesheet" type="text/css">
    <link href="../public/css/index.css" rel="stylesheet" type="text/css">
</head>
<body>
<!doctype html>
    <table>
        <thead>
            <tr>
                <th>Question</th>
                <th>Date</th>
                <th>PO's reputation</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach($questions as $question): ?>
            <tr>
                <td>
                    <a target="_blank" href="<?= $question->getLink(); ?>"><?= $question->getTitle(); ?></a>
                </td>
                <td><?= date("D, j F Y h:i:sA", $question->getCreationDate()); ?></td>
                <td><?= $question->getOwner(); ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

</body>
</html>
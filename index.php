<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <link href="public/css/normalize.css" rel="stylesheet" type="text/css">
    <link href="public/css/skeleton.css" rel="stylesheet" type="text/css">
    <link href="public/css/index.css" rel="stylesheet" type="text/css">
    <title>Watch Your Tags</title>
</head>

<body>
    <form action="pages/RequestResult.php" method="GET">
        <label>
            <input type="text" placeholder="Enter a tag" name="tag"/>
        </label>
         <!-- TODO(JS): Check if input is empty -> Show alert -->
        <button type="submit">Search</button>
    </form>
</body>
</html>
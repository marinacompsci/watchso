<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <!--link href="public/css/normalize.css" rel="stylesheet" type="text/css"-->
    <link href="public/css/skeleton.css" rel="stylesheet" type="text/css">
    <link href="public/css/index.css" rel="stylesheet" type="text/css">
    <title>Watch Your Tags</title>
</head>

<body>
    <div class="search row">
        <input type="text" placeholder="Enter a tag" name="tag" id="tag"/>
        <!-- TODO(JS): Check if input is empty -> Show alert -->
        <button type="button" id="submitSearch">Search</button>
    </div>


    <table id="resultsTable">
        <thead>
            <tr>
                <th>Question</th>
                <th>Date</th>
                <th>PO's reputation</th>
            </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>
    <script src="public/js/index.js"></script>
</body>

</html>
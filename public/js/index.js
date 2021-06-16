let table = document.getElementById("resultsTable");
let tableBody = document.getElementById("tableBody");
let submitButton = document.getElementById("submitSearch");
const source = "https://api.stackexchange.com/2.2/search/advanced?";
let tag;

/////////////////////  STARTING POINT //////////////////////////////////////////////////////////////////////
submitButton.onclick = () => {getQuestions();};

document.getElementById("tag").onkeypress = (ev) => {
    if (ev.key === "Enter") {getQuestions();}
};
/////////////////////  FUNCTIONS //////////////////////////////////////////////////////////////////////

function showTableData(questions) {
    //TODO: what if there are no questions?
    console.log("Showing data...");

    if (tableBody.hasChildNodes()) {
        console.log("here")
        /*
        node.childNodes is a live collection.
        As you remove items from it, the collection itself is modified (live while you're iterating).
        Trying to iterate it as you are, causes elements to be removed from the collection and moved down in the
        array-like structure while you're iterating it, causing you to miss nodes.
        As an example, when you call removeChild() on the 2nd element in the collection,
        that element itself is then removed from the collection. That causes what was the 3rd element to be moved
        into the spot in the collection where the 2nd element was. Now, your loop moves on to the 3rd element in the
        collection. But, that will skip over the element that is now in the 2nd position causing you to never remove it.
        That means the only safe way to iterate through the actual collection and remove things is with a backwards
        traversal because removing things form the end does not cause other elements to change their position in the
        collection. Removing items from the front (which is what you were doing) does cause items to move in the collection.
         */
        //tableBody.childNodes.forEach(child => {node.removeChild(child);} DON'T USE IT

        // Array.from() converts the live collection to a static array where items are not removed
        // from the array while deleting items from the DOM.
        Array.from(tableBody.childNodes).forEach((node) => {node.remove()});
        console.log(tableBody.hasChildNodes());
    }

    questions.forEach((question) => {
        // Handle Date always in UTC
        let date = new Date(0).setUTCSeconds(question.creation_date);
        // Sometimes when we do operations on dates they get converted back into a number in JavaScript.
        // We simply must make sure these are converted back to Date before passing them to another function
        // From UTC to user's local time zome -> "toLocaleString()"
        let q = new Question(question.title, new Date(date).toLocaleString().replace(",", "") , question.owner.reputation, question.link);
        //TODO: Refactor this all to a single function called createTableData
        let tr = document.createElement("tr");
        tableBody.appendChild(tr);

        let tdTitle = document.createElement("td");

        let tdTitleAnchor = document.createElement("a");
        tdTitleAnchor.setAttribute('target', "_blank");
        tdTitleAnchor.setAttribute('href', q.link);
        tdTitleAnchor.innerText = q.title
        tdTitle.appendChild(tdTitleAnchor)
        tr.appendChild(tdTitle);

        let tdDate = document.createElement("td");
        tdDate.innerText = q.creation_date;
        tr.appendChild(tdDate);

        let tdOwnerRep = document.createElement("td");
        tdOwnerRep.innerText = q.owner;
        tr.appendChild(tdOwnerRep);
    })

    table.style.display = "block"
}


function getQuestions() {
    console.log("Getting question from API...");
    tag = document.getElementById("tag").value;
    let fullLink = source
        .concat("order=desc&").concat("activity=False&")
        .concat("answers=0&").concat("closed=False&")
        .concat(`tagged=${tag}&`).concat("site=stackoverflow");
    fetch(fullLink)
        .then((res) => {
            res.json()
                .then((questions) => {
                        console.log("API Request done!");
                        showTableData(questions.items);
                })
                .catch((err) => {console.log(err);});
        })
        .catch((err) => {console.log(err);});
}


///////////////////// OBJECTS ////////////////////////////////////////////////////////////////////////////////////

function Question(title, creation_date, owner, link) {
    this.title = title;
    this.creation_date = creation_date;
    this.owner = owner;
    this.link = link;
}
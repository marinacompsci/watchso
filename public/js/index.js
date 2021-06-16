let table = document.getElementById("resultsTable");
let tableBody = document.getElementById("tableBody");
let submitButton = document.getElementById("submitSearch");
let input =  document.getElementById("tag");
let tag = input.value;

const source = "https://api.stackexchange.com/2.2/search/advanced?";

/////////////////////  STARTING POINT //////////////////////////////////////////////////////////////////////
submitButton.onclick = () => {
    getQuestions();
};

input.onkeypress = (ev) => {
    if (ev.key === "Enter") {getQuestions();}
};
/////////////////////  FUNCTIONS //////////////////////////////////////////////////////////////////////

function showTableData(questions) {
    //TODO: what if there are no questions?

    console.log("Showing data...");

    if (tableBody.hasChildNodes()) {
        tableBody.childNodes.forEach((node) => {node.remove()});
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
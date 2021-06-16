let table = document.getElementById("resultsTable");
let tableBody = document.getElementById("tableBody");
let submitButton = document.getElementById("submitSearch");
let tag = document.getElementById("tag").value;

let questions;
const source = "https://api.stackexchange.com/2.2/search/advanced?";

/////////////////////  STARTING POINT //////////////////////////////////////////////////////////////////////
submitButton.onclick = () => {
    getQuestions();
};
/////////////////////  FUNCTIONS //////////////////////////////////////////////////////////////////////

function showTableData(questions) {
    console.log("Showing data...");

    if (tableBody.hasChildNodes()) {
        tableBody.childNodes.forEach((node) => {node.remove()});
    }

    questions.forEach((question) => {
        //TODO: Refactor this all to a single function called createTableData
        let tr = document.createElement("tr");
        tableBody.appendChild(tr);

        let tdTitle = document.createElement("td");

        let tdTitleAnchor = document.createElement("a");
        tdTitleAnchor.setAttribute('target', "_blank");
        tdTitleAnchor.setAttribute('href', question.link);
        tdTitleAnchor.innerText = question.title
        tdTitle.appendChild(tdTitleAnchor)
        tr.appendChild(tdTitle);

        let tdDate = document.createElement("td");
        tdDate.innerText = question.date;
        tr.appendChild(tdDate);

        let tdOwnerRep = document.createElement("td");
        tdOwnerRep.innerText = question.ownersRep;
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

function Question(title, date, owner, link) {
    this.title = title;
    this.date = date;
    this.ownersRep = owner;
    this.link = link;
}
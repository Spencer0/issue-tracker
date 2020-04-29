"use strict";

const buttonClickEvent  = () => {

    //Query to get value from text form
    let user_input = document.getElementById("username-input").value;
    
    //validate and submit
    console.log(user_input);
    let url_string = 'https://api.github.com/users/' + user_input + '/repos';

    //Clear the table
    let table = document.getElementById("repo-table")
    if(table){
        table.innerHTML = '<th>Name</th><th>ID</th><th>Issues Open?</th>'
    }
    //Grab the data from github
    fetch(url_string)
    .then(response => response.json())
    .then(data => cleanData(data));

    
}

document.addEventListener("DOMContentLoaded", function() {
    console.log('adding event listener');
    document.getElementById("github-get-button").addEventListener("click", buttonClickEvent);
});

function cleanData(data){
    data.forEach(function(row){
        loadIssueData(row)
    })
}

function loadIssueData({name, id, open_issues}){
    let table = document.getElementById("repo-table")
    if(!table){
        document.getElementById("github-lookup").innerHTML += "<table class='center' id='repo-table'> \
                                                                <th>Name</th> \
                                                                <th>ID</th> \
                                                                <th>Issues Open?</th><table>";
        table = document.getElementById("repo-table")
    }
    let row = table.insertRow(1); 
    let cellOne = row.insertCell(0);
    let cellTwo = row.insertCell(1);
    let cellThree = row.insertCell(2);
    cellOne.innerHTML = name
    cellTwo.innerHTML = id
    cellThree.innerHTML = open_issues ? "Yes" : "No"
    document.getElementById("github-get-button").addEventListener("click", buttonClickEvent);
}


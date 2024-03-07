function sendMessage() {
    // Retrieve form values
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var contact = document.getElementById('contactInput').value;
    var message = document.getElementById('messageInput').value;

    // Add the message to the table
    var tableBody = document.getElementById('messageTableBody');
    var newRow = tableBody.insertRow();

    // Add cells to the new row
    var nameCell = newRow.insertCell(0);
    var emailCell = newRow.insertCell(1);
    var contactCell = newRow.insertCell(2);
    var messageCell = newRow.insertCell(3);
    var actionCell = newRow.insertCell(4);

    // Set cell values
    nameCell.innerHTML = name;
    emailCell.innerHTML = email;
    contactCell.innerHTML = contact;
    messageCell.innerHTML = message;
    actionCell.innerHTML = '<button onclick="editMessage(this)">Edit</button> <button onclick="deleteMessage(this)">Delete</button>';
}

function editMessage(button) {
    var row = button.parentNode.parentNode;
    var cells = row.cells;

    // Retrieve message data from cells
    var name = cells[0].innerHTML;
    var email = cells[1].innerHTML;
    var contact = cells[2].innerHTML;
    var message = cells[3].innerHTML;

    // Fill form with message data
    document.getElementById('nameInput').value = name;
    document.getElementById('emailInput').value = email;
    document.getElementById('contactInput').value = contact;
    document.getElementById('messageInput').value = message;

    // Remove the row from the table
    row.parentNode.removeChild(row);
}

function deleteMessage(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

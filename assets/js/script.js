
let TotalData=[];
function data() {
    fetch("http://localhost:3000/students")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            TotalData = data;
            console.log("vbd   " + TotalData);
            let tableData = "";
            TotalData.map(values => {
                tableData += `
                <tr>
                    <th scope="row">${values.id}</th>
                    <td>${values.Name}</td>
                    <td>${values.Email}</td>
                    <td>${values.Designation}</td>
                    <td><button class="btn btn-primary" onclick="updateRecord(${values.id})">EDit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteRecord(${values.id})">Delete</button></td>
                </tr>`;
            });
            document.getElementById("table-body").innerHTML = tableData;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function add() {
    // post 

    var id = parseInt($("#empId").val());
    var name = $("#name").val();
    var email = $("#email").val();
    var designation = $("#designation").val();

    console.log(id);
    
    const postData = {
        Id: id,
        Name: name,
        Email: email,
        Designation: designation
    };

    console.log(postData);

    fetch("http://localhost:3000/students", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("response", data);
        data();  // assuming this function is responsible for refreshing data
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteRecord(id) {
    const url = `http://localhost:3000/students/${id}`;

    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Record deleted successfully');
        // Handle any further actions after successful deletion
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function updateRecord(id) {
    let mm = TotalData.find(item => item.id === id);
    console.log("mm ", mm);
 
    $("#name").val(mm.Name);
    $("#email").val(mm.Email);
    $("#designation").val(mm.Designation);
    $("#ubtn").css("display", "block");
    $("#sebtn").css("display", "none");
    $("#uppH").css("display", "block");
    $("#instH").css("display", "none");
    let btn = $("#ubtn");
    btn.on('click', function (event) {
       
        let name = $("#name").val();
        let email = $("#email").val();
        let Des = $("#designation").val();
        if ( name === '' || email === '' || Des === '') {
            alert("Please Fill All Feilds");
        } else {
            let data = { Name: name, Email: email, Designation: Des };
            console.log("Updating data:", data);
            const url = "http://localhost:3000/students";
            fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(updatedData => {
                    console.log("Updated data:", updatedData);
                  
                    $("#name").val('');
                    $("#email").val('');
                    $("#ubtn").hide();
                })
                .catch(error => {
                    alert(error);
                });
        }
    });
}





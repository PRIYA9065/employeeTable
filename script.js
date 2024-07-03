const modalToggleButton = document.getElementById("modal-toggle-btn");
const modal = document.getElementById("modal");
const closeIcon = document.getElementById("close-icon");
const form = document.getElementById("form");
const tableBody = document.querySelector("#employee-list > tbody");


const employees = {};
let inc = 1;
function getNewId() {
    return inc++;
}

//for toggling the form based on user action
function toggleModal() {
    modal.classList.toggle("hide-modal");
    modal.classList.toggle("show-modal");
}


function deleteRecord(e){
    //parent Node of delete button is => td.parentNode => tr
    
    const deleteButton = e.target // <button class="material-icons">delete</button>
    const td = deleteButton.parentNode;
    const tr =td.parentNode;
    tr.remove();
}

function createNewEmployeeRecord(employee){
    // it takes the employee info present in employee object and create a new row inside tbody
    const record = document.createElement("tr");
    //every row get unique id
    record.id = employee.id;
    record.id = employee.id;
    for(let key in employee){
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.appendChild(cell);
    }
    
    /*
    * <td>
    *    <button class="material-icons">edit</button>
    *    <button class="material-icons">delete</button>
    * </td>
    */
   
   const options = document.createElement("td");
   
   const editButton = document.createElement("button");
   editButton.innerText = "edit";
   editButton.className = "material-icons";
   editButton.addEventListener("click", editRecord);
   
   const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.className = "material-icons";
    deleteButton.addEventListener("click", deleteRecord);
    
    options.append(editButton, deleteButton);
    record.appendChild(options);
    
    tableBody.appendChild(record);
}


modalToggleButton.addEventListener("click", toggleModal) 
closeIcon.addEventListener("click", toggleModal)

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const employee = {
        name: form.fullName.value,
        email: form.email.value,
        id: getNewId(),
        role: form.role.value,
        doj: form.doj.value,
        gender: form.gender.value,
    };
    
    employees[employee.id] = employee;

    //create new employee record 
    createNewEmployeeRecord(employee);
    
    //resets the form values after submitting
    form.reset();

    //closes the modal after submiting
    toggleModal();
})
/*
<tr>
<td>1</td>
<td>2</td>
<td>2</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>

*/


//for edit button firstly we have to collect data of that employee and then 
//open the popup with prefilled data and then access to correct the data and upon submission
//of the popup update it with corrected data..

/**
 * Creating hashmap or object of all the employees i.e. having the key as 1 and having all the 
 * information of that employee, but when should we start adding where employee should be global object 
 * 
 * const employees = {
 * "1": {
 *      name:"",
 *      email: "",
 *      gender: "",
 *      role: ""      
 * }
 * } 
 */

const updateModal = document.getElementById("modal1");
const updateForm = document.getElementById("form1");

//this edingEmployeeId holds editing employee's id
let editingEmployeeId = null;


function toggleUpdate(){
    updateModal.classList.toggle("hide-modal");
    updateModal.classList.toggle("show-modal");
}

function prefilledData(employee){
    for(let property in employee){
        updateForm[property] && (updateForm[property].value = employee[property])
    }
}

function editRecord(e){
    const empId = e.target.parentNode.parentNode.id; //<button>edit</button> => td => tr => id of that row
    editingEmployeeId = empId;

    toggleUpdate();
    prefilledData(employees[empId]);
}

updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //collect the updated information from form.
    const updatedInfo = {
        name: updateForm.name.value,
        email: updateForm.email.value,
        id: editingEmployeeId,
        role: updateForm.role.value,
        doj: updateForm.doj.value,
        gender: updateForm.gender.value,
    };

    employees[editingEmployeeId] = updatedInfo;
    
    //before closing the form we have to reset its data
    updateForm.reset();

    //it closes the popup
    toggleUpdate();

    //update the tr with the new data which tr we have to make changes
    let tdCellIndex = 0;
    const record = document.getElementById(editingEmployeeId);
    for(let property in updatedInfo){
        record.children[tdCellIndex++].innerText = updatedInfo[property];
    }
})

//in update form make use of different id's for radio button as it is already given in form 1 
//so that labels are not working while we are clicking on it and it works when we click on radio buttons
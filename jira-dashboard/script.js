const form = document.getElementById("create-task-form");
const modal = document.getElementById("modal");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskStatus = form.status.value; // here we may also use form instead of e.target as e.target is form only

    const taskInfo = {
        title: form.title.value,
        description: form.description.value,
        developer: form.developer.value,
        estimate: form.estimate.value 
    }
    // console.log(taskInfo);

    /**
     * <div class="task-card" title="This is for practice">
                <h3>Chat Box</h3>
                <div>
                    <span class="badge">3 days</span>
                    <span class="image">P</span>
                </div>
            </div>
     */

        //we have to create this kind of an object after sumbmiting the form
        
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.title = taskInfo.description;
    taskCard.innerHTML = `
            <h3>${taskInfo.title}</h3>
                <div>
                    <span class="badge">${taskInfo.estimate} Days</span>
                    <span class="image">${taskInfo.developer[0].toUpperCase()}</span>
                </div>
                `;

        const taskContainer = document.getElementById(taskStatus);
        taskContainer.appendChild(taskCard);            

})

function toggleModal(element) {
    modal.classList.toggle("hide-modal");

    // when hide modal is present the innertext of icon = expand_less else expand_more
    element.innerText = modal.classList.contains("hide-modal") ? "expand_less" : "expand_more";
}
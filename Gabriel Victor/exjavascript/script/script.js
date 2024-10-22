document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.querySelector("input[type='date']");
    
    dateInput.addEventListener("change", function () {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDate(); 

        const selectedDay = document.querySelector("#days .selected");
        if (selectedDay) {
            selectedDay.classList.toggle("selected");
        }

        const dayDiv = document.querySelector(`#days div:nth-child(${day + 3})`);
        if (dayDiv) {
            dayDiv.classList.add("selected");
        }
    });
});

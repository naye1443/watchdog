const ticket_input = document.querySelectorAll('form.ticket-form > input');

const ticket_text = document.getElementById("ticket-text");
const form = document.querySelector(".ticket-form");

// set the the current documnnt object when clicked to save the values returned
const button = document.querySelector(".ticket-submit");
button.addEventListener('click',function(){
    console.log(ticket_input[0].value); //Email
    console.log(ticket_input[1].value); //product DRN
    console.log(ticket_input[2].value); //Title
    console.log(ticket_text.value);     // message

    form.submit();  // submits file to the server
    
});




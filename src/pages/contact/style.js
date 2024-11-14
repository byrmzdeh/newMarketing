document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const contactFormm=document.getElementById('contactFormm')


    contactFormm.addEventListener('submit', function (event) {
        event.preventDefault();

        submitBtn.addEventListener("click", function() {
            window.location.href = '/index.html';
        });
        
    })
    
   

});

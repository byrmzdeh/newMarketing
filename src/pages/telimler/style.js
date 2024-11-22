document.addEventListener('DOMContentLoaded', function () {
    const telimCards = document.getElementById("telimCards");
    const url = '/src/data/telim.json';



    fetch(url)
        .then(res => res.json())
        .then(data => {
            telimCards.innerHTML = data.map(item => {
                return `<div class="telimCard" >
                    <img src="${item.img}" alt="">
                    <div class="cardAbout">
                        <h1>${item.name}</h1>
                        <p>${item.title}</p>
                    </div>
                </div>`;
            }).join('');

            const telimCardElements = document.getElementsByClassName('telimCard');
            const messageForm = document.getElementById('messageForm');
            const closee = document.getElementById('closee');
            const overlay = document.getElementById('overlay');
            const telimForm = document.getElementById('telimForm');

            Array.from(telimCardElements).forEach(card => {
                card.addEventListener('click', function () {
                    messageForm.style.display = 'flex';
                    overlay.style.display = 'block';
                });
            });

            // close düyməsinə click
            closee.addEventListener('click', function (event) {
                event.stopPropagation();
                messageForm.style.display = 'none';
                overlay.style.display = 'none';
            });



            // telimForm submit olunduqda funksiyanı işə salır

            telimForm.addEventListener("submit", function (e) {
                e.preventDefault(); 
                const sendBtn = document.getElementById('sendBtnn');

                sendBtn.addEventListener('click', function (e) {
                    window.location.href = '/index.html';
                });
            });

            messageForm.addEventListener('click', function (event) {
                if (event.target === messageForm) {
                    messageForm.style.display = 'none';
                    overlay.style.display = 'none';
                }
            });
        });


});

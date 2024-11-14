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
            const sendBtn = document.getElementById('sendBtnn');
            const telimForm = document.getElementById('telimForm');
            
            Array.from(telimCardElements).forEach(card => {
                card.addEventListener('click', function() {
                    messageForm.style.display = 'flex';
                    overlay.style.display = 'block';
                });
            });

            // close düyməsinə kliklədikdə popup gizlənir
            closee.addEventListener('click', function (event) {
                event.stopPropagation(); // hadisənin yayılmasını dayandırır
                messageForm.style.display = 'none';
                overlay.style.display = 'none';
            });

            // Göndər düyməsinə kliklədikdə ana səhifəyə yönləndirir
            sendBtn.addEventListener('click', function (e) {
                window.location.href = '/index.html';
            });

            // telimForm submit olunduqda funksiyanı işə salır
            telimForm.addEventListener('submit', function (event) {
                event.preventDefault();
                // Əlavə funksionallıq burada ola bilər
            });

            // messageForm-un boş yerinə klik edildikdə də gizlənir
            messageForm.addEventListener('click', function (event) {
                if (event.target === messageForm) { // yalnız xarici divə klik edilərsə
                    messageForm.style.display = 'none';
                    overlay.style.display = 'none';
                }
            });
        });
});

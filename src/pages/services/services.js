document.addEventListener('DOMContentLoaded',function(){
    const servicesCards = document.getElementById('servicesCards')

fetch("/src/data/services.json")
    .then(res => res.json())
    .then(data => {

        data.forEach(item => {
            const card = document.createElement('div')
            card.classList.add('servicesCard')
            card.setAttribute('data-aos', 'fade-up'); // Set data-aos attribute here
            card.innerHTML = `
             <div data-id=${item.id} >
                <h1>${item.name}</h1>
                <p>${item.title}</p>
                <a class='explore' href="/src/components/servicesDetail/index.html?id=${item.id}">
                    <span>EXPLORE</span>
                    <img src="/src/assets/image/result/right.png" alt="">
                </a>

            </div>
        `
            servicesCards.appendChild(card)

        });

    })
})
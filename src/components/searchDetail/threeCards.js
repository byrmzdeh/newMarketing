document.addEventListener('DOMContentLoaded', function(){
    const apiUrlThree = '/src/data/people.json'
const threeCards = document.getElementById('threeCards')

fetch(apiUrlThree)
    .then(res => res.json())
    .then(data => {
        const lastThreeCard=data.slice(-3)
        lastThreeCard.forEach(item => {
            const oneCard = document.createElement('div')
            oneCard.className = 'threeCard'
            oneCard.innerHTML = `
                    <img class='image' src="${item.img}" alt="err">
                <p class='month'>${item.month}</p>
                <h3 class='name'>${item.name}</h3>
                <a class='read' href="/src/components/searchDetail/index.html?id=${item.id}">
                <span>READ MORE</span>
                    <img src="/src/assets/image/result/right.png" alt="">
                </a>
        `
        threeCards.appendChild(oneCard)

        });
    })
    .catch(error=>console.error('Xeta bas verdi' ,error))

    function goToDetail(id) {
        window.location.href = `src/components/searchDetail/index.html?id=${id}`;
    }
})
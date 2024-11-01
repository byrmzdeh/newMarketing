const servicesCards=document.getElementById('servicesCards')

fetch("/src/data/services.json")
.then(res=>res.json())
.then(data=>{
    data.forEach(item => {
        const servicescard=document.createElement('div')
        card=``
        card.innerHTML=`
        <p>${item.name}</p>
        `
        servicesCards.appendChild(servicescard)
    });

})
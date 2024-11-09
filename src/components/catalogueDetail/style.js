const params = new URLSearchParams(window.location.search);
let id = params.get('id'); // URL-də id parametri varmı?

const catalogueCard = document.getElementById('catalogueCard');
const apiUrl = '/src/data/catalogue.json';

function displayItemDetails(item) {
    catalogueCard.innerHTML = `
        <div class="result-item" data-id="${item.id}">
            <img class='image' src="${item.img}" alt="image not found">
            <div class='about'>
                <p class='month'>${item.location}</p>
                <h1 class='name'>${item.category}</h1>
            </div>
        </div>
    `;
}

// URL-də id parametri yoxdursa, localStorage-də olan id-ni yoxla
if (!id) {
    id = localStorage.getItem('lastViewedIdForCatalogue');
}

// Əgər id varsa, məlumatı çək
if (id) {
    console.log("Axtarılan ID:", id);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Şəbəkə xətası');
            }
            return response.json();
        })
        .then(data => {
            console.log("Yüklənmiş JSON məlumatları:", data);
            // `id` dəyərini `Number` formatında müqayisə edin
            const item = data.find(person => person.id === Number(id));
            if (item) {
                console.log("Tapılan məlumat:", item);
                console.log(id);
                
                displayItemDetails(item);
                localStorage.setItem('lastViewedIdForCatalogue', id);
            } else {
                console.warn("Müvafiq məlumat tapılmadı");
                catalogueCard.textContent = 'Heç bir məlumat tapılmadı';
            }
        })
        .catch(error => {
            console.error('Xəta:', error);
            catalogueCard.textContent = 'Məlumat yüklənərkən xəta baş verdi';
        });
} else {
    console.warn("ID tapılmadı. URL-də və ya localStorage-də id mövcud deyil.");
    catalogueCard.textContent = 'ID tapılmadı, URL parametrində id yoxdu və localStorage boşdur.';
}

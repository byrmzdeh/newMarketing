document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id'); 

    const catalogueCard = document.getElementById('catalogueCard');
    const apiUrl = '/src/data/catalogue.json';

    function displayItemDetails(item) {
        catalogueCard.innerHTML = `
        <div class='catalogueDetail' data-id="${item.id}">

      <div class="result-item">
        <div class='image'>
          <img src="${item.img}" alt="err">
        </div>
        <div class='title'>
          <h1>Marketinq.az</h1>
          <div class="location">
            <img src="${item.locationImg}" alt="err">
            <span>${item.location}</span>
          </div>
          <div class="location">
            <img src="${item.phoneImg}" alt="err">
            <span>${item.phone}</span>
          </div>
          <div class="location">
            <img class='mail' src="${item.mailImg}" alt="err">
            <span>${item.mail}</span>
          </div>
            <div class="location">
              <img src="${item.websiteImg}" alt="err">
              <span>${item.website}</span>
            </div>

        </div>
      </div>

      <div class='desc'>
        <p class='descWrite'>Description</p>
        <p>${item.desc}</p>
        <p class='descWrite'>Category :</p>
        <button class="categoryBtn">
          <p>${item.category}</p>
        </button>
      </div>

    </div>
    `;
    }

    if (!id) {
        id = localStorage.getItem('lastViewedIdForCatalogue');
    }

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
            });
    } else {
        console.warn("ID tapılmadı. URL-də və ya localStorage-də id mövcud deyil.");
        catalogueCard.textContent = 'ID tapılmadı, URL parametrində id yoxdu və localStorage boşdur.';
    }

})
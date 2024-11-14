document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    const categoryBtn = document.getElementById('categoryBtn')

    const portfolioDetailCards = document.getElementById('portfolioDetailCards');
    const apiUrl = '/src/data/portfolio.json';

    function displayItemDetails(item) {
        portfolioDetailCards.innerHTML = `
        <div class='detailCard' data-id="${item.id}">

          <img data-aos='fade-up' src="/src/assets/image/portfolio/img1.png" alt="err">
          <img data-aos='fade-up' src="/src/assets/image/portfolio/img2.png" alt="err">
          <img data-aos='fade-up' src="/src/assets/image/portfolio/img3.png" alt="err">
          <img data-aos='fade-up' src="/src/assets/image/portfolio/img4.png" alt="err">
          <img data-aos='fade-up' src="/src/assets/image/portfolio/img5.png" alt="err">
          <img data-aos='fade-up' src="/src/assets/image/portfolio/img6.png" alt="err">


    </div>
    `;
    }

    

    function category(item) {
        categoryBtn.innerHTML = `
<button  data-aos="fade-up">
    <p>Branding</p>
</button>

          <button id="category"  data-aos="fade-up">
    <p>${item.category}</p>
</button>
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
                    category(item)
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
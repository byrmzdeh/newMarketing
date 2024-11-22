document.addEventListener('DOMContentLoaded', function () {
    const catalogueCategories = document.getElementById('catalogueCategories');

    const url = '/src/data/categories.json';

    fetch(url)
        .then((res) => res.json())
        .then(data => {
            catalogueCategories.innerHTML = data.map(item => {
                return `<div class="catagoryName" data-id=${item.id}>
                    <a href="/src/pages/catalogue/index.html">
                        <p>${item.name}</p>
                        <img src="${item.img}" alt="">
                    </a>
                </div>`;
            }).join('');
        });
});

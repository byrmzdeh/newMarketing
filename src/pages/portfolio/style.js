document.addEventListener("DOMContentLoaded", function () {
    const businessCards = document.getElementById('portfolioCards');
    const cardsPerPage = 6;
    let currentPage = 1;
    let pages;
    let allData = [];
    let filteredData = [];
    let selectedCategory = 'All';

    // Seçilmiş kateqoriya və səhifəyə əsasən kartları göstərmək
    function displayCards(data, page) {
        businessCards.innerHTML = "";
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const currentCards = data.slice(start, end);

        currentCards.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
            <div data-id="${item.id}" data-aos="fade-up">
                <a class="portfolioCard" href="/src/components/portfolioDetail/index.html?id=${item.id}">
                    <img class="cardImg" src="${item.img}" alt="err">
                    <div class="text"> 
                    <p>${item.name}</p>
                    <h1>${item.title}</h1>
                    </div>
                </a>
            </div>
            `;
            businessCards.appendChild(card);
        });
    }

    // Pagination
    function createPagination(pages, page) {
        let str = "<ul class='pagination'>";
        let active;
        let pageCutLow = page - 1;
        let pageCutHigh = page + 1;

        if (pages < 5) {
            for (let p = 1; p <= pages; p++) {
                active = page === p ? "active" : "";
                str += `<li class="page-item ${active}"><a href="javascript:void(0)" onclick="changePage(${p})">${p}</a></li>`;
            }
        } else {
            if (page > 2) {
                str += `<li class="page-item"><a href="javascript:void(0)" onclick="changePage(1)">1</a></li>`;
                if (page > 3) str += `<li class="page-item disabled"><span>...</span></li>`;
            }

            if (page === 1) pageCutHigh += 2;
            else if (page === 2) pageCutHigh += 1;
            if (page === pages) pageCutLow -= 2;
            else if (page === pages - 1) pageCutLow -= 1;

            for (let p = pageCutLow; p <= pageCutHigh; p++) {
                if (p <= 0) p = 1;
                if (p > pages) continue;
                active = page === p ? "active" : "";
                str += `<li class="page-item ${active}"><a href="javascript:void(0)" onclick="changePage(${p})">${p}</a></li>`;
            }

            if (page < pages - 1) {
                if (page < pages - 2) str += `<li class="page-item disabled"><span>...</span></li>`;
                str += `<li class="page-item"><a href="javascript:void(0)" onclick="changePage(${pages})">${pages}</a></li>`;
            }
        }

        if (page < pages) {
            str += `<li class="page-item next"><a href="javascript:void(0)" onclick="changePage(${page + 1})">&raquo;</a></li>`;
        }
        str += "</ul>";
        document.getElementById("pagination").innerHTML = str;
    }

    // Cari səhifəni dəyişmək və göstərilən məlumatları yeniləmək
    window.changePage = function (page) {
        if (page < 1 || page > pages) return;
        currentPage = page;
        displayCards(filteredData, currentPage);
        createPagination(pages, currentPage);
    };

    // Seçilmiş kateqoriya üzrə kartları filtrləmək
    window.filterCards = function (category) {
        selectedCategory = category;
        currentPage = 1;

        const buttons = document.querySelectorAll('.category-button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });

        if (category === 'All') {
            buttons[0].classList.add('active');
        } else {
            buttons.forEach(button => {
                if (button.getAttribute('data-category') === category) {
                    button.classList.add('active');
                }
            });
        }

        if (category === 'All') {
            filteredData = allData;
        } else {
            filteredData = allData.filter(item => item.category === category);
        }

        pages = Math.ceil(filteredData.length / cardsPerPage);
        displayCards(filteredData, currentPage);
        createPagination(pages, currentPage);
    }

    // Select elementinə əsasən filtrləmə funksiyası
    document.getElementById('categorySelect').addEventListener('change', function () {
        const selectedCategory = this.value;
        filterCards(selectedCategory);
    });

    // JSON faylından məlumatları götürüb səhifəni başlatmaq
    function fetchDataAndDisplay() {
        fetch('/src/data/portfolio.json')
            .then(res => res.json())
            .then(data => {
                allData = data;
                filterCards(selectedCategory);
            })
            .catch(error => console.error('Məlumatları götürərkən səhv baş verdi:', error));
    }

    fetchDataAndDisplay();

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', function () {
            const category = button.getAttribute('data-category');
            filterCards(category);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const businessCards = document.getElementById('blogCards');
    const cardsPerPage = 6;
    let currentPage = 1;
    let pages; 
    let allData = []; 
    let filteredData = []; 
    let selectedCategory = 'All'; 

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
                <div class="result-item" data-id="${item.id}">
                    <img class='image' src="${item.img}" alt="err">
                    <div class='result-about'>
                        <p class='month'>${item.month}</p>
                        <h1 class='name'>${item.name}</h1>
                        <p>${item.title}</p>
                        <a class='read' href="/src/components/searchDetail/index.html?id=${item.id}">
                            <span>READ MORE</span>
                            <img src="/src/assets/image/result/right.png" alt="">
                        </a>
                    </div>
                </div>
            `;
            businessCards.appendChild(card);
        });
    }

    function createPagination(pages, page) {
        let str = "<ul>";
        let active;
        let pageCutLow = page - 1;
        let pageCutHigh = page + 1;

        if (pages < 5) {
            for (let p = 1; p <= pages; p++) {
                active = page == p ? "active" : "no";
                str += `<li class="${active}"><a onclick="changePage(${p})">${p}</a></li>`;
            }
        } else {
            if (page > 2) {
                str += `<li class="no page-item"><a onclick="changePage(1)">1</a></li>`;
                if (page > 3) str += `<li class="out-of-range">...</li>`;
            }

            if (page === 1) pageCutHigh += 2;
            else if (page === 2) pageCutHigh += 1;
            if (page === pages) pageCutLow -= 2;
            else if (page === pages - 1) pageCutLow -= 1;

            for (let p = pageCutLow; p <= pageCutHigh; p++) {
                if (p === 0) p += 1;
                if (p > pages) continue;
                active = page == p ? "active" : "no";
                str += `<li class="page-item ${active}"><a onclick="changePage(${p})">${p}</a></li>`;
            }

            if (page < pages - 1) {
                if (page < pages - 2) str += `<li class="out-of-range">...</li>`;
                str += `<li class="page-item no"><a onclick="changePage(${pages})">${pages}</a></li>`;
            }
        }

        if (page < pages) {
            str += `<li class="page-item next no"><a onclick="changePage(${page + 1})"><img src="/src/assets/image/business/right.png"/></a></li>`;
        }
        str += "</ul>";
        document.getElementById("pagination").innerHTML = str;
    }

    window.changePage = function (page) {
        currentPage = page;
        displayCards(filteredData, currentPage);
        createPagination(pages, currentPage);
    };

    function filterCards() {
        const category = document.querySelector('#categorySelect').value; 
        currentPage = 1;

        if (category === 'All') {
            filteredData = allData;
        } else {
            filteredData = allData.filter(item => item.category === category);
        }

        pages = Math.ceil(filteredData.length / cardsPerPage);
        displayCards(filteredData, currentPage);
        createPagination(pages, currentPage);
        updateActiveButton(category);
    }

    function filterByButton(category) {
        selectedCategory = category;
        currentPage = 1; 

        if (category === 'All') {
            filteredData = allData;
        } else {
            filteredData = allData.filter(item => item.category === category);
        }

        pages = Math.ceil(filteredData.length / cardsPerPage);
        displayCards(filteredData, currentPage);
        createPagination(pages, currentPage);

        updateActiveButton(category);
    }

    function updateActiveButton(category) {
        const buttons = document.querySelectorAll('.buttons button');
        buttons.forEach(button => {
            if (button.textContent.trim() === category) {
                button.classList.add('active'); 
            } else {
                button.classList.remove('active');
            }
        });
    }

    function fetchDataAndDisplay() {
        fetch('/src/data/people.json')
            .then(res => res.json())
            .then(data => {
                allData = data; 
                filteredData = data; 
                pages = Math.ceil(filteredData.length / cardsPerPage); 
                displayCards(filteredData, currentPage); 
                createPagination(pages, currentPage); 
                updateActiveButton('All');
            })
            .catch(error => console.error('Məlumatları əldə edərkən səhv:', error));
    }

    fetchDataAndDisplay();

    document.querySelector('#categorySelect').addEventListener('change', filterCards);

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', function () {
            const category = button.textContent.trim();
            filterByButton(category);
        });
    });
});

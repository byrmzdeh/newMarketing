document.addEventListener("DOMContentLoaded", function () {
    const businessCards = document.getElementById('businessCards');
    const cardsPerPage = 6;
    let currentPage = 1;
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
          <a href="https://www.youtube.com/">
              <div class="play" data-aos="fade-up">
                  <img class='cardImg' src="${item.img}" alt="err">
                      <img class="youtube" src="/src/assets/image/business/youtube.png" alt="err">
              </div>
              <div class="write">
              <p class='month'>${item.month}</p>
              <h1>${item.name}</h1>

              </div>
                                </a>

          `;
            businessCards.appendChild(card);
        });
    }

    // Səhifələmə yaratma
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


    window.filterCards = function () {
        const category = document.querySelector('#categorySelect').value;
        currentPage = 1;

        const select = document.querySelector('#categorySelect');

        if (category === 'All') {
            filteredData = allData;
        } else {
            filteredData = allData.filter(item => item.category === category);
        }

        pages = Math.ceil(filteredData.length / cardsPerPage);
        displayCards(filteredData, currentPage);
        createPagination(pages, currentPage);
    };

    document.querySelector('#categorySelect').addEventListener('change', filterCards);

    filterCards();


    window.filterCards = function (category) {
        selectedCategory = category;
        currentPage = 1;

        const buttons = document.querySelectorAll('.buttons button');
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

    // Məlumatları gətir və ekranı başlat
    function fetchDataAndDisplay() {
        fetch('/src/data/business.json')
            .then(res => res.json())
            .then(data => {
                allData = data;
                filterCards(selectedCategory);
            })
            .catch(error => console.error('Məlumatları əldə edərkən səhv:', error));
    }

    fetchDataAndDisplay();

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', function () {
            const category = button.getAttribute('data-category');
            filterCards(category);
        });
    });

});

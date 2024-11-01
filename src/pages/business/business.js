const businessCards = document.getElementById('businessCards');
const cardsPerPage = 6; // Səhifə başına kart sayı
let currentPage = 1;
let pages; // Ümumi səhifə sayı
let allData = []; // Bütün kart məlumatlarını saxlayır
let filteredData = []; // Kateqoriyaya görə süzülmüş məlumatları saxlayır
let selectedCategory = 'All'; // Defolt kateqoriya

// Seçilmiş kateqoriya və səhifəyə əsasən kartları göstərin
function displayCards(data, page) {
  businessCards.innerHTML = ""; // Mövcud kartları təmizlə
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const currentCards = data.slice(start, end);

  currentCards.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
       <div class="play" data-aos="fade-up">
                <img src="${item.img}" alt="err">
                <a href="https://www.youtube.com/"> <img class="youtube" src="/src/assets/image/business/youtube.png"
                        alt="err"></a>
            </div>
      <p class='month'>${item.month}</p>
      <h1>${item.name}</h1>
      <p>${item.category}</p>
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

// Səhifəni dəyiş və ekranı yenilə
function changePage(page) {
  currentPage = page;
  displayCards(filteredData, currentPage);
  createPagination(pages, currentPage);
}

// Seçilmiş kateqoriyaya görə kartları süz
function filterCards(category) {
  selectedCategory = category;
  currentPage = 1; // Kateqoriya dəyişikliyində ilk səhifəyə sıfırla

  // Bütün düymələrin aktivlik sinifini təmizlə
  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach(button => {
    button.classList.remove('active'); // Bütün düymələrdən 'active' sinifini sil
  });

  // Seçilmiş kateqoriyaya görə 'active' sinfini əlavə et
  if (category === 'All') {
    buttons[0].classList.add('active'); // 'All' düyməsi aktivdir
  } else {
    buttons.forEach(button => {
      if (button.textContent === category) {
        button.classList.add('active'); // Seçilmiş kateqoriya üçün aktiv sinifi əlavə et
      }
    });
  }

  if (category === 'All') {
    filteredData = allData;
  } else {
    filteredData = allData.filter(item => item.category === category);
  }

  pages = Math.ceil(filteredData.length / cardsPerPage); // Səhifə sayını yenilə
  displayCards(filteredData, currentPage); // Süzülmüş kartları göstər
  createPagination(pages, currentPage); // Səhifələmə yenilə
}


// Məlumatları gətir və ekranı başlat
function fetchDataAndDisplay() {
  fetch('/src/data/business.json')
    .then(res => res.json())
    .then(data => {
      allData = data; // Gələcək süzgə üçün bütün məlumatları saxla
      filterCards(selectedCategory); // Defolt kateqoriya ilə ilkin ekran
    })
    .catch(error => console.error('Məlumatları əldə edərkən səhv:', error));
}

// Məlumatları ilkin olaraq gətir və göstər
fetchDataAndDisplay();

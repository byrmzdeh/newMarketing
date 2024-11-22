//menu
const menuBtn = document.getElementById('menu')
const show = document.getElementById('show')
const closeBtn = document.getElementById('close')
menuBtn.addEventListener('click', function () {
    console.log('clicked');
    show.style.display = 'block';

})
closeBtn.addEventListener('click', function () {
    show.style.display = 'none'

})

///search
const search = document.getElementById('search');
const searchShow = document.getElementById('search-show');
const inputClose = document.getElementById('inputClose');
const searchInput = document.getElementById('search-input');
const result = document.getElementById('results');
const value = document.getElementById('value');
const itemDiv = document.getElementById("item-divSearch")
value.style.display = 'none';
itemDiv.style.display = 'none'



inputClose.addEventListener('click', function () {
    searchShow.style.display = 'none';
});

search.addEventListener('click', function () {
    searchShow.style.display = 'block';
    searchInput.focus();
    result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
});

searchInput.addEventListener('input', function () {
    const inputValue = searchInput.value.trim(); 
    if (inputValue) {
        itemDiv.style.display = 'block';
        value.style.display = 'block';
        value.style.textAlign = 'center'
        value.innerHTML = `Search result for : "${inputValue}"`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Şəbəkə xətası');
                }
                return response.json();
            })
            .then(data => {
                const filteredResults = data.filter(item =>
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                );
                displayResults(filteredResults);
            })
            .catch(error => {
                console.error('Xəta:', error);
                result.innerHTML = 'Axtarış zamanı xəta baş verdi';
            });
    } else {
        itemDiv.style.display = 'none'
        value.style.display = 'none';
        result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
    }
});

function displayResults(data) {
    result.innerHTML = '';
    const searchCards = document.createElement('div');
    searchCards.classList.add('searchCards');

    if (data.length === 0) {
        result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';

        return;
    }

    const limitedResults = data.slice(0, 3);
    let cardContent = '';

    limitedResults.forEach(item => {
        cardContent += `
            <div class="result-item card"  data-id="${item.id}">
                <img class='image' src="${item.img}" alt="err">
                <p class='month'>${item.month}</p>
                <h3 class='name'>${item.name}</h3>
                <a class='read' href="/src/components/searchDetail/index.html?id=${item.id}">
                <span>READ MORE</span>
                    <img src="/src/assets/image/result/right.png" alt="">
                </a>
            </div>
        `;
    });

    searchCards.innerHTML = cardContent; 
    result.appendChild(searchCards); 
    const readMoreLinks = document.querySelectorAll('.read');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    if (data.length > 3) {
        const seeAllButton = document.createElement('button');
        seeAllButton.textContent = 'SEE MORE';
        seeAllButton.id = 'see-all';
        result.appendChild(seeAllButton); 

        seeAllButton.addEventListener('click', () => {
            window.location.href = '/src/pages/result/index.html';
        });
    }
}





//detail
const itemName = document.getElementById('item-name');
const itemMonth = document.getElementById('item-month');
const itemImage = document.getElementById('item-image');
const itemMore1 = document.getElementById('item-more1');
const itemMore2 = document.getElementById('item-more2');
const itemMore3 = document.getElementById('item-more3');
const itemMore4 = document.getElementById('item-more4');
const itemMore5 = document.getElementById('item-more5');
const itemMore6 = document.getElementById('item-more6');
const itemMore7 = document.getElementById('item-more7');
const itemAddImg = document.getElementById('item-addImage');

const apiUrl = '/src/data/people.json';

// URL-dən id-ni oxuyur
const params = new URLSearchParams(window.location.search);
let id = params.get('id');

// Məlumatları göstərmək üçün funksiya
function displayItemDetails(item) {
    itemName.textContent = item.name;
    itemMonth.textContent = item.month;
    itemImage.setAttribute('src', item.img);
    itemMore1.textContent = item.more1;
    itemMore2.textContent = item.more2;
    itemMore3.textContent = item.more3;
    itemMore4.textContent = item.more4;
    itemMore5.textContent = item.more5;
    itemMore6.textContent = item.more6;
    itemMore7.textContent = item.more7;
    itemAddImg.setAttribute('src', item.img1);
}

if (!id) {
    id = localStorage.getItem('lastViewedId');
}

if (id) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Şəbəkə xətası');
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(person => person.id === id);
            if (item) {
                displayItemDetails(item);
                localStorage.setItem('lastViewedId', id);
            } else {
                itemName.textContent = 'Heç bir məlumat tapılmadı';
            }
        })
        .catch(error => {
            console.error('Xəta:', error);
            itemName.textContent = 'Məlumat yüklənərkən xəta baş verdi';
        });
} else {
    itemName.textContent = 'Heç bir məlumat tapılmadı';
}




// Səhifə məlumatını müəyyən edir
const currentPage = document.body.getAttribute('data-page');

function initModal() {
    const modal = document.getElementById("modal");
    const hireUsButton = document.getElementById("hireUsButton");
    const closeModal = document.getElementById("closeModal");
    const thankModal = document.getElementById("thankModal");
    const closeThankModal = document.getElementById("closeThankModal");

    if (hireUsButton) {
        hireUsButton.onclick = function () {
            modal.style.display = "flex";
        };
    }

    if (closeModal) {
        closeModal.onclick = function () {
            modal.style.display = "none";
        };
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    if (closeThankModal) {
        closeThankModal.onclick = function () {
            thankModal.style.display = "none";
            window.location.href = '/index.html'
        };
    }

    window.onload = function () {
        if (thankModal) {
            thankModal.style.display = "none";
        }
    };
}

// Tab keçid funksiyaları
function initTabs() {
    const tabAddCompany = document.getElementById("tabAddCompany");
    const tabContact = document.getElementById("tabContact");
    const addCompanyContent = document.getElementById("addCompanyContent");
    const contactContent = document.getElementById("contactContent");

    if (tabAddCompany && tabContact) {
        tabAddCompany.onclick = function () {
            addCompanyContent.style.display = "block";
            contactContent.style.display = "none";
            tabAddCompany.classList.add("active");
            tabContact.classList.remove("active");
        };

        tabContact.onclick = function () {
            addCompanyContent.style.display = "none";
            contactContent.style.display = "block";
            tabContact.classList.add("active");
            tabAddCompany.classList.remove("active");
        };
    }
}

// Form göndərmə funksiyaları
function initForms() {
    const addCompanyForm = document.getElementById("addCompanyForm");
    const contactForm = document.getElementById("contactForm");
    const thankModal = document.getElementById("thankModal");
    const overlayThank = document.getElementById("overlayThank");


    if (addCompanyForm) {
        addCompanyForm.onsubmit = function (event) {
            event.preventDefault(); 
            document.getElementById("modal").style.display = "none";
            overlayThank.style.display = 'block';
            thankModal.style.display = "flex";
        };
    }

    if (contactForm) {
        contactForm.onsubmit = function (event) {
            event.preventDefault(); 
            document.getElementById("modal").style.display = "none";
            overlayThank.style.display = 'block';
            thankModal.style.display = "flex"; 
        };
    }
}

// Hər səhifə üçün funksiyaları yalnız lazım olduğu səhifədə çağırırıq
if (currentPage === "home") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "about") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "blog") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "business") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "catalogue") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "contact") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "partners") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "podcast") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "portfolio") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "services") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "telim") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "terms") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "searchDetail") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "catalogueDetail") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "servicesDetail") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "catalogueCategories") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "servicesDetail") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "design") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "result") {
    initModal();
    initTabs();
    initForms();
} else if (currentPage === "portfolioDetail") {
    initModal();
    initTabs();
    initForms();
}

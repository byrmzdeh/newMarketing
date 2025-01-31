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


//language Button
const selectButtons = document.querySelectorAll('#select-buttons button')
let activeButton = document.querySelector('#select-buttons button.active')
selectButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (activeButton) {
            activeButton.classList.remove('active')
        }

        button.classList.add('active')
        activeButton = button

    })
})

//select option
const dropdown = document.querySelector(".dropdown");
const dropdownButton = document.querySelector(".dropdown-button");
const dropdownText = document.querySelector(".dropdown-text");
const dropdownMenu = document.querySelector(".dropdown-menu");

let currentText = "En";

dropdownButton.addEventListener("click", () => {
    dropdown.classList.toggle("open");
});

dropdownMenu.addEventListener("click", (event) => {
    const clickedItem = event.target;

    if (clickedItem.tagName === "LI") {
        const newText = clickedItem.textContent;
        dropdownText.textContent = newText;

        const newListItem = document.createElement("li");
        newListItem.textContent = currentText;
        newListItem.setAttribute("data-value", currentText);

        currentText = newText;
        clickedItem.remove();
        dropdownMenu.appendChild(newListItem);
        dropdown.classList.remove("open");
    }
});

document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
    }
});



//animation
const words = ["Marketinq.", "Rəqəmsal."];
let index = 0;

const textElements = document.querySelectorAll("#animatedText span");
textElements[index].classList.add("visible");

setInterval(() => {
    const textElement = textElements[index];
    index = (index + 1) % words.length; // Yeni sözə keçid

    // Köhnə sözü gizlət
    textElement.classList.remove("visible");

    const nextElement = textElements[index];
    nextElement.classList.add("visible");

}, 1955);


//stickyButton
document.addEventListener("scroll", function () {
    const one = document.querySelector(".one");
    const button = document.querySelector(".stickyButton");

    const oneBottom = one.getBoundingClientRect().bottom;

    if (oneBottom < 0) {
        button.classList.add("stickyButtonShow");
    } else {
        button.classList.remove("stickyButtonShow");
    }
});



// İkona tıklandığında sayfanın başına git
document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



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
const apiUrl = '/src/data/people.json';

// Axtarış panelini göstər və input sahəsini fokusla
search.addEventListener('click', function () {
    searchShow.style.display = 'block';
    searchInput.focus();
    result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
});

inputClose.addEventListener('click', function () {
    searchShow.style.display = 'none';
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

    // İlk 3 nəticəni göstər
    const limitedResults = data.slice(0, 3);
    let cardContent = '';

    limitedResults.forEach(item => {
        cardContent += `
            <div class="result-item card" data-id="${item.id}">
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


//Modall
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("exampleModal");
    const openModalButton = document.getElementById("gradButton");
    const closeModalButton = document.getElementById("btnClose");
    const form = document.getElementById("myForm");
    const sifarisBtn = document.getElementById('sifarisBtn')

    openModalButton.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });



    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll('input');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
            }
        });

        if (allFilled) {
            this.classList.add('was-validated');
            console.log("Form gönderildi!");
        } else {
            alert("Lütfen tüm alanları doldurun.");
        }
    });

    document.getElementById("validationCustom02").addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});


//PartnersSlide
const SliderCards = document.getElementById('SliderCards')
fetch('/src/data/business.json')
    .then(res => res.json())
    .then(data => {
        SliderCards.innerHTML = data.map(item => `
          <swiper-slide >
        <div class="swiperCard" >
        <a href="https://www.youtube.com/">
          <div class="play" >
            <img class='cardImg' src="${item.img}" alt="err">
             <img class="youtube" src="/src/assets/image/business/youtube.png"
                alt="err">
          </div>
          <div class="text">
          <p class='month'>${item.month}</p>
          <h1>${item.name}</h1>
          </div>
          </a>
        </div>
      </swiper-slide>

    `).join('')
    })

    .catch(error => console.error('Error fetching data:', error));




//two Section
const twoSLiderCards = document.getElementById('twoSLiderCards')
fetch('/src/data/services.json')
    .then(res => res.json())
    .then(data => {
        twoSLiderCards.innerHTML = data.map(item => `
    <swiper-slide class="twoCard"  data-id=${item.id}>
          <p class='brand'>${item.name}</p>
          <p class='title'>${item.title}</p>
    <a class='explore' href="/src/components/servicesDetail/index.html?id=${item.id}">
        <span>EXPLORE</span>
        <img src="/src/assets/image/result/right.png" alt="">
    </a>
        </swiper-slide>
    
    `).join('')
    })

    .catch(error => console.error('Error fetching data:', error));



//Counter
function animateCounter(counterElement, targetNumber, duration) {
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentNumber = Math.min((progress / duration) * targetNumber, targetNumber);

        counterElement.textContent = Math.floor(currentNumber) + "+";

        if (currentNumber < targetNumber) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const targetNumber = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        animateCounter(counter, targetNumber, duration);
    });
});



//four Section
const fourSliderCards = document.getElementById('fourSliderCards')
fetch('/src/data/portfolio.json')
    .then(res => res.json())
    .then(data => {
        fourSliderCards.innerHTML = data.map(item => `

        <swiper-slide class="fourCard" >
            <a href="/src/components/portfolioDetail/index.html?id=${item.id}"> <img src="${item.img}" alt="err">
        <p>${item.name}</p>
        <p class='title'>${item.title}</p></a>
      </swiper-slide>
    
    `).join('')
    })

    .catch(error => console.error('Error fetching data:', error));





//modal hireUs
const hireUsButton = document.getElementById("hireUsButton");
const hireUsButtonn = document.getElementById("hireUsButtonn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const tabAddCompany = document.getElementById("tabAddCompany");
const tabContact = document.getElementById("tabContact");
const addCompanyContent = document.getElementById("addCompanyContent");
const contactContent = document.getElementById("contactContent");
const addCompanyForm = document.getElementById("addCompanyForm");
const contactForm = document.getElementById("contactForm");

const send = document.getElementById('send')
const thankModal = document.getElementById("thankModal");
const overlayThank = document.getElementById("overlayThank");
const closeThankModal = document.getElementById("closeThankModal");

hireUsButton.onclick = function () {
    modal.style.display = "flex";
};

hireUsButtonn.onclick = function () {
    modal.style.display = "flex";
};


closeModal.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Tab keçidləri funksiyası
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

const tabs = document.querySelectorAll('.tabs span');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
})

// Formların göndərilmə funksiyası
addCompanyForm.onsubmit = function (event) {
    event.preventDefault();
    modal.style.display = "none";
    thankModal.style.display = "flex";
    overlayThank.style.display = 'block'
};

contactForm.onsubmit = function (event) {
    event.preventDefault();
    modal.style.display = "none";
    thankModal.style.display = "flex";
    overlayThank.style.display = 'block'

};

window.onload = function () {
    thankModal.style.display = "none";
};




// Teşekkür modaldaki "X" düyməsi
closeThankModal.onclick = function () {
    thankModal.style.display = "none";
    overlayThank.style.display = 'none'

};


//podcast
function selectOption(currentStep, nextStepId) {
    document.getElementById(`step-${currentStep}`).classList.add("active");
    document.getElementById(nextStepId).classList.add("active");
    const checkboxes = document.querySelectorAll(`#step-${currentStep} .option input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    event.target.checked = true;
}


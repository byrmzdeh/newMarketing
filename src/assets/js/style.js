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

//animation
const words = ["Marketinq.", "Rəqamsal."]; // Dəyişən sözlər
let index = 0;

setInterval(() => {
  const textElement = document.querySelector("#animatedText span");
  index = (index + 1) % words.length; // Sözləri dövr etməyə imkan verir
  textElement.textContent = words[index];
}, 1500); // 2 saniyədən bir dəyişir

//stickyButton



document.addEventListener("scroll", function () {
  const one = document.querySelector(".one");
  const button = document.querySelector(".stickyButton");

  // .one elementinin alt sərhədini tapırıq
  const oneBottom = one.getBoundingClientRect().bottom;

  // Əgər .one elementinin alt sərhədi ekranın yuxarı hissəsindən keçibsə
  if (oneBottom < 0) {
    button.classList.add("stickyButtonShow"); // Görünən vəziyyət
  } else {
    button.classList.remove("stickyButtonShow"); // Gizli vəziyyət
  }
});

///search
const search = document.getElementById('search');
const searchShow = document.getElementById('search-show');
const inputClose = document.getElementById('inputClose');
const searchInput = document.getElementById('search-input');
const result = document.getElementById('results');
const value = document.getElementById('value');
const itemDiv=document.getElementById("item-divSearch")

value.style.display = 'none';
itemDiv.style.display='none'
const apiUrl = '/src/data/people.json';

// Axtarış panelini göstər və input sahəsini fokusla
search.addEventListener('click', function () {
    searchShow.style.display = 'block';
    searchInput.focus();
    result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
});

// Axtarış panelini bağla
inputClose.addEventListener('click', function () {
    searchShow.style.display = 'none';
});

// Input dəyəri dəyişdikdə işləyən funksionallıq
searchInput.addEventListener('input', function () {
    const inputValue = searchInput.value.trim(); // Input dəyərini oxu
    if (inputValue) {
        // Mesajı göstər
        itemDiv.style.display='block';
        value.style.display = 'block';
        value.style.textAlign='center'
        value.innerHTML = `Search result for : "${inputValue}"`;
        
        // Axtarış nəticələrini API-dən gətir
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Şəbəkə xətası');
                }
                return response.json();
            })
            .then(data => {
                // Nəticələri süz
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
        // Mesajı və nəticələri gizlət
        itemDiv.style.display='none'
        value.style.display = 'none';
        result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
    }
});

// Nəticələri göstərən funksionallıq
function displayResults(data) {
    result.innerHTML = ''; // Əvvəlki nəticələri təmizlə

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

    searchCards.innerHTML = cardContent; // Kart məzmununu əlavə et
    result.appendChild(searchCards); // Nəticələri göstər

    // "See All" düyməsini əlavə et, əgər 3-dən çox nəticə varsa
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
    // Modal ve form elemanları
    const modal = document.getElementById("exampleModal");
    const openModalButton = document.getElementById("gradButton");
    const closeModalButton = document.getElementById("btnClose");
    const form = document.getElementById("myForm"); // Formu seç
    const sifarisBtn = document.getElementById('sifarisBtn')

    // Modalı aç
    openModalButton.addEventListener("click", () => {
        modal.style.display = "flex"; // Modalı açmak için display: flex kullanılıyor
    });

    // Modalı kapatma
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none"; // Modalı kapatmak için display: none kullanılıyor
    });

    // Modal dışına tıklanması durumunda modalı kapatma
    window.addEventListener("click", (event) => {
        if (event.target === modal) { // Eğer tıklanan modalın kendisi ise
            modal.style.display = "none"; // Modalı kapat
        }
    });



    // Formun gönderilmesini engellemek için
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Form gönderiminde sayfanın yenilenmesini engelle

        // Tüm input alanlarının doluluğunu kontrol et
        const inputs = form.querySelectorAll('input'); // Tüm input elemanlarını seç
        let allFilled = true; // Tüm alanların dolu olduğunu varsayıyoruz

        inputs.forEach(input => {
            if (!input.value) { // Eğer bir alan boşsa
                allFilled = false; // Tüm alanlar dolu değil
            }
        });

        if (allFilled) {
            // Tüm alanlar doluysa işlemleri gerçekleştirin
            this.classList.add('was-validated'); // Bootstrap validasyon sınıfını ekleyin
            console.log("Form gönderildi!"); // Form gönderim işlemi burada yapılabilir
            // Burada verileri gönderme işlemleri yapılabilir
        } else {
            alert("Lütfen tüm alanları doldurun."); // Boş alan uyarısı
        }
    });

    // Telefon numarası inputuna yalnızca rakam girişi için
    document.getElementById("validationCustom02").addEventListener("input", function () {
        // Sadece rakamları kabul et
        this.value = this.value.replace(/[^0-9]/g, ''); // Tüm harfleri ve özel karakterleri kaldır
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
          <div class="play" >
            <img class='cardImg' src="/src/assets/image/business/card.png" alt="err">
            <a href="https://www.youtube.com/"> <img class="youtube" src="/src/assets/image/business/youtube.png"
                alt="err"></a>
          </div>
          <p class='month'>${item.month}</p>
          <h1>${item.name}</h1>
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
        const duration = 2000; // Adjust duration as needed
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
             <img src="${item.img}" alt="err">
        <p>${item.name}</p>
        <p class='title'>${item.title}</p>
      </swiper-slide>
    
    `).join('')
    })

    .catch(error => console.error('Error fetching data:', error));





//modal hireUs
// HTML elementləri seçirik
const hireUsButton = document.getElementById("hireUsButton");
const hireUsButtonn = document.getElementById("hireUsButtonn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const tabAddCompany = document.getElementById("tabAddCompany");
const tabContact = document.getElementById("tabContact");
const addCompanyContent = document.getElementById("addCompanyContent");
const contactContent = document.getElementById("contactContent");
const addCompanyForm = document.getElementById("addCompanyForm"); // `id` əlavə olundu
const contactForm = document.getElementById("contactForm"); // `id` əlavə olundu

const send = document.getElementById('send')
const thankModal = document.getElementById("thankModal");
const overlayThank = document.getElementById("overlayThank");
const closeThankModal = document.getElementById("closeThankModal");

// "HIRE US" düyməsinə basıldıqda modalın açılması
hireUsButton.onclick = function () {
    modal.style.display = "flex";
};

hireUsButtonn.onclick = function () {
    modal.style.display = "flex";
};


// Modalı bağlama düyməsinə basıldıqda modalı bağlama
closeModal.onclick = function () {
    modal.style.display = "none";
};

// Pəncərənin xaricinə basıldıqda modalı bağlama
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
    tabs.forEach(t => t.classList.remove('active')); // Əvvəlki aktiv sinifləri silir
    tab.classList.add('active'); // Klik edilən span-a .active sinifi əlavə edir
  });
})

// Formların göndərilmə funksiyası
addCompanyForm.onsubmit = function (event) {
    event.preventDefault(); // Formun yenilənməsini qarşısını alır
    modal.style.display = "none";
    thankModal.style.display = "flex"; // Teşekkür modalını açır
    overlayThank.style.display='block'
};

contactForm.onsubmit = function (event) {
    event.preventDefault(); // Formun yenilənməsini qarşısını alır
    modal.style.display = "none";
    thankModal.style.display = "flex"; // Teşekkür modalını açır
    overlayThank.style.display='block'

};

window.onload = function () {
    thankModal.style.display = "none"; // Səhifə yüklənərkən teşekkür modalını gizlət
};




// Teşekkür modaldaki "X" düyməsi
closeThankModal.onclick = function () {
    thankModal.style.display = "none"; // Teşekkür modalını bağlayır
    overlayThank.style.display='none'

};


//podcast
function selectOption(currentStep, nextStepId) {
    // Mövcud addımı tamamlayır
    document.getElementById(`step-${currentStep}`).classList.add("active");

    // Növbəti addımı aktiv edir
    document.getElementById(nextStepId).classList.add("active");

    // Yalnız bir checkbox seçimi etmək üçün digər seçimləri təmizləyir
    const checkboxes = document.querySelectorAll(`#step-${currentStep} .option input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    event.target.checked = true;
}


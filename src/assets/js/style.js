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

const apiUrl = '/src/data/people.json';

search.addEventListener('click', function () {
    searchShow.style.display = 'block';
    searchInput.focus();
    result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
});

inputClose.addEventListener('click', function () {
    searchShow.style.display = 'none';
});

searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Şəbəkə xətası');
                }
                return response.json();
            })
            .then(data => {
                const filteredResults = data.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
                displayResults(filteredResults);
            })
            .catch(error => {
                console.error('Xəta:', error);
                result.innerHTML = 'Axtarış zamanı xəta baş verdi';
            });
    } else {
        result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
    }
});

function displayResults(data) {
    // Clear previous results
    result.innerHTML = '';

    // Create searchCards container
    const searchCards = document.createElement('div');
    searchCards.classList.add('searchCards');

    if (data.length === 0) {
        result.innerHTML = '<img class="logo" src="/src/assets/image/home/showLogo.png" alt="No results">';
        return;
    }

    // Only show the first 3 results
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

    searchCards.innerHTML = cardContent; // Add card content to cardContainer
    result.appendChild(searchCards); // Append searchCards to results

    // // Add click event to each result item
    // const resultItems = document.querySelectorAll('.result-item');
    // resultItems.forEach(item => {
    //     item.addEventListener('click', () => {
    //         const id = item.getAttribute('data-id');
    //         window.location.href = `/src/pages/detail/index.html?id=${id}`;
    //     });
    // });

    // Add click event only to the "Read more" link
    const readMoreLinks = document.querySelectorAll('.read');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevents the click on the link from bubbling up to the card's event
            event.stopPropagation();
        });
    });

    // Check if there are more than 3 results and add "See All" button
    if (data.length > 3) {
        const seeAllButton = document.createElement('button');
        seeAllButton.textContent = 'SEE MORE';
        seeAllButton.id = 'see-all';
        result.appendChild(seeAllButton); // Add button to results

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

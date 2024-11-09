const params = new URLSearchParams(window.location.search);
let id = params.get('id'); 

const servicesDetail = document.getElementById('servicesDetail'); 
const api = '/src/data/services.json'; 
function displayItemDetails(item) {
    servicesDetail.innerHTML = `
                <div class="detail-about" data-aos='fade-up'>
            <div class="development" data-aos='fade-up'>
                <p data-aos='fade-up' class="dev">WEB DEVELOPMENT & WEBSITE DESIGN</p>
                <h5 data-aos='fade-up' class="solutions">Web Solutions & Experience Design</h5>
                <p data-aos='fade-up' class="lorem">Your brand image should influence a perception and create an impression of your
                    business abilities, and we want you to shine. Storm Brain develops websites and e-commerce platforms
                    that uniquely communicate who you are, demonstrate why you’re important, create maximum conversions,
                    drive business growth and profitability, and visually get noticed with mind-boggling design. We
                    build brand image.</p>
            </div>

            <div class="plans" data-aos='fade-up'>
                <h5 data-aos='fade-up' class="solutions">A Plan That’s Built for Your Business</h5>
                <p data-aos='fade-up' class="lorem">Using a pointed plan that leverages a mix of tactics —from high level messaging to paid
                    media — we’ll craft a custom strategy that will help you succeed in the ever-changing online space.
                    With our years of experience in the web design and development industry, we know what it takes to
                    produce.</p>
            </div>
        </div>

        <div class="detail-asset"  data-aos='fade-up'>
            <div class="write" data-aos='fade-up'>
                <h5 class='smart'>Smart</h5>
                <h5 class="web">Web Assets</h5>
            </div>

            <img data-aos='fade-up' src="/src/assets/image/detail/servicesDetail.png" alt="err">
            <h2 data-aos='fade-up'>WEB DESIGN & DEVELOPMENT SERVICES</h2>
            <ul data-aos='fade-up'>
                <li > User Experience Design (UI / UX)</li>
                <li > Website Development</li>
                <li > Content Strategy</li>
                <li > eCommerce Web Design</li>
                <li > Mobile Responsive Design</li>
                <li > Website Maintenance & Management</li>
                <li > Managed Website Hosting</li>
                <li > B2B | Corporate | Enterprise</li>
                <li > Accessibility (ADA) Compliance</li>
            </ul>
        </div>
    `;
}

if (id) {
    console.log("Axtarılan ID:", id);
    fetch(api)
        .then(res => res.json())
        .then(data => {
            const item = data.find(service => service.id === Number(id));
            if (item) {
                console.log("Tapılan məlumat:", item);
                displayItemDetails(item); // Məlumatı göstər
            } else {
                console.warn("Müvafiq məlumat tapılmadı");
            }
        })
        .catch(error => {
            console.error('Xəta:', error);
        });
} else {
    console.warn("ID tapılmadı. URL-də id yoxdur.");
}




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

document.addEventListener('DOMContentLoaded', function () {
    const firstButton = document.querySelector('.DesignButtons button');
    showPage('websitePage', firstButton);

    // Web formu və Branding formu
    const webForm = document.querySelector('.webForm');
    const brandingForm = document.querySelector('.brandingForm');
    const inputValues = document.querySelectorAll('input');
    
    // Düymələr və input sahəsini seçirik
    const funcBtns = document.querySelectorAll('.funcBtn');
    const writeInput = document.getElementById('write');
    
    // Düymələr üçün tək dəfə klik olunduğunu yoxlamaq üçün obyekt saxlayırıq
    const clickedBtns = new Set();
    
    // İlk düyməni `active` edirik
    funcBtns[0].classList.add('active');
    
    // Hər düymə üçün klik hadisəsini dinləyirik
    funcBtns.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.querySelector('p').textContent.trim(); // Düymənin məzmununu alırıq
            let currentValue = writeInput.value.trim(); // Mövcud input dəyərini alırıq

            // Əgər düyməyə klik olunubsa
            if (!clickedBtns.has(value)) {
                // Bütün düymələrdən `active` sinifini silirik
                funcBtns.forEach(btn => btn.classList.remove('active'));

                // Seçilən düyməyə `active` sinifi əlavə edirik
                this.classList.add('active');

                // Əgər input boş deyilsə, vergül və boşluq əlavə edirik
                if (currentValue) {
                    currentValue += ', ';
                }

                // Yeni mətni input-a əlavə edirik
                writeInput.value = currentValue + value;

                // Düyməni `clickedBtns` set-ə əlavə edirik
                clickedBtns.add(value);
            } else {
                // Əgər düymə artıq kliklənibsə, mətn input sahəsindən silinir
                currentValue = currentValue.replace(new RegExp(value + ','), '').trim();
                writeInput.value = currentValue;

                // Düyməni `clickedBtns` set-dən silirik
                clickedBtns.delete(value);

                // Aktiv olan düymənin `active` sinifini silirik
                this.classList.remove('active');
            }

            // Input sahəsindəki mətnə görə düymələrin `active` siniflərini yeniləyirik
            funcBtns.forEach(btn => {
                const btnText = btn.querySelector('p').textContent.trim();
                if (writeInput.value.includes(btnText)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    });

    // Formu göndərərkən input sahələrini təmizləyirik
    function handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input');
        let allFilled = true;
        let firstEmptyInput = null;

        // Bütün inputları yoxlayırıq
        inputs.forEach(input => {
            if (input.required && input.value.trim() === '') {
                allFilled = false;
                input.classList.add('error'); // Əgər boşdursa, error sinifi əlavə edirik
                if (!firstEmptyInput) {
                    firstEmptyInput = input; // İlk boş inputu tapırıq
                }
            } else {
                input.classList.remove('error'); // Əgər doldurulubsa, error sinifini silirik
            }
        });

        if (!allFilled) {
            // İlk boş inputa fokuslanırıq
            if (firstEmptyInput) {
                firstEmptyInput.focus();
            }
            return false;
        }
        return true;
    }

    // Web formu üçün submit hadisəsi
    webForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Səhifənin yenilənməsini dayandırırıq
        if (handleFormSubmit(webForm)) {
            inputValues.forEach(input => input.value = ''); // Web formu doldurulduqdan sonra input sahələrini təmizləyirik
        }
    });

    // Branding formu üçün submit hadisəsi
    brandingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Səhifənin yenilənməsini dayandırırıq
        if (handleFormSubmit(brandingForm)) {
            inputValues.forEach(input => input.value = ''); // Branding formu doldurulduqdan sonra input sahələrini təmizləyirik
        }
    });

    // Modal açmaq üçün düymələr
    const sendBtnn = document.getElementById('sendBtnn');
    const sendButton = document.getElementById('sendButton');
    const thankModall = document.getElementById('thankModal');
    const overlayThankk = document.getElementById('overlayThank');

    // Modalın açılması - sendBtn
    sendBtnn.addEventListener('click', function () {
        if (handleFormSubmit(webForm)) { // WebForm-u yoxlayırıq
            inputValues.forEach(input => input.value = ''); // Web formu göndərildikdən sonra inputları təmizləyirik
            thankModall.style.display = 'block';
            overlayThankk.style.display = 'block';
        }
    });

    // Modalın açılması - sendButton
    sendButton.addEventListener('click', function (event) {
        event.preventDefault(); // Sayfa dəyişməsinin qarşısını alırıq
        if (handleFormSubmit(brandingForm)) { // Branding formunu yoxlayırıq
            inputValues.forEach(input => input.value = ''); // Branding formu göndərildikdən sonra inputları təmizləyirik
            thankModall.style.display = 'block';
            overlayThankk.style.display = 'block';
        }
    });

    const closeThankModal = document.getElementById('closeThankModal');
    closeThankModal.addEventListener('click', function () {
        thankModall.style.display = 'none';
        overlayThankk.style.display = 'none';
        window.location.href='/index.html'
    });

    overlayThankk.addEventListener('click', function () {
        thankModall.style.display = 'none';
        overlayThankk.style.display = 'none';
    });

    // `showPage` funksiyası
    function showPage(pageId, button) {
        document.querySelectorAll('.page-content').forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(pageId).style.display = 'block';

        document.querySelectorAll('.DesignButtons button').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');
    }

    window.showPage = showPage;

    // Sayt yükləndikdə `websitePage` göstərilsin
    showPage('websitePage', firstButton);

    // typeBtns üçün kod:
    const typeBtns = document.querySelectorAll('.typeBtn');
    typeBtns[0].classList.add('active');

    typeBtns.forEach(button => {
        button.addEventListener('click', function () {
            typeBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

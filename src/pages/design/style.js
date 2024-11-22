document.addEventListener('DOMContentLoaded', function () {
    const firstButton = document.querySelector('.DesignButtons button');
    showPage('websitePage', firstButton);

    const webForm = document.querySelector('.webForm');
    const brandingForm = document.querySelector('.brandingForm');
    const inputValues = document.querySelectorAll('input');
        const funcBtns = document.querySelectorAll('.funcBtn');
    const writeInput = document.getElementById('write');
    
    // Düymələr üçün tək dəfə klik olunduğunu yoxlamaq üçün obyekt saxlayırıq
    const clickedBtns = new Set();
    
    // İlk düyməni `active` edirik
    funcBtns[0].classList.add('active');
    
    funcBtns.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.querySelector('p').textContent.trim(); 
            let currentValue = writeInput.value.trim();
            if (!clickedBtns.has(value)) {
                funcBtns.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');

                if (currentValue) {
                    currentValue += ', ';
                }

                writeInput.value = currentValue + value;

                clickedBtns.add(value);
            } else {
       currentValue = currentValue.replace(new RegExp(value + ','), '').trim();
                writeInput.value = currentValue;

                clickedBtns.delete(value);

                this.classList.remove('active');
            }

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

    function handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input');
        let allFilled = true;
        let firstEmptyInput = null;

        // Bütün inputları yoxlayırıq
        inputs.forEach(input => {
            if (input.required && input.value.trim() === '') {
                allFilled = false;
                input.classList.add('error');
                if (!firstEmptyInput) {
                    firstEmptyInput = input;
                }
            } else {
                input.classList.remove('error'); 
            }
        });

        if (!allFilled) {
            if (firstEmptyInput) {
                firstEmptyInput.focus();
            }
            return false;
        }
        return true;
    }

    // Web formu üçün submit hadisəsi
    webForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        if (handleFormSubmit(webForm)) {
            inputValues.forEach(input => input.value = ''); 
        }
    });

    // Branding formu üçün submit hadisəsi
    brandingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (handleFormSubmit(brandingForm)) {
            inputValues.forEach(input => input.value = '');
        }
    });

    // Modal açilmasi
    const sendBtnn = document.getElementById('sendBtnn');
    const sendButton = document.getElementById('sendButton');
    const thankModall = document.getElementById('thankModal');
    const overlayThankk = document.getElementById('overlayThank');

    sendBtnn.addEventListener('click', function () {
        if (handleFormSubmit(webForm)) { 
            inputValues.forEach(input => input.value = ''); 
            thankModall.style.display = 'block';
            overlayThankk.style.display = 'block';
        }
    });

    sendButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        if (handleFormSubmit(brandingForm)) { 
            inputValues.forEach(input => input.value = ''); 
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

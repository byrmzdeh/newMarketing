document.addEventListener('DOMContentLoaded', function () {
    const firstButton = document.querySelector('.DesignButtons button');
    showPage('websitePage', firstButton);

    const webForm = document.querySelector('.webForm');
    const brandingForm = document.querySelector('.brandingForm');
    const inputValues = document.querySelectorAll('input');
    
    
    // İlk düyməni active
    
    const checkboxes = document.querySelectorAll(".funcBtn input[type='checkbox']");
    const writeInput = document.getElementById("writeInput");
    
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", () => {
        const value = checkbox.value;
        const label = checkbox.closest(".funcBtn"); 
        let currentText = writeInput.value.split(", ").filter((item) => item); 
    
        if (checkbox.checked) {
          if (!currentText.includes(value)) {
            currentText.push(value);
          }
          label.classList.add("active");
        } else {
          currentText = currentText.filter((item) => item !== value);
          label.classList.remove("active"); 
        }
    
        writeInput.value = currentText.join(", "); 
      });
    });
    

    
    function handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input');
        let allFilled = true;
        let firstEmptyInput = null;

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

    showPage('websitePage', firstButton);

    const typeBtns = document.querySelectorAll('.typeBtn');
    typeBtns[0].classList.add('active');

    typeBtns.forEach(button => {
        button.addEventListener('click', function () {
            typeBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });


    const typeBtnss = document.querySelectorAll('.typeBtnn');
    typeBtnss[0].classList.add('active');

    typeBtnss.forEach(button => {
        button.addEventListener('click', function () {
            typeBtnss.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

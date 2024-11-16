document.addEventListener('DOMContentLoaded', function () {
    // İlk səhifə yüklənəndə "websitePage" göstərilir və ilk buton aktiv olur
    const firstButton = document.querySelector('.DesignButtons button');
    showPage('websitePage', firstButton);

    // Form-u göndərərkən inputları təmizləyirik
    const form = document.querySelector('.webForm');
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
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Səhifənin yenilənməsini dayandırırıq
        inputValues.forEach(input => {
            input.value = '';
        });
    });

    // Seçilən səhifəni göstərmək üçün funksiya
    function showPage(pageId, button) {
        document.querySelectorAll('.page-content').forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(pageId).style.display = 'block';

        // Aktiv olan butona "active" sinifi əlavə edirik
        document.querySelectorAll('.DesignButtons button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Seçilən butona "active" sinifi əlavə edirik
        button.classList.add('active');
    }

    // Funksiyanı qlobal olaraq təyin edirik ki, düymələr onclick-də çağıranda işləsin
    window.showPage = showPage;

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

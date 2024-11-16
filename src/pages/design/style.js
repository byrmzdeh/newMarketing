document.addEventListener('DOMContentLoaded', function () {
    // İlk səhifə yüklənəndə "websitePage" göstərilir və ilk buton aktiv olur
    const firstButton = document.querySelector('.DesignButtons button'); // İlk buton
    showPage('websitePage', firstButton); // "websitePage" səhifəsini və ilk butonu aktiv edirik

    // Form-u göndərərkən inputları təmizləyirik
    const form = document.querySelector('.webForm');
    const inputValues = document.querySelectorAll('input');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Səhifənin yenilənməsini dayandırırıq
        
        // Bütün input dəyərlərini təmizləyirik
        inputValues.forEach(input => {
            input.value = '';
        });
    });
});

// Seçilən səhifəni göstərmək üçün funksiya
function showPage(pageId, button) {
    // Bütün səhifələri gizlədirik
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });

    // Seçilən səhifəni göstəririk
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
typeBtns[0].classList.add('active'); // İlk butona 'active' sinifi əlavə edirik

typeBtns.forEach(button => {
    button.addEventListener('click', function () {
        // Əvvəlki aktiv butondan 'active' sinifini silirik
        typeBtns.forEach(btn => btn.classList.remove('active'));
        
        // Kliklənmiş butona 'active' sinifi əlavə edirik
        this.classList.add('active');
    });
});

// typeBtns üçün kod:
const typeBtnss = document.querySelectorAll('.typeBtnn');
typeBtnss[0].classList.add('active'); // İlk butona 'active' sinifi əlavə edirik

typeBtnss.forEach(button => {
    button.addEventListener('click', function () {
        // Əvvəlki aktiv butondan 'active' sinifini silirik
        typeBtnss.forEach(btn => btn.classList.remove('active'));
        
        // Kliklənmiş butona 'active' sinifi əlavə edirik
        this.classList.add('active');
    });
});

const checkboxes = document.querySelectorAll(".checkbox");
const minSelections = 2;

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    // Ən azı 2 seçim olmalıdır
    if (checkedCount < minSelections) {
      checkbox.checked = true; // Əgər qaydanı pozarsa, əvvəlki vəziyyətə qaytarır
    }
  });
});
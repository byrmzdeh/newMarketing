


document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const submitBtn = document.querySelector('.btnSubmit');
    const termsCheckbox = document.querySelector('#terms');
    const form = document.getElementById('podcastForm');

    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="studio"]');

// Checkbox-ların dəyişiklik hadisəsini izləyən funksiya
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      // Digər bütün checkbox-ları işarəsiz et
      checkboxes.forEach((cb) => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    }
  });
});



const checkboxesZone = document.querySelectorAll('input[type="checkbox"][name="zone"]');

// Checkbox-ların dəyişiklik hadisəsini izləyən funksiya
checkboxesZone.forEach((checkboxZone) => {
  checkboxZone.addEventListener('change', function () {
    if (this.checked) {
      // Digər bütün checkbox-ları işarəsiz et
      checkboxesZone.forEach((cb) => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    }
  });
});


    
    // Funksiya: Addımların keçidini idarə etmək
    steps.forEach((step, index) => {
        const inputs = step.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                // Hər hansı inputun seçildiyini yoxlayırıq
                const allChecked = Array.from(inputs).some(input => input.checked || input.value);
                if (allChecked) {
                    step.querySelector('.step-header').classList.add('active');
                    
                    // Növbəti addımı aktiv et
                    const nextStep = steps[index + 1];
                    if (nextStep) {
                        nextStep.querySelector('.step-header').classList.add('active');
                        const nextContent = nextStep.querySelector('.step-content, .step-contentTime, .contents');
                        nextContent.classList.add('active');
                    }
                }
            });
        });
    });

    // Razılaşma şərtini yoxlama
    termsCheckbox.addEventListener('change', () => {
        // `REZERV ET` düyməsini aktiv etmək üçün şərti yoxlayırıq
        if (termsCheckbox.checked) {
            submitBtn.disabled = false;
            submitBtn.classList.add('active');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
        }
    });

    // Form göndərildikdə səhifənin yenilənməsinin qarşısını alırıq
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        // Formu təmizləyirik
        form.reset();

        // Bütün addımları təmizləyirik
        steps.forEach((step, index) => {
            if (index > 0) { // İlk addımda heç nəyi dəyişmirik
                step.querySelector('.step-header').classList.remove('active');
                const inputs = step.querySelectorAll('input');
                inputs.forEach(input => {
                    input.removeAttribute('checked');
                    input.value = '';
                });
                const stepContent = step.querySelector('.step-content, .step-contentTime, .contents');
                stepContent.classList.remove('active');
            }
        });
        
        // İlk addımı yenidən aktiv edirik
        const firstStep = steps[0];
        firstStep.querySelector('.step-header').classList.add('active');
        const firstInputs = firstStep.querySelectorAll('input');
        firstInputs.forEach(input => input.removeAttribute('disabled'));
        const firstStepContent = firstStep.querySelector('.step-content');
        firstStepContent.classList.add('active');
        
        // `REZERV ET` düyməsini yenidən deaktiv edirik
        submitBtn.disabled = true;
        submitBtn.classList.remove('active');
        window.location.href='/index.html'
    });
});


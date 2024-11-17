function submitForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !phone || !terms) {
        alert('Zəhmət olmasa bütün məlumatları doldurun və şərtləri qəbul edin.');
        return;
    }

    alert('Rezervasiya uğurla tamamlandı!');
}
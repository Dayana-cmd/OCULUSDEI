const $burguer = document.getElementById('burguer');
const $barral = document.getElementById('barral');
const $overlaya = document.getElementById('overlay-lat');

$burguer.addEventListener('click', () => {
    // alert('hola');
    $overlaya.classList.toggle('active');
    $barral.classList.toggle('active');
})

$overlaya.addEventListener('click', ()=> {
    $overlaya.classList.toggle('active');
    $barral.classList.toggle('active');
})
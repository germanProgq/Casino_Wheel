let header= document.getElementById('header');
header.style.zIndex = '1000';
window.addEventListener('scroll', () => {
    let value = window.scrollY;
    if (value!=0) {        
        header.style.opacity = 0.9;
    }
    else {
        header.style.opacity = 1;
    }
})
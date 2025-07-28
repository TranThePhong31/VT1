// Slideshow for banner
let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}

// Auto slide
setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 4000);

// Lottie Bear Animation
let bearAnim = null;
document.addEventListener("DOMContentLoaded", function () {
    const bearDiv = document.getElementById('bear-lottie');
    const bearContainer = bearDiv ? bearDiv.querySelector('div') : null;
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');

    // Hàm hiển thị Lottie animation
    function showAnimation(fileName) {
        if (!bearDiv || !bearContainer) return;
        bearDiv.style.display = 'flex';
        bearContainer.innerHTML = "";
        if (bearAnim) {
            bearAnim.destroy();
            bearAnim = null;
        }
        fetch(`Image/${fileName}`)
            .then(res => res.json())
            .then(data => {
                bearAnim = lottie.loadAnimation({
                    container: bearContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: data
                });
            });
        setTimeout(() => {
            bearDiv.style.display = 'none';
            if (bearAnim) bearAnim.stop();
        }, 5000);
    }

    // Bắt sự kiện nhập từ khóa
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const keyword = searchInput.value.trim().toLowerCase();
            if (keyword === "bear") {
                showAnimation("cute_bear_dancing.json");
            } else if (keyword === "cat") {
                showAnimation("black_rainbow_cat.json");
            } else if (keyword === "dog") {
                showAnimation("boxing_angry_puppy.json");
            } else {
                alert("Không tìm thấy kết quả phù hợp với từ khóa: " + keyword);
            }
        });
    }
});

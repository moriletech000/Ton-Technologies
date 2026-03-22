var menuBtn = document.querySelector('.main-navbar .menu-btn');
var menuList = document.querySelector('.main-navbar .nav-list');
var menuListItems = document.querySelectorAll('.nav-list li a');

menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
})

for(var i = 0; i < menuListItems.length; i++){
    menuListItems[i].addEventListener('click', menuItemClicked);
}
function menuItemClicked(){
    menuBtn.classList.remove('active');
    menuList.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', pageScrollFuction);
window.addEventListener('load', pageScrollFuction);

function pageScrollFuction() {
    if(window.scrollY > 120){
        homeSection.classList.add('active');
    }
    else{
        homeSection.classList.remove('active');
    }
}

$('.partners-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    margin:10,
    nav:true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        700:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

$('.testimonials-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    margin:10,
    nav:true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        }
    }
})

// Search Bar Functionality
var searchInput = document.querySelector('.search-bar input');
var searchBtn = document.querySelector('.search-bar i');
var courseCards = document.querySelectorAll('.course-card');
var noResultsMessage = document.createElement('div');

noResultsMessage.className = 'no-results';
noResultsMessage.innerHTML = '<p>No courses found matching your search. Try different keywords!</p>';
noResultsMessage.style.display = 'none';
document.querySelector('.course-contents').appendChild(noResultsMessage);

function searchCourses(shouldScroll) {
    var searchTerm = searchInput.value.toLowerCase().trim();
    var foundResults = false;

    if(searchTerm === '') {
        // Show all courses if search is empty
        courseCards.forEach(function(card) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        });
        noResultsMessage.style.display = 'none';
        return;
    }

    courseCards.forEach(function(card) {
        var courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
        var courseSubject = card.querySelector('.subject h3').textContent.toLowerCase();
        var courseDesc = card.querySelector('.course-desc').textContent.toLowerCase();

        if(courseTitle.includes(searchTerm) || courseSubject.includes(searchTerm) || courseDesc.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Show or hide no results message
    if(!foundResults) {
        noResultsMessage.style.display = 'block';
        noResultsMessage.style.animation = 'fadeIn 0.5s ease';
    } else {
        noResultsMessage.style.display = 'none';
    }

    // Scroll to courses section only if shouldScroll is true
    if(shouldScroll) {
        document.querySelector('#courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Search on button click (with scroll)
searchBtn.addEventListener('click', function() {
    searchCourses(true);
});

// Search on Enter key press (with scroll)
searchInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        searchCourses(true);
    }
});

// Real-time search as user types (without scroll)
searchInput.addEventListener('input', function() {
    searchCourses(false);
});
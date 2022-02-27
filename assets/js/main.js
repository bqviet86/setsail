let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let app = $('body');
let searchBtn = $('.header-right__icon:nth-child(2)');
let menuBtn = $('.header-right__icon:nth-child(3)');

// MODAL-SEARCH 
let modal = document.createElement('div');
modal.classList.add('modal');

searchBtn.addEventListener('click', function() {
    let innerSearch = `
        <div class="modal-close">
            <i class="ti-close"></i>
        </div>
        <div class="modal-main modal-main-search">
            <div class="modal-search">
                <input type="text" placeholder="Search...">
                <div class="modal-search-btn">Find Now</div>
            </div>
        </div>
        <div class="modal-overlay"></div>
    `;

    modal.innerHTML = innerSearch;
    openModal();

    let modalOverlay = $('.modal-overlay');
    modalOverlay.addEventListener('click', closeModal);

    let modalClose = $('.modal > .modal-close');
    modalClose.addEventListener('click', closeModal);
})

// MODAL-MENU-MAP
menuBtn.addEventListener('click', function() {
    modal.innerHTML = `
        <div class="modal-overlay" style="background-color: transparent;"></div>
    `;

    openModal();

    let modalMenu = document.querySelector('.modal-main.modal-main-menu');
    modalMenu.classList.add('open');

    let modalOverlay = $('.modal-overlay');
    modalOverlay.addEventListener('click', function() {
        closeModal();
        modalMenu.classList.remove('open');
    });

    let modalClose = $('.modal-close');
    modalClose.addEventListener('click', function() {
        closeModal();
        modalMenu.classList.remove('open');
    });
})


function openModal() {
    app.appendChild(modal);
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
    setTimeout(function() {
        app.removeChild(modal);
    }, 500);
}

// SLIDER 
let slides = $$('.slider');
let count = 1;

slides[0].classList.add('slider--show');

function runSlide() {
    for(let slide of slides) {
        slide.classList.remove('slider--show');
    }
    slides[count].classList.add('slider--show');
    count++;
    if(count > 1)
        count = 0;
}

let sliderIntervalID = setInterval(runSlide, 4000);

let slideBtns = $$('.slider-btn');

function changeSlide() {
    clearInterval(sliderIntervalID);

    for(let i = 0; i < slides.length; i++) {
        let slide = slides[i];
        if(slide.classList.contains('slider--show')) {
            slide.classList.remove('slider--show');
            count = i;
            break;
        }
    }

    count++;
    if(count > 1)
        count = 0;

    slides[count].classList.add('slider--show');
    
    count++;
    if(count > 1)
        count = 0;

    sliderIntervalID = setInterval(runSlide, 4000);
}

for(let sliderBtn of slideBtns) {
    sliderBtn.addEventListener('click', changeSlide);
}

// TOUR
let toursWrap = $('.tours-wrap');
let tours = $$('.tour');
let paginationTourBtns = $$('.pagination-tour .pagination-btn');
let tourWidth = 0;
let tourTranslateX = 0;
let countTour = 1;

function nonActivePaginationTour() {
    for(let paginationBtn of paginationTourBtns) {
        paginationBtn.classList.remove('active');
    }
}

function runTour() {
    for(let tour of tours) {
        tourWidth = tour.offsetWidth;
    }
    tourWidth += 20;

    tourTranslateX = tourWidth * countTour;
    toursWrap.style.transform = `translateX(-${tourTranslateX}px)`;
    
    countTour++;
    let appWidth = app.offsetWidth;

    if(appWidth >= 752.00001 && countTour % 5 !== 0) {
        nonActivePaginationTour();
        paginationTourBtns[Math.floor(countTour / 5)].classList.add('active');
    }
    else if(appWidth >= 572.00001 && appWidth <= 752 && countTour % 2 !== 0) {
        nonActivePaginationTour();
        paginationTourBtns[Math.floor(countTour / 2)].classList.add('active');
    }
    else if(appWidth <= 572) {
        nonActivePaginationTour();
        paginationTourBtns[countTour - 1].classList.add('active');
    }

    if(appWidth >= 1292.00001 && countTour > 5 || 
        appWidth >= 1016.00001 && appWidth <= 1292 && countTour > 6 || 
        appWidth >= 752.00001 && appWidth <= 1016 && countTour > 7 || 
        appWidth >= 572.00001 && appWidth <= 752 && countTour > 8 || 
        appWidth <= 572 && countTour > 9) 
    {
        countTour = 0;
        tourTranslateX = 0;
    }
}

let tourIntervalID = setInterval(runTour, 2000);

for(let i = 0; i < paginationTourBtns.length; i++) {
    let paginationBtn = paginationTourBtns[i];
    paginationBtn.addEventListener('click', function() {
        nonActivePaginationTour();
        this.classList.add('active');

        clearInterval(tourIntervalID);

        let appWidth = app.offsetWidth;

        if(appWidth >= 752.00001) {
            countTour = i * 5;
        }
        else if(appWidth >= 572.00001 && appWidth <= 752) {
            countTour = i * 2;
        }
        else if(appWidth <= 572) {
            countTour = i;
        }

        runTour();
        
        tourIntervalID = setInterval(runTour, 2000);
    })
}

// MODAL-VIDEO
let videoWrap = $('.section-video-wrap');

videoWrap.addEventListener('click', function() {
    modal.innerHTML = `
        <div class="modal-main modal-main-video">
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/jgZkrA8E5do"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
        <div class="modal-overlay" style="background-color: rgba(0, 0, 0, .6);"></div>
    `;

    openModal();

    let modalOverlay = $('.modal-overlay');
    modalOverlay.addEventListener('click', closeModal);
})

// REVIEW
let reviewList = $('.review-list');
let paginationReviewBtns = $$('.pagination-review .pagination-btn');
let reviewItems = $$('.review-item');
let reviewItemWidth = 0;
let reviewTranslateX = 0;
let countReview = 1;

function nonActivePaginationReview() {
    for(let paginationBtn of paginationReviewBtns) {
        paginationBtn.classList.remove('active');
    }
}

function runReview() {
    for(let reviewItem of reviewItems) {
        reviewItemWidth = reviewItem.offsetWidth;
    }
    reviewItemWidth += 40;

    reviewTranslateX = reviewItemWidth * countReview;
    reviewList.style.transform = `translateX(-${reviewTranslateX}px)`;
    
    countReview++;
    let appWidth = app.offsetWidth;

    if(appWidth >= 572.00001 && countReview % 3 !== 0) {
        nonActivePaginationReview();
        paginationReviewBtns[Math.floor(countReview / 3)].classList.add('active');
    }
    else if(appWidth <= 572) {
        nonActivePaginationReview();
        paginationReviewBtns[countReview - 1].classList.add('active');
    }

    if(appWidth >= 752.00001 && countReview > 6 || 
        appWidth >= 572.00001 && appWidth <= 752 && countReview > 7 || 
        appWidth <= 572 && countReview > 8) 
    {
        countReview = 0;
        reviewTranslateX = 0;
    }
}

let reviewIntervalID = setInterval(runReview, 2000);

for(let i = 0; i < paginationReviewBtns.length; i++) {
    let paginationBtn = paginationReviewBtns[i];
    paginationBtn.addEventListener('click', function() {
        nonActivePaginationReview();
        this.classList.add('active');

        clearInterval(reviewIntervalID);

        let appWidth = app.offsetWidth;

        if(appWidth >= 572.00001) {
            countReview = i * 3;
        }
        else if(appWidth <= 572) {
            countReview = i;
        }

        runReview();
        
        reviewIntervalID = setInterval(runReview, 2000);
    })
}

// COUNTER
let counterDiv = $('.counter');
let countDiv = $$('.count-num');
let stopCount = 1;

function countRun({
    countDivNum = 0, 
    lastNum = 0   
}) {
    let countNum = 0;

    let textID = setInterval(function() {
        countNum++;
        countDiv[countDivNum].innerHTML = `${countNum}`;
        if(countNum === lastNum) {
            clearInterval(textID);
        }
    }, (2000 / lastNum).toFixed(5));
}

window.addEventListener('scroll', function() {
    if(this.scrollY + this.innerHeight >= counterDiv.offsetTop && stopCount) {
        countRun({countDivNum: 0, lastNum: 452})
        countRun({countDivNum: 1, lastNum: 120})
        countRun({countDivNum: 2, lastNum: 283})
        countRun({countDivNum: 3, lastNum: 197})
        stopCount = 0;
    }
})

// HEADER MOBILE
let navResp = $('.nav-resp'); 
let headerRespMenu = $('.header-resp-menu');

headerRespMenu.addEventListener('click', function() {
    let checkNavResp = navResp.classList.contains('open');

    if(!checkNavResp) {
        navResp.classList.add('open');
    }
    else {
        navResp.classList.remove('open');
    }
});

function openNavItemMobile({
    level = ''
}) {
    let navRespItemLinkWraps = $$(`.nav-resp-item-link-wrap.${level}`);

    for(let i = 0; i < navRespItemLinkWraps.length; i++) {
        let navRespItemLinkWrap = navRespItemLinkWraps[i];
        navRespItemLinkWrap.addEventListener('click', function() {
            let navRespInner = $$(`.nav-resp-inner.${level}`);
            let navRespIcon = $$(`.nav-resp-icon.${level}`);

            let checkNavRespInner = navRespInner[i].classList.contains('open');

            if(!checkNavRespInner) {
                for(let navRespInnerItem of navRespInner) {
                    navRespInnerItem.classList.remove('open');
                }

                for(let navRespIconItem of navRespIcon) {
                    navRespIconItem.style.transform = 'rotate(-90deg)';
                }

                navRespInner[i].classList.add('open');
                navRespIcon[i].style.transform = 'rotate(0)';
                navResp.style.height = '336px';
            }
            else {
                navRespInner[i].classList.remove('open');
                navRespIcon[i].style.transform = 'rotate(-90deg)';
                navResp.style.height = '294px';
            }
        });
    }
}

openNavItemMobile({
    level: 'lv1'
});

openNavItemMobile({
    level: 'lv2'
});
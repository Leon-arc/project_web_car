/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER HOME ===============*/ 
const swiperHome = new Swiper('.home__swiper', {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + "</span>";
        },
    },

    autoplay: {
        delay: 4000,
    }
});

/*=============== CAR MODAL ===============*/
const modal = document.getElementById('car-modal'),
      modalClose = document.getElementById('modal-close'),
      modelsCards = document.querySelectorAll('.models__card')

// Car data dengan informasi lebih detail
const carData = {
    silver: {
        title: "Silver Aventador",
        subtitle: "LP 780-4 ULTIMAE",
        image: "assets/img/model-car-1.png",
        power: "780 CV (574 kW)",
        speed: "355 km/h",
        acceleration: "2.8s",
        engine: "V12 Naturally Aspirated",
        description: "The Silver Aventador showcases ultimate elegance and power. With its aerodynamic design and cutting-edge technology, it represents the pinnacle of automotive engineering. The reflective silver finish captures the light perfectly, highlighting the car's aggressive lines and sophisticated contours."
    },
    yellow: {
        title: "Yellow Aventador",
        subtitle: "LP 780-4 ULTIMAE",
        image: "assets/img/model-car-2.png",
        power: "780 CV (574 kW)",
        speed: "355 km/h",
        acceleration: "2.9s",
        engine: "V12 Naturally Aspirated",
        description: "The Yellow Aventador embodies pure excitement and racing heritage. This vibrant masterpiece commands attention wherever it goes, with a color that reflects the car's exhilarating performance capabilities. The striking yellow finish is matched only by the adrenaline-pumping experience of driving this exceptional supercar."
    },
    blue: {
        title: "Blue Aventador",
        subtitle: "LP 780-4 ULTIMAE",
        image: "assets/img/model-car-3.png",
        power: "780 CV (574 kW)",
        speed: "355 km/h",
        acceleration: "2.8s",
        engine: "V12 Naturally Aspirated",
        description: "The Blue Aventador combines sophistication with raw power. Its deep blue finish gives this supercar a mysterious allure while maintaining the aggressive character that defines Lamborghini. The color perfectly complements the sharp angles and bold design, making this Aventador a standout presence on any road."
    }
}

// Show modal function with animation
const showModal = (carType) => {
    const car = carData[carType]
    
    document.getElementById('modal-img').src = car.image
    document.getElementById('modal-title').textContent = car.title
    document.getElementById('modal-subtitle').textContent = car.subtitle
    document.getElementById('modal-power').textContent = car.power
    document.getElementById('modal-speed').textContent = car.speed
    document.getElementById('modal-acceleration').textContent = car.acceleration
    document.getElementById('modal-engine').textContent = car.engine
    document.getElementById('modal-description').textContent = car.description
    
    modal.classList.add('show-modal')
    document.body.style.overflow = 'hidden'
    
    // Animasi untuk gambar
    const modalImg = document.getElementById('modal-img')
    modalImg.style.opacity = '0'
    modalImg.style.transform = 'perspective(800px) rotateY(30deg)'
    
    // Animasi untuk info side
    const infoSide = document.querySelector('.modal__info-side')
    infoSide.style.opacity = '0'
    infoSide.style.transform = 'translateX(20px)'
    
    // Execute animations with delay
    setTimeout(() => {
        modalImg.style.transition = 'all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        modalImg.style.opacity = '1'
        modalImg.style.transform = 'perspective(800px) rotateY(5deg)'
    }, 300)
    
    setTimeout(() => {
        infoSide.style.transition = 'all 0.5s ease'
        infoSide.style.opacity = '1'
        infoSide.style.transform = 'translateX(0)'
    }, 500)
    
    // Add entrance animation for specs
    const specs = document.querySelectorAll('.modal__spec')
    specs.forEach((spec, index) => {
        spec.style.opacity = '0'
        spec.style.transform = 'translateY(20px)'
        setTimeout(() => {
            spec.style.transition = 'all 0.4s ease'
            spec.style.opacity = '1'
            spec.style.transform = 'translateY(0)'
        }, 700 + (index * 100))
    })
}

// Hide modal function with exit animation
const hideModal = () => {
    const modalContent = document.querySelector('.modal__content')
    const modalImg = document.getElementById('modal-img')
    const infoSide = document.querySelector('.modal__info-side')
    
    modalImg.style.opacity = '0'
    modalImg.style.transform = 'perspective(800px) rotateY(30deg)'
    
    infoSide.style.opacity = '0'
    infoSide.style.transform = 'translateX(20px)'
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(0.9)'
        modalContent.style.opacity = '0'
        
        setTimeout(() => {
            modal.classList.remove('show-modal')
            document.body.style.overflow = 'auto'
            
            // Reset styles after modal is hidden
            setTimeout(() => {
                modalContent.style.transform = ''
                modalContent.style.opacity = ''
                modalImg.style.transition = ''
                modalImg.style.transform = ''
                modalImg.style.opacity = ''
                infoSide.style.transition = ''
                infoSide.style.transform = ''
                infoSide.style.opacity = ''
            }, 300)
        }, 200)
    }, 100)
}

// Event listeners
modelsCards.forEach(card => {
    card.addEventListener('click', () => {
        const carType = card.getAttribute('data-model')
        showModal(carType)
    })
})

modalClose.addEventListener('click', hideModal)

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal()
    }
})

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show-modal')) {
        hideModal()
    }
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
      const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
})

sr.reveal(`.home__bg`, {scale: 1.1, opacity: 1})
sr.reveal(`.home__swiper`, {origin: 'right', distance: '300px', delay: 800})
sr.reveal(`.home__data`, {origin: 'bottom', distance: '120px', delay: 1600})
sr.reveal(`.swiper-pagination-bullet`, {origin: 'top', delay: 1800, opacity:0})
sr.reveal(`.home__button`, {origin: 'top', delay: 2200})
sr.reveal(`.about__data, contact__content`, {origin: 'left'})
sr.reveal(`.about__video, contact__img`, {origin: 'right'})
sr.reveal(`.models__card`, {interval: 100})
sr.reveal(`.info__img`, {distance: '120px'})
sr.reveal(`.info__number`, {origin: 'bottom', distance: '80px', delay: 800})
sr.reveal(`.info__group`, {interval: 100, delay: 1300})
sr.reveal(`.footer__container`)
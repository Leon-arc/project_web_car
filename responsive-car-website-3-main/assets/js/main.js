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
        delay: 5000 ,
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
        power: "780 CV (6574 kW)",
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

// Enhanced show modal function with scroll support
const showModal = (carType) => {
    const car = carData[carType]
    
    // Show loading state
    modal.classList.add('show-modal')
    document.body.style.overflow = 'hidden'
    
    // Add loading spinner
    const modalImageSide = document.querySelector('.modal__image-side')
    const loadingHTML = '<div class="modal__loading"><div class="modal__loading-spinner"></div></div>'
    modalImageSide.insertAdjacentHTML('beforeend', loadingHTML)
    
    // Update modal content
    document.getElementById('modal-img').src = car.image
    document.getElementById('modal-title').textContent = car.title
    document.getElementById('modal-subtitle').textContent = car.subtitle
    document.getElementById('modal-power').textContent = car.power
    document.getElementById('modal-speed').textContent = car.speed
    document.getElementById('modal-acceleration').textContent = car.acceleration
    document.getElementById('modal-engine').textContent = car.engine
    document.getElementById('modal-description').textContent = car.description
    
    // Remove loading spinner after image loads
    const modalImg = document.getElementById('modal-img')
    modalImg.onload = () => {
        const loading = document.querySelector('.modal__loading')
        if (loading) {
            loading.remove()
        }
        
        // Enhanced entrance animations
        modalImg.style.opacity = '0'
        modalImg.style.transform = 'perspective(1000px) rotateY(30deg) rotateX(10deg) scale(0.8)'
        
        const infoSide = document.querySelector('.modal__info-side')
        infoSide.style.opacity = '0'
        infoSide.style.transform = 'translateX(50px)'
        
        // Reset scroll position
        infoSide.scrollTop = 0
        
        // Add scroll indicator if content is scrollable
        setTimeout(() => {
            addScrollIndicator(infoSide)
        }, 500)
        
        // Animate image
        setTimeout(() => {
            modalImg.style.transition = 'all 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
            modalImg.style.opacity = '1'
            modalImg.style.transform = 'perspective(1000px) rotateY(8deg) rotateX(2deg) scale(1)'
        }, 200)
        
        // Animate info side
        setTimeout(() => {
            infoSide.style.transition = 'all 0.8s ease'
            infoSide.style.opacity = '1'
            infoSide.style.transform = 'translateX(0)'
        }, 400)
        
        // Animate specs with stagger effect
        const specs = document.querySelectorAll('.modal__spec')
        specs.forEach((spec, index) => {
            spec.style.opacity = '0'
            spec.style.transform = 'translateY(30px) scale(0.9)'
            setTimeout(() => {
                spec.style.transition = 'all 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
                spec.style.opacity = '1'
                spec.style.transform = 'translateY(0) scale(1)'
            }, 600 + (index * 150))
        })
        
        // Animate description
        const description = document.querySelector('.modal__description')
        description.style.opacity = '0'
        description.style.transform = 'translateY(20px)'
        setTimeout(() => {
            description.style.transition = 'all 0.6s ease'
            description.style.opacity = '1'
            description.style.transform = 'translateY(0)'
        }, 1200)
        
        // Animate buttons
        const buttons = document.querySelectorAll('.modal__button')
        buttons.forEach((button, index) => {
            button.style.opacity = '0'
            button.style.transform = 'translateY(20px)'
            setTimeout(() => {
                button.style.transition = 'all 0.5s ease'
                button.style.opacity = '1'
                button.style.transform = 'translateY(0)'
            }, 1400 + (index * 100))
        })
    }
}

// Function to add scroll indicator
function addScrollIndicator(container) {
    // Remove existing indicator
    const existingIndicator = container.querySelector('.modal__scroll-indicator')
    if (existingIndicator) {
        existingIndicator.remove()
    }
    
    // Check if content is scrollable
    if (container.scrollHeight > container.clientHeight) {
        const indicator = document.createElement('div')
        indicator.className = 'modal__scroll-indicator show'
        container.appendChild(indicator)
        
        // Add scroll event listener
        container.addEventListener('scroll', () => {
            // Hide indicator when user starts scrolling
            indicator.style.opacity = '0'
        })
        
        // Auto-hide indicator after 3 seconds
        setTimeout(() => {
            indicator.classList.remove('show')
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove()
                }
            }, 300)
        }, 3000)
    }
}

// Enhanced hide modal function
const hideModal = () => {
    const modalContent = document.querySelector('.modal__content')
    const modalImg = document.getElementById('modal-img')
    const infoSide = document.querySelector('.modal__info-side')
    
    // Exit animations
    modalImg.style.transition = 'all 0.5s ease'
    modalImg.style.opacity = '0'
    modalImg.style.transform = 'perspective(1000px) rotateY(-30deg) rotateX(10deg) scale(0.8)'
    
    infoSide.style.transition = 'all 0.4s ease'
    infoSide.style.opacity = '0'
    infoSide.style.transform = 'translateX(30px)'
    
    // Scale down entire modal
    setTimeout(() => {
        modalContent.style.transition = 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        modalContent.style.transform = 'scale(0.9) translateY(30px)'
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
                
                // Reset all animated elements
                const animatedElements = document.querySelectorAll('.modal__spec, .modal__description, .modal__button')
                animatedElements.forEach(el => {
                    el.style.transition = ''
                    el.style.transform = ''
                    el.style.opacity = ''
                })
            }, 300)
        }, 300)
    }, 100)
}

// Add click sound effect (optional)
const playClickSound = () => {
    // You can add a subtle click sound here if desired
    // const audio = new Audio('assets/sounds/click.mp3')
    // audio.volume = 0.3
    // audio.play()
}

// Enhanced event listeners
modelsCards.forEach(card => {
    card.addEventListener('click', () => {
        playClickSound()
        const carType = card.getAttribute('data-model')
        showModal(carType)
    })
})

modalClose.addEventListener('click', () => {
    playClickSound()
    hideModal()
})

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal()
    }
})

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show-modal')) {
        const infoSide = document.querySelector('.modal__info-side')
        
        switch(e.key) {
            case 'Escape':
                hideModal()
                break
            case 'ArrowDown':
                e.preventDefault()
                infoSide.scrollBy({ top: 100, behavior: 'smooth' })
                break
            case 'ArrowUp':
                e.preventDefault()
                infoSide.scrollBy({ top: -100, behavior: 'smooth' })
                break
            case 'PageDown':
                e.preventDefault()
                infoSide.scrollBy({ top: infoSide.clientHeight * 0.8, behavior: 'smooth' })
                break
            case 'PageUp':
                e.preventDefault()
                infoSide.scrollBy({ top: -infoSide.clientHeight * 0.8, behavior: 'smooth' })
                break
            case 'Home':
                e.preventDefault()
                infoSide.scrollTo({ top: 0, behavior: 'smooth' })
                break
            case 'End':
                e.preventDefault()
                infoSide.scrollTo({ top: infoSide.scrollHeight, behavior: 'smooth' })
                break
        }
    }
})

// Smooth scroll behavior for touch devices
function addTouchScrollSupport() {
    const modalInfoSide = document.querySelector('.modal__info-side')
    const loginForm = document.querySelector('.login__form')
    const welcomeContent = document.querySelector('.welcome__main-content')
    
    const elements = [modalInfoSide, loginForm, welcomeContent].filter(Boolean)
    
    elements.forEach(element => {
        if (element) {
            // Add momentum scrolling for iOS
            element.style.webkitOverflowScrolling = 'touch'
            
            // Add scroll event listeners
            element.addEventListener('scroll', () => {
                // Add scroll shadows for better UX
                if (element.scrollTop > 0) {
                    element.classList.add('scrolled-top')
                } else {
                    element.classList.remove('scrolled-top')
                }
                
                if (element.scrollTop < element.scrollHeight - element.clientHeight) {
                    element.classList.add('scrolled-bottom')
                } else {
                    element.classList.remove('scrolled-bottom')
                }
            })
        }
    })
}

// Initialize touch scroll support
document.addEventListener('DOMContentLoaded', addTouchScrollSupport)

// Re-add scroll support when modal opens
const originalShowModal = showModal
showModal = (carType) => {
    originalShowModal(carType)
    setTimeout(addTouchScrollSupport, 100)
}

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
sr.reveal(`.about__data`, `contact__content`, {origin: 'left'})
sr.reveal(`.about__video`, `contact__img`, {origin: 'right'})
sr.reveal(`.models__card`, {interval: 100})
sr.reveal(`.info__img`, {distance: '120px'})
sr.reveal(`.info__number`, {origin: 'bottom', distance: '80px', delay: 800})
sr.reveal(`.info__group`, {interval: 100, delay: 1300})
sr.reveal(`.footer__container`)
// ==========================================================================
// Aura Grand Hotel & Spa - Interactive Logic & Components
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Set Default Check-in and Check-out Dates ---
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const stripCheckIn = document.getElementById('stripCheckIn');
  const stripCheckOut = document.getElementById('stripCheckOut');
  const modalCheckIn = document.getElementById('modalCheckIn');
  const modalCheckOut = document.getElementById('modalCheckOut');

  if (stripCheckIn) stripCheckIn.value = formatDate(today);
  if (stripCheckOut) stripCheckOut.value = formatDate(tomorrow);
  if (modalCheckIn) modalCheckIn.value = formatDate(today);
  if (modalCheckOut) modalCheckOut.value = formatDate(tomorrow);

  // --- 2. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }

  // --- 3. Hero Carousel Slider ---
  const slides = document.querySelectorAll('.hero-slide');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 6000);

    if (nextSlideBtn) {
      nextSlideBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 6000);
      });
    }

    if (prevSlideBtn) {
      prevSlideBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 6000);
      });
    }
  }

  // --- 4. Promo Ticker Carousel ---
  const promoItems = document.querySelectorAll('.promo-item');
  const promoPrev = document.getElementById('promoPrev');
  const promoNext = document.getElementById('promoNext');
  let currentPromo = 0;

  function showPromo(index) {
    promoItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  if (promoItems.length > 0) {
    setInterval(() => {
      currentPromo = (currentPromo + 1) % promoItems.length;
      showPromo(currentPromo);
    }, 4500);

    if (promoNext) {
      promoNext.addEventListener('click', () => {
        currentPromo = (currentPromo + 1) % promoItems.length;
        showPromo(currentPromo);
      });
    }

    if (promoPrev) {
      promoPrev.addEventListener('click', () => {
        currentPromo = (currentPromo - 1 + promoItems.length) % promoItems.length;
        showPromo(currentPromo);
      });
    }
  }

  // --- 5. Room Showcase Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      roomCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Gallery Showcase Filter Tabs ---
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-gallery');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Booking Modal Logic ---
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const closeModalBtn = document.getElementById('closeBookingModal');
  const modalRoomSelect = document.getElementById('modalRoomSelect');
  const modalBookingForm = document.getElementById('modalBookingForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomName = btn.getAttribute('data-room');
      const roomPrice = btn.getAttribute('data-price');

      if (roomName && modalRoomSelect) {
        // Pre-select matching option if present
        for (let i = 0; i < modalRoomSelect.options.length; i++) {
          if (modalRoomSelect.options[i].value.includes(roomName)) {
            modalRoomSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (bookingModal) bookingModal.classList.add('active');
    });
  });

  if (closeModalBtn && bookingModal) {
    closeModalBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  // Handle Strip Booking Form Submit
  const bookingStripForm = document.getElementById('bookingStripForm');
  if (bookingStripForm) {
    bookingStripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (bookingModal) bookingModal.classList.add('active');
    });
  }

  // Handle Modal Form Submission Simulation
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (bookingModal) bookingModal.classList.remove('active');
      showToast('🎉 Simulation Success: Your reservation request has been processed!');
      modalBookingForm.reset();
    });
  }

  // Handle Contact Form Submit Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('📩 Message sent! Our team will contact you shortly.');
      contactForm.reset();
    });
  }

  // Open Contact Modal for Events
  document.querySelectorAll('.open-contact-modal, .open-dining-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Please fill out the contact form below for special reservations.');
      }
    });
  });

  // --- 8. Toast Notification Utility ---
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 4000);
    }
  }

  // --- 9. Floating Watermark Minimize Toggle ---
  const floatingWatermark = document.getElementById('floatingWatermark');
  const wmClose = document.getElementById('wmClose');

  if (wmClose && floatingWatermark) {
    wmClose.addEventListener('click', () => {
      floatingWatermark.classList.toggle('minimized');
      const icon = wmClose.querySelector('i');
      if (floatingWatermark.classList.contains('minimized')) {
        icon.classList.replace('fa-minus', 'fa-plus');
        wmClose.setAttribute('title', 'Expand Watermark');
      } else {
        icon.classList.replace('fa-plus', 'fa-minus');
        wmClose.setAttribute('title', 'Minimize Watermark');
      }
    });
  }

});

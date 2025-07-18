// Message Form Validation and Handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("name");
  const birthplaceInput = document.getElementById("birthplace"); // Changed from email to birthplace
  const subjectInput = document.getElementById("subject");
  const genderInputs = document.querySelectorAll('input[name="gender"]');

  // Error message elements
  const nameError = document.getElementById("nameError");
  const birthplaceError = document.getElementById("birthplaceError"); // Changed from emailError
  const phoneError = document.getElementById("phoneError");
  const subjectError = document.getElementById("subjectError");

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    birthplace: /^[a-zA-Z\s]{2,50}$/, // For "Tempat Lahir"
  };

  // Update current time display
  function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toString();
    const timeElement = document.getElementById("currentTime");
    if (timeElement) {
      timeElement.textContent = timeString;
    }
  }

  // Update time every second
  setInterval(updateCurrentTime, 1000);
  updateCurrentTime();

  // Update contact info display
  function updateContactInfo() {
    const name = nameInput.value.trim();
    const birthplace = birthplaceInput.value.trim();
    const message = subjectInput.value.trim();
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked'
    );

    // Update display elements
    const displayName = document.getElementById("displayName");
    const displayBirthplace = document.getElementById("displayBirthplace");
    const displayGender = document.getElementById("displayGender");
    const displayMessage = document.getElementById("displayMessage");

    // Always update with current values or keep existing if empty
    if (displayName) {
      displayName.textContent = name || "Muhammad Irfan Ali";
    }
    if (displayBirthplace) {
      displayBirthplace.textContent = birthplace || "-";
    }
    if (displayGender) {
      displayGender.textContent = selectedGender ? selectedGender.value : "-";
    }
    if (displayMessage) {
      displayMessage.textContent = message || "-";
    }
  }

  // Validation functions
  function validateName() {
    const name = nameInput.value.trim();
    if (!name) {
      showError(nameError, "Nama wajib diisi");
      return false;
    }
    if (!patterns.name.test(name)) {
      showError(
        nameError,
        "Masukkan nama yang valid (2-50 karakter, hanya huruf dan spasi)"
      );
      return false;
    }
    clearError(nameError);
    updateContactInfo();
    return true;
  }

  function validateBirthplace() {
    const birthplace = birthplaceInput.value.trim();
    if (!birthplace) {
      showError(birthplaceError, "Tempat lahir wajib diisi");
      return false;
    }
    if (!patterns.birthplace.test(birthplace)) {
      showError(
        birthplaceError,
        "Masukkan tempat lahir yang valid (2-50 karakter, hanya huruf dan spasi)"
      );
      return false;
    }
    clearError(birthplaceError);
    updateContactInfo();
    return true;
  }

  function validateGender() {
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked'
    );
    if (!selectedGender) {
      showError(phoneError, "Pilih jenis kelamin");
      return false;
    }
    clearError(phoneError);
    updateContactInfo();
    return true;
  }

  function validateMessage() {
    const message = subjectInput.value.trim();
    if (!message) {
      showError(subjectError, "Pesan wajib diisi");
      return false;
    }
    if (message.length < 10) {
      showError(subjectError, "Pesan minimal 10 karakter");
      return false;
    }
    clearError(subjectError);
    updateContactInfo();
    return true;
  }

  // Helper functions
  function showError(errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  function clearError(errorElement) {
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  // Event listeners
  if (nameInput) {
    nameInput.addEventListener("blur", validateName);
    nameInput.addEventListener("input", updateContactInfo);
  }

  if (birthplaceInput) {
    birthplaceInput.addEventListener("blur", validateBirthplace);
    birthplaceInput.addEventListener("input", updateContactInfo);
  }

  if (genderInputs) {
    genderInputs.forEach((radio) => {
      radio.addEventListener("change", validateGender);
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener("blur", validateMessage);
    subjectInput.addEventListener("input", updateContactInfo);
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateName();
      const isBirthplaceValid = validateBirthplace();
      const isGenderValid = validateGender();
      const isMessageValid = validateMessage();

      // If all validations pass
      if (isNameValid && isBirthplaceValid && isGenderValid && isMessageValid) {
        // Update contact info one final time to ensure display is correct
        updateContactInfo();
        
        // Show success message
        alert(
          "Pesan berhasil dikirim! Informasi telah diperbarui di sebelah kanan."
        );

        // DON'T reset form to preserve the displayed values
      } else {
        alert("Mohon lengkapi semua field dengan benar!");
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // Add animation to service cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".service-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Add typing effect to hero text
  const heroText = document.querySelector(".hero h2");
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Add parallax effect to hero section
  window.addEventListener("scroll", function () {
    const hero = document.querySelector(".hero");
    if (hero) {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    }
  });

  // Add hover effect to navigation
  document.querySelectorAll(".navigation a").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add form field focus effects
  document.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("focus", function () {
      if (this.parentElement) {
        this.parentElement.classList.add("focused");
      }
    });

    field.addEventListener("blur", function () {
      if (!this.value && this.parentElement) {
        this.parentElement.classList.remove("focused");
      }
    });
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Initial setup - call updateContactInfo to set initial values
  updateContactInfo();
});

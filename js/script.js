// Message Form Validation and Handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const genderInputs = document.querySelectorAll('input[name="gender"]');

  // Error message elements
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const subjectError = document.getElementById("subjectError");

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z\s]{2,50}$/, // Changed to match "Tempat Lahir" field
  };

  // Update current time display
  function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toString();
    const timeElement = document.querySelector(".contact-item p");
    if (timeElement) {
      timeElement.textContent = timeString;
    }
  }

  // Update time every second
  setInterval(updateCurrentTime, 1000);
  updateCurrentTime();

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
    updateContactInfo("nama", name);
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
      showError(emailError, "Tempat lahir wajib diisi");
      return false;
    }
    if (!patterns.email.test(email)) {
      showError(emailError, "Masukkan tempat lahir yang valid");
      return false;
    }
    clearError(emailError);
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
    updateContactInfo("gender", selectedGender.value);
    return true;
  }

  function validateSubject() {
    const subject = subjectInput.value.trim();
    if (!subject) {
      showError(subjectError, "Pesan wajib diisi");
      return false;
    }
    if (subject.length < 10) {
      showError(subjectError, "Pesan minimal 10 karakter");
      return false;
    }
    clearError(subjectError);
    updateContactInfo("pesan", subject);
    return true;
  }

  // Update contact info in real-time
  function updateContactInfo(field, value) {
    const contactItems = document.querySelectorAll(".contact-item");
    contactItems.forEach((item) => {
      const strong = item.querySelector("strong");
      if (strong) {
        if (field === "nama" && strong.textContent.includes("Nama:")) {
          item.querySelector("p").textContent = value;
        } else if (
          field === "gender" &&
          strong.textContent.includes("Jenis Kelamin:")
        ) {
          item.querySelector("p").textContent = value;
        } else if (field === "pesan" && strong.textContent.includes("Pesan:")) {
          item.querySelector("p").textContent = value;
        }
      }
    });
  }

  // Helper functions
  function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.previousElementSibling.classList.add("error");
  }

  function clearError(errorElement) {
    errorElement.textContent = "";
    errorElement.previousElementSibling.classList.remove("error");
  }

  // Real-time validation
  nameInput.addEventListener("blur", validateName);
  nameInput.addEventListener("input", validateName);

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", validateEmail);

  genderInputs.forEach((input) => {
    input.addEventListener("change", validateGender);
  });

  subjectInput.addEventListener("blur", validateSubject);
  subjectInput.addEventListener("input", validateSubject);

  // Clear errors on input
  nameInput.addEventListener("input", function () {
    if (nameError.textContent) {
      clearError(nameError);
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailError.textContent) {
      clearError(emailError);
    }
  });

  subjectInput.addEventListener("input", function () {
    if (subjectError.textContent) {
      clearError(subjectError);
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isGenderValid = validateGender();
    const isSubjectValid = validateSubject();

    // If all fields are valid, submit the form
    if (isNameValid && isEmailValid && isGenderValid && isSubjectValid) {
      submitForm();
    }
  });

  // Form submission function
  function submitForm() {
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked'
    );
    const formData = {
      name: nameInput.value.trim(),
      birthPlace: emailInput.value.trim(),
      gender: selectedGender ? selectedGender.value : "",
      message: subjectInput.value.trim(),
      timestamp: new Date().toISOString(),
    };

    // Disable submit button during submission
    const submitButton = form.querySelector(".submit-button");
    submitButton.disabled = true;
    submitButton.textContent = "Mengirim...";

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);

      // Show success message
      showSuccessMessage();

      // Reset form
      form.reset();

      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = "Submit";

      // Store data in localStorage
      storeMessageData(formData);

      // Reset contact info to default
      resetContactInfo();
    }, 1000);
  }

  // Reset contact info to default values
  function resetContactInfo() {
    const contactItems = document.querySelectorAll(".contact-item");
    contactItems.forEach((item) => {
      const strong = item.querySelector("strong");
      if (strong) {
        if (strong.textContent.includes("Nama:")) {
          item.querySelector("p").textContent = "Muhammad Irfan Ali";
        } else if (strong.textContent.includes("Jenis Kelamin:")) {
          item.querySelector("p").textContent = "Laki - Laki";
        } else if (strong.textContent.includes("Pesan:")) {
          item.querySelector("p").textContent = "Lihat Profil Saya Website";
        }
      }
    });
  }

  // Success message
  function showSuccessMessage() {
    let successMsg = document.querySelector(".success-message");
    if (!successMsg) {
      successMsg = document.createElement("div");
      successMsg.className = "success-message";
      form.parentNode.insertBefore(successMsg, form);
    }

    successMsg.textContent = "Terima kasih! Pesan Anda telah berhasil dikirim.";
    successMsg.classList.add("show");

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 5000);
  }

  // Store message data
  function storeMessageData(data) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(data);
    localStorage.setItem("messages", JSON.stringify(messages));
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

  // Active navigation highlighting
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navigation a");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});

// Utility functions
function getMessageData() {
  return JSON.parse(localStorage.getItem("messages")) || [];
}

function clearMessageData() {
  localStorage.removeItem("messages");
  console.log("All message data cleared");
}

// Additional interactive features
document.addEventListener("DOMContentLoaded", function () {
  // Add scroll to top button
  const scrollToTop = document.createElement("button");
  scrollToTop.innerHTML = "↑";
  scrollToTop.className = "scroll-to-top";
  scrollToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

  document.body.appendChild(scrollToTop);

  scrollToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollToTop.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  scrollToTop.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollToTop.style.display = "block";
    } else {
      scrollToTop.style.display = "none";
    }
  });

  // Add hover effects to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add typing animation to hero text
  const heroTitle = document.querySelector(".hero-content h2");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    setTimeout(typeWriter, 1000);
  }
});

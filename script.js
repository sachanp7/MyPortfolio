// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu on click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Scroll Animation
const fadeEls = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// Active nav on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
/*document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");

  if (!form) return; // agar form nahi mila to error nahi aayega

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const countryCode = document.getElementById("countrycode").value;
    const mobile = document.getElementById("mobile").value;
    const description = document.getElementById("description").value;

    // ===============================
    // GOOGLE FORM CONFIG (CUSTOMIZE THIS)
    // ===============================
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfyBHAJTQ-gYRSM8xso1kkkLI6kSv-YYHyQXOR7M6N3v4ITVA/formResponse";

    const formData = new FormData();

    // 👇 Yahan apne actual entry IDs lagana
    formData.append("entry.430677601", fullName);
    formData.append("entry.1438862244", email);
    formData.append("entry.29150875", countryCode);
    formData.append("entry.246917208", mobile);
    formData.append("entry.436986009", description);

    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(() => {
        form.reset();
        console.log(formMessage);
        if (formMessage) {
          formMessage.style.display = "block";
          formMessage.textContent = "Form submitted successfully ✅";

          setTimeout(() => {
            formMessage.style.display = "none";
          }, 3000);
        }
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  });

});*/

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
const formMessage = document.getElementById("form-message");
let dots = 0;

formMessage.textContent = "";
formMessage.style.display = "block";
const loadingInterval = setInterval(() => {
  dots = (dots + 1) % 4; // 0 → 3
  formMessage.textContent = "Submitting" + ".".repeat(dots);
}, 500);
  const data = {
    fullName: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    countryCode: document.getElementById("countrycode").value,
    mobile: document.getElementById("mobile").value,
    description: document.getElementById("description").value
  };
  const sheet_url="https://script.google.com/macros/s/AKfycbyi35Z5cv5xhd2TFD6DwkeodzmRliKKq0JLwPvrR-GG1GM6o_w4abYdXFFrdbEjIal6/exec";
  fetch(sheet_url, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    formMessage.style.display = "block";
    clearInterval(loadingInterval);
          formMessage.textContent = "Form submitted successfully ✅";

          setTimeout(() => {
            formMessage.style.display = "none";
          }, 3000);
    document.getElementById("contactForm").reset();
  })
  .catch(err => {
    formMessage.style.display = "block";
          formMessage.textContent = "Form Not submitted successfully";

          setTimeout(() => {
            formMessage.style.display = "none";
          }, 3000);
  });
});

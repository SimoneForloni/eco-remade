document.addEventListener("DOMContentLoaded", function () {
  // Function to apply translations
  const setLanguage = (lang) => {
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        element.innerHTML = translations[lang][key];
      }
    });

    // Update Typed.js strings if it exists
    if (window.typedInstance) {
      window.typedInstance.destroy(); // Destroy existing instance
      window.typedInstance = new Typed(".typed", {
        strings: [translations[lang].typed_strings_1, translations[lang].typed_strings_2],
        typeSpeed: 75,
        backSpeed: 50,
        loop: true,
        cursorChar: "_",
      });
    } else if (document.querySelector(".typed")) {
      // Initialize Typed.js if it hasn't been yet
      window.typedInstance = new Typed(".typed", {
        strings: [translations[lang].typed_strings_1, translations[lang].typed_strings_2],
        typeSpeed: 75,
        backSpeed: 50,
        loop: true,
        cursorChar: "_",
      });
    }

    document.documentElement.lang = lang; // Set the HTML lang attribute

    const pageKeys = getPageKeys();
    if (translations[lang] && translations[lang][pageKeys.title]) {
      document.title = translations[lang][pageKeys.title];
    }
    if (translations[lang] && translations[lang][pageKeys.description]) {
      document.querySelector('meta[name="description"]').content = translations[lang][pageKeys.description];
    }

    localStorage.setItem("language", lang);
  };

  // Determine current page for dynamic title and meta description
  const getPageKeys = () => {
    const path = window.location.pathname;
    if (path.includes("about.html")) {
      return { title: "page_title_about", description: "page_description_about" };
    } else if (path.includes("services.html")) {
      return { title: "page_title_services", description: "page_description_services" };
    } else if (path.includes("contact.html")) {
      return { title: "page_title_contact", description: "page_description_contact" };
    } else {
      return { title: "page_title_home", description: "page_description_home" };
    }
  };

  // Intersection Observer for section animations
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Typed.js
  // Initial setup for Typed.js will be handled by setLanguage
  // We need to store the instance globally to destroy and re-initialize
  if (document.querySelector(".typed")) {
    window.typedInstance = new Typed(".typed", {
      strings: ["Giardinaggio.", "Pulizie."], // Placeholder, will be updated by setLanguage
      typeSpeed: 75,
      backSpeed: 50,
      loop: true,
      cursorChar: "_",
    });
  }


  // Particles.js
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }

  const doc = document.documentElement;

  // Function to apply theme
  const applyTheme = (theme) => {
    doc.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Settings Panel
  const settingsBtn = document.getElementById("settings-btn");
  const closeSettingsBtn = document.getElementById("close-settings-btn");
  const settingsPanel = document.getElementById("settings-panel");
  const themeSelect = document.getElementById("theme-select");
  const languageSelect = document.getElementById("language-select");
  const notificationsToggle = document.getElementById("notifications-toggle");

  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      settingsPanel.classList.add("show");
    });
  }

  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener("click", () => {
      settingsPanel.classList.remove("show");
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value);
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  if (notificationsToggle) {
    notificationsToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        alert("Notifications enabled");
      } else {
        alert("Notifications disabled");
      }
    });
  }

  // Initial theme and language setting
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  if (themeSelect) {
    themeSelect.value = savedTheme;
  }

  const savedLanguage = localStorage.getItem("language") || "it"; // Default to Italian
  setLanguage(savedLanguage);
  if (languageSelect) {
    languageSelect.value = savedLanguage;
  }
});
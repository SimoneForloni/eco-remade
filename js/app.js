document.addEventListener("DOMContentLoaded", function () {
	// ==========================================
  // THEME MANAGEMENT
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  
  // Function to update theme icon
  const updateThemeIcon = (theme) => {
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon";
      }
    }
  };

  // Sync icon with current theme on page load
  const currentTheme = localStorage.getItem("theme") || "light";
  updateThemeIcon(currentTheme);

  // Theme toggle functionality
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }


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

  
});
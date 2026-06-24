document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       THEME TOGGLE LOGIC
       ================================================== */
    const themeBtn = document.getElementById("theme-toggle");
    const htmlEl = document.documentElement;
    const themeIcon = themeBtn.querySelector("i");

    themeBtn.addEventListener("click", () => {
        if (htmlEl.getAttribute("data-theme") === "light") {
            htmlEl.setAttribute("data-theme", "dark");
            themeIcon.className = "fa-solid fa-sun";
        } else {
            htmlEl.setAttribute("data-theme", "light");
            themeIcon.className = "fa-solid fa-moon";
        }
    });

    /* ==================================================
       HEADER SCROLL EFFECT
       ================================================== */
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==================================================
       EMOJI CURSOR LOGIC
       ================================================== */
    const cursor = document.getElementById("emoji-cursor");
    
    window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    function attachCursorEvents() {
        const interactables = document.querySelectorAll(".interactive-element, a, button, .portfolio-bubble");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.innerText = "🤩";
                cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
            });
            el.addEventListener("mouseleave", () => {
                cursor.innerText = "👆";
                cursor.style.transform = "translate(-50%, -50%) scale(1)";
            });
        });
    }

    // Call initially
    attachCursorEvents();

    /* ==================================================
       WATER RIPPLE CLICK EFFECT
       ================================================== */
    window.addEventListener("click", (e) => {
        // Prevent ripple on theme button to avoid overlapping logic visually (optional)
        if(e.target.closest('#theme-toggle')) return;

        const ripple = document.createElement("div");
        ripple.className = "ripple";
        
        const colors = ["#00E5FF", "#E6007A", "#FFC107", "#005BCA"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        ripple.style.border = `4px solid ${randomColor}`;
        ripple.style.left = (e.clientX - 20) + "px";
        ripple.style.top = (e.clientY - 20) + "px";
        ripple.style.width = "40px";
        ripple.style.height = "40px";

        document.body.appendChild(ripple);

        setTimeout(() => { ripple.remove(); }, 600);
    });

    /* ==================================================
       PORTFOLIO HIGH-DENSITY BUBBLES
       ================================================== */
    const portfolioContainer = document.getElementById("bubble-cloud-container");
    
    // We want lots of small grids/bubbles
    const projects = [
        { title: "SEO Boost", time: 2 }, { title: "Ad Shoot", time: 4 }, { title: "Brand Identity", time: 6 },
        { title: "Social Campaign", time: 8 }, { title: "VFX Shot 1", time: 10 }, { title: "Color Grading", time: 12 },
        { title: "Sound Design", time: 14 }, { title: "Gen AI Video", time: 16 }, { title: "Voice Cloning", time: 18 },
        { title: "React App", time: 20 }, { title: "API Backend", time: 22 }, { title: "Unity Game", time: 24 },
        { title: "MoCap Data", time: 26 }, { title: "Unreal Env", time: 28 }, { title: "3D Animation", time: 30 }
    ];

    const containerWidth = portfolioContainer.offsetWidth || 1000;
    const containerHeight = 600;

    projects.forEach(proj => {
        const item = document.createElement("div");
        item.className = "portfolio-bubble interactive-element";
        
        // Random size between 100px and 160px
        const size = Math.floor(Math.random() * 60) + 100;
        
        // Random position within container
        const posX = Math.floor(Math.random() * (containerWidth - size));
        const posY = Math.floor(Math.random() * (containerHeight - size));

        item.style.width = size + "px";
        item.style.height = size + "px";
        
        // Only apply absolute positioning for desktop cloud, mobile handles via CSS wrap
        if (window.innerWidth > 900) {
            item.style.left = posX + "px";
            item.style.top = posY + "px";
        }

        item.innerHTML = `
            <video preload="metadata" muted playsinline>
                <source src="assets/media/videos/MAGSshowreel.mp4#t=${proj.time}" type="video/mp4">
            </video>
            <div class="bubble-overlay">
                <h3>${proj.title}</h3>
            </div>
        `;
        
        portfolioContainer.appendChild(item);
    });

    // Re-attach cursor events for dynamic elements
    attachCursorEvents();

});

document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    /* ==================================================
       LOADING SCREEN ANIMATION
       ================================================== */
    const loadingScreen = document.getElementById("loading-screen");
    const progressBar = document.getElementById("loading-progress");
    const percentText = document.getElementById("loading-percentage");
    const navMenuWrapper = document.getElementById("nav-menu-wrapper");
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + "%";
        percentText.innerText = progress + "%";
        
        if (progress === 100) {
            clearInterval(interval);
            gsap.to(loadingScreen, {
                y: "-100%",
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.5,
                onComplete: () => {
                    loadingScreen.style.display = "none";
                    initHeroAnimations();
                }
            });
        }
    }, 150);

    /* ==================================================
       HERO ANIMATIONS (Post Load)
       ================================================== */
    function initHeroAnimations() {
        // Roll out Nav Menu
        gsap.to(navMenuWrapper, {
            width: "auto",
            opacity: 1,
            duration: 1.5,
            ease: "power4.out"
        });

        // Intro split layout elements
        gsap.from(".neon-tv", { x: -100, opacity: 0, duration: 1.5, ease: "power4.out" });
        gsap.from(".hero-banner-container", { x: 100, opacity: 0, duration: 1.5, ease: "power4.out" });
    }

    /* ==================================================
       SMOOTH SCROLL & CENTER SECTIONS
       ================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Portfolio looks better aligned to the top due to its grid layout
                if (targetId === '#portfolio') {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' 
                    });
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });

    /* ==================================================
       HEADER SCROLL EFFECT (Collapsing Nav & Hover Expand)
       ================================================== */
    const navLogo = document.getElementById("nav-logo");
    const headerContainer = document.getElementById("header-container");
    let isScrolled = false;
    
    // Collapse only when reaching the About section
    ScrollTrigger.create({
        trigger: "#about",
        start: "top 150px", // Triggers when the top of About section is 150px from top of screen
        onEnter: () => {
            // Scrolled past Hero: roll in menu
            gsap.to(navMenuWrapper, { width: 0, opacity: 0, duration: 0.5, ease: "power2.in" });
            isScrolled = true;
        },
        onLeaveBack: () => {
            // Scrolled back up into Hero: roll menu out permanently
            gsap.to(navMenuWrapper, { width: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
            isScrolled = false;
        }
    });

    // Hover logic: When scrolled down, pointing at the header area expands the menu
    if (headerContainer) {
        headerContainer.addEventListener("mouseenter", () => {
            if (isScrolled) {
                gsap.to(navMenuWrapper, { width: "auto", opacity: 1, duration: 0.5, ease: "power2.out", overwrite: true });
            }
        });
        
        headerContainer.addEventListener("mouseleave", () => {
            if (isScrolled) {
                // Disappear over 1.5 seconds when hovered out
                gsap.to(navMenuWrapper, { width: 0, opacity: 0, duration: 1.5, ease: "power2.inOut", overwrite: true });
            }
        });
    }

    /* ==================================================
       GSAP HORIZONTAL SCROLL (SERVICES)
       ================================================== */
    const servicesSection = document.querySelector(".services-section");
    const servicesTrack = document.getElementById("services-track");
    const servicesCenterTitle = document.getElementById("services-center-title");
    
    if (servicesTrack) {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            // Calculate total width to scroll (track width minus window width)
            const getScrollAmount = () => -(servicesTrack.scrollWidth - window.innerWidth);
            
            const tween = gsap.to(servicesTrack, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: servicesSection,
                start: "top top",
                end: () => `+=${servicesTrack.scrollWidth - window.innerWidth}`,
                pin: true,
                animation: tween,
                scrub: 1,
                invalidateOnRefresh: true
            });
        });
    }

    /* ==================================================
       PORTFOLIO MASONRY GENERATION
       ================================================== */
    const portfolioGrid = document.getElementById("portfolio-masonry");
    
    if (portfolioGrid) {
        const portfolioItems = [
            { title: "Digital Marketing", class: "" },
            { title: "SEO Optimization", class: "wide" },
            { title: "Social Media", class: "" },
            
            { title: "Brand Strategy", class: "" },
            { title: "Political Campaigns", class: "" },
            { title: "Ad Shoots", class: "wide" },
            
            { title: "Corporate Films", class: "tall" },
            { title: "VFX & Post", class: "" },
            { title: "AI Video Gen", class: "" },
            { title: "Mobile Apps", class: "" },
            
            // "Corporate Films" takes up the left slot of this row
            { title: "Voice Cloning", class: "wide" },
            { title: "3D Modeling", class: "" },
            
            { title: "Web Dev", class: "wide" },
            { title: "E-Commerce", class: "wide" },
            
            { title: "Virtual Prod", class: "wide" },
            { title: "Unity Dev", class: "wide" }
        ];

        portfolioItems.forEach((itemData, i) => {
            const item = document.createElement("div");
            item.className = `portfolio-item ${itemData.class}`;
            
            // Generate a random timestamp offset for the preview screenshot
            const randomOffset = Math.floor(Math.random() * 20) + 2; 

            item.innerHTML = `
                <video src="assets/media/videos/MAGSshowreel.mp4#t=${randomOffset}" muted loop playsinline preload="auto"></video>
                <div class="portfolio-overlay">
                    <h3>${itemData.title}</h3>
                </div>
            `;
            
            // Auto play on hover logic
            const videoElement = item.querySelector("video");
            item.addEventListener("mouseenter", () => videoElement.play().catch(() => {}));
            item.addEventListener("mouseleave", () => {
                videoElement.pause();
                videoElement.currentTime = randomOffset; // Reset to the preview frame
            });

            portfolioGrid.appendChild(item);
        });
    }

    /* ==================================================
       SPECIAL TILE CLICK HANDLER
       ================================================== */
    const specialTile = document.querySelector(".special-tile");
    if (specialTile) {
        specialTile.style.cursor = "pointer";
        specialTile.addEventListener("click", () => {
            const portfolioSection = document.getElementById("portfolio");
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    /* ==================================================
       BACKGROUND MUSIC LOGIC
       ================================================== */
    const tvMuteToggle = document.getElementById("tv-mute-toggle");
    
    // Create an audio element if one doesn't exist, or we can use the video audio.
    // The user requested to play showreel audio as background music in an earlier step, 
    // but right now the video itself is muted (muted autoplay loop).
    // Let's control the video's mute state instead of creating a new audio element!
    const homeVideo = document.getElementById("home-video");

    if (tvMuteToggle && homeVideo) {
        tvMuteToggle.addEventListener("click", () => {
            const icon = tvMuteToggle.querySelector("i");
            
            if (homeVideo.muted) {
                homeVideo.muted = false;
                homeVideo.volume = 0.5; // Set reasonable volume
                icon.classList.remove("fa-volume-mute");
                icon.classList.add("fa-volume-up");
                tvMuteToggle.classList.add("playing");
            } else {
                homeVideo.muted = true;
                icon.classList.remove("fa-volume-up");
                icon.classList.add("fa-volume-mute");
                tvMuteToggle.classList.remove("playing");
            }
        });
    }

    /* ==================================================
       RAINING FIRE PARTICLES
       ================================================== */
    const canvas = document.getElementById("fire-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100; // Low intensity

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 2 + 0.5; // fall speed
                this.speedX = (Math.random() - 0.5) * 1; // slight wind
                // Glowing orange/red color
                this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 50)}, 0, ${Math.random()})`;
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                // Reset if it falls off screen
                if (this.y > canvas.height) {
                    this.y = 0 - this.size;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(255, 100, 0, 0.8)";
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});

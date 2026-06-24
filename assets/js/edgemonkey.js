document.addEventListener("DOMContentLoaded", () => {
    const edgeMonkey = document.getElementById("edge-monkey");
    const monkeySpeech = document.getElementById("monkey-speech");
    const monkeyText = document.getElementById("monkey-text");
    const leftEye = document.getElementById("monkey-eye-left");
    const rightEye = document.getElementById("monkey-eye-right");

    let isSpeaking = false;
    let isJumping = false;

    // 50 Random Boasts
    const boasts = [
        "MAGS makes the best VFX! 🎬",
        "Our SEO will 10x your traffic! 🚀",
        "We build apps that users actually love! 💖",
        "Need a viral campaign? We got you! 🔥",
        "Our Gen-AI workflows are from the future! 🤖",
        "We don't just build websites, we craft experiences! 🎨",
        "Looking for 3D Animation? You found the pros! 🎥",
        "We dominate Social Media! 📱",
        "Cinematic Color Grading is our middle name! 🌈",
        "Our Backend Architecture scales infinitely! ☁️",
        "We build the sleekest UI/UX! ✨",
        "Virtual Production? We do it in our sleep! 🎮",
        "Our YouTube growth strategies are unmatched! 📈",
        "We shoot the best commercial ads! 📽️",
        "Need a custom AI Chatbot? Easy! 💬",
        "We can scrape any data you need! 📊",
        "Our Unity Game Devs are wizards! 🧙‍♂️",
        "Unreal Engine? We're basically Epic Games! 🕹️",
        "We write the best AI prompts! 🧠",
        "Voice cloning so good it's scary! 🗣️",
        "Enterprise CI/CD Pipelines built perfectly! ⚙️",
        "Political campaigning done right! 🏛️",
        "Brand identity that sticks! 🏷️",
        "High conversion thumbnails guaranteed! 🖼️",
        "We do End-to-End Content Creation! 📝",
        "Sound design that blows your mind! 🎧",
        "Professional Audio Engineering at its finest! 🎤",
        "We can automate your entire workflow! 🔄",
        "Script-to-Video in seconds! ⚡",
        "We build Progressive Web Apps! 🌐",
        "API integration? Piece of cake! 🍰",
        "Microservices architecture done perfectly! 🏗️",
        "Infrastructure security is our priority! 🔒",
        "2D Animation that tells a story! 🖌️",
        "Real-time rendering experts! 🏎️",
        "MoCap clean-up wizards! 🕺",
        "We turn ideas into digital gold! 💰",
        "Your competitors are scared of us! 👻",
        "We make digital magic happen! 🪄",
        "The most creative agency in town! 👑",
        "We don't follow trends, we set them! 🎯",
        "Pixel perfect designs every time! 📐",
        "We speak fluent code! 💻",
        "Our servers never sleep! 🦉",
        "We build brands that people remember! 🧠",
        "From concept to delivery, we handle it all! 📦",
        "We make your data work for you! 📈",
        "The smartest AI engineers work here! 🧠",
        "We bring your imagination to life! 🌟",
        "MAGS Digital Services is simply the best! 💯"
    ];

    /* ==================================================
       BOASTING LOGIC
       ================================================== */
    function speakRandomBoast() {
        if (isSpeaking || isJumping) return;
        isSpeaking = true;

        const boast = boasts[Math.floor(Math.random() * boasts.length)];
        monkeyText.innerText = boast;
        monkeySpeech.classList.add("show");

        setTimeout(() => {
            monkeySpeech.classList.remove("show");
            isSpeaking = false;
        }, 5000);
    }

    // Random boast every 8-15 seconds
    setInterval(() => {
        if (Math.random() > 0.3) {
            speakRandomBoast();
        }
    }, 12000);

    /* ==================================================
       JUMPING LOGIC (Click Interaction)
       ================================================== */
    edgeMonkey.addEventListener("click", () => {
        if (isJumping) return;
        isJumping = true;

        // Hide speech bubble if active
        monkeySpeech.classList.remove("show");
        isSpeaking = false;

        const isRightEdge = edgeMonkey.classList.contains("right-edge");

        // Animate out
        gsap.to(edgeMonkey, {
            x: isRightEdge ? 100 : -100,
            duration: 0.3,
            ease: "back.in(1.7)",
            onComplete: () => {
                // Swap classes
                if (isRightEdge) {
                    edgeMonkey.classList.remove("right-edge");
                    edgeMonkey.classList.add("left-edge");
                } else {
                    edgeMonkey.classList.remove("left-edge");
                    edgeMonkey.classList.add("right-edge");
                }

                // Randomize vertical position (20% to 80% from top)
                const randomTop = Math.floor(Math.random() * 60) + 20;
                edgeMonkey.style.top = `${randomTop}%`;

                // Animate in
                gsap.fromTo(edgeMonkey, 
                    { x: isRightEdge ? -100 : 100 }, 
                    { x: 0, duration: 0.5, ease: "back.out(1.7)", onComplete: () => isJumping = false }
                );
            }
        });
    });

    /* ==================================================
       WATCHING LOGIC
       ================================================== */
    // The monkey's pupils should look left or right based on mouse position
    window.addEventListener("mousemove", (e) => {
        const monkeyRect = edgeMonkey.getBoundingClientRect();
        const monkeyX = monkeyRect.left + (monkeyRect.width / 2);
        
        // Simple pupil shift
        if (e.clientX < monkeyX) {
            // Look left
            leftEye.setAttribute("cx", "32");
            rightEye.setAttribute("cx", "62");
        } else {
            // Look right
            leftEye.setAttribute("cx", "38");
            rightEye.setAttribute("cx", "68");
        }
    });

});

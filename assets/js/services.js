const sliderData = [
    {
        title: "Digital Marketing & SEO",
        items: ["Content Strategy & Planning", "Advanced SEO", "YouTube CMS Admin", "Channel Growth"]
    },
    {
        title: "Social Media & Brand",
        items: ["End-to-End Social Management", "Brand Identity Design", "Graphic Design", "Thumbnails"]
    },
    {
        title: "Ads & Campaigns",
        items: ["Political Campaigning", "Ad Campaign Strategy", "Commercial Shoots"]
    },
    {
        title: "Pre & Post Production",
        items: ["End-to-End Content Creation", "Video Editing", "Cinematic Color Grading", "VFX Integration"]
    },
    {
        title: "Audio Engineering",
        items: ["Sound Design", "Professional Audio Engineering"]
    },
    {
        title: "AI Generation",
        items: ["AI Copywriting", "AI Video & Synthetic Media", "Text-to-Speech & Voice Cloning"]
    },
    {
        title: "AI Engineering",
        items: ["Prompt Engineering", "Model Fine-Tuning", "Autonomous Agents"]
    },
    {
        title: "Workflow Automation",
        items: ["Script-to-Video Pipelines", "Web Automation", "Data Scraping"]
    },
    {
        title: "App Development",
        items: ["Full-Stack Web Dev", "Mobile Apps", "UI/UX Design & Prototyping"]
    },
    {
        title: "Cloud & Backend",
        items: ["API Development", "Microservices", "Cloud Architecture"]
    },
    {
        title: "DevOps",
        items: ["Enterprise CI/CD", "Security Auditing"]
    },
    {
        title: "Game Engines",
        items: ["Unity Development", "Unreal Engine Development"]
    },
    {
        title: "Animation & VFX",
        items: ["3D/2D Animation", "Real-time Rendering", "MoCap Processing", "Virtual Production"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const sliderTrack = document.getElementById("slider-track");
    const prevBtn = document.getElementById("slider-prev");
    const nextBtn = document.getElementById("slider-next");

    // Populate Slider
    sliderData.forEach(slide => {
        const card = document.createElement("div");
        card.className = "slider-card interactive-element";
        
        let itemsHtml = slide.items.map(item => `<li>${item}</li>`).join("");
        
        card.innerHTML = `
            <h3>${slide.title}</h3>
            <ul>${itemsHtml}</ul>
        `;
        
        sliderTrack.appendChild(card);
    });

    // Slider Logic
    let currentPosition = 0;
    const cardWidth = 380; // 350px width + 30px gap roughly
    
    nextBtn.addEventListener("click", () => {
        const maxScroll = -(sliderTrack.scrollWidth - sliderTrack.parentElement.offsetWidth);
        currentPosition -= cardWidth;
        
        if (currentPosition < maxScroll) {
            currentPosition = maxScroll; // Don't scroll past end
        }
        
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    });

    prevBtn.addEventListener("click", () => {
        currentPosition += cardWidth;
        
        if (currentPosition > 0) {
            currentPosition = 0; // Don't scroll past start
        }
        
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    });
});

// Create floating particles
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            const particleCount = 20;            
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 5px and 20px
                const size = Math.random() * 15 + 5;
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Random animation duration between 15s and 30s
                const duration = Math.random() * 15 + 15;
                
                // Random animation delay
                const delay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Intersection Observer for animations
        function setupAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            // Observe all animated elements
            document.querySelectorAll('.about-img, .about-text, .skill-card, .project-card, .contact-info, .contact-form').forEach(el => {
                observer.observe(el);
            });
        }
        
        // Navbar scroll effect
        function setupNavbar() {
            const nav = document.querySelector('nav');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    nav.style.padding = '10px 0';
                    nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                    nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                } else {
                    nav.style.padding = '20px 0';
                    nav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
                    nav.style.boxShadow = 'none';
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
    
        // Toggle the menu when the hamburger is clicked
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    
        // Optional: Close the menu when a link is clicked (good for single-page sites)
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    });
        
        // Smooth scrolling for navigation links
        function setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
function initMap() {
    // 1. The new coordinates for "Global Institute of Technology"
    const myLocation = { lat: 26.788524, lng: 75.833962 };

    // 2. Custom dark-mode styles (these stay the same)
    const mapStyles = [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
        { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
        { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
        { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
    ];

    // 3. Create the map object (this stays the same)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16, // Zoomed in a little more for a specific building
        center: myLocation,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    });

    // 4. Add a marker to your new location
    new google.maps.Marker({
        position: myLocation,
        map: map,
        title: "Global Institute of Technology", // Updated title
    });
}
       
        // Initialize everything when DOM content is loaded
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            setupAnimations();
            setupNavbar();
            setupSmoothScroll();
            setupContactForm();
        });

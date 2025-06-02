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
        
        // Contact form submission to MongoDB
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        
        if (!contactForm) return;
    
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
    
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
    
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                date: new Date()
            };
    
            try {
                const response = await fetch('http://localhost:5000/api/v1/contact', {
                    method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            let responseData;

            try {
                responseData = await response.json();
            } catch (jsonError) {
                const rawText = await response.text();
                console.warn("Could not parse JSON:", rawText);
                throw new Error("Invalid JSON response");
            }

            if (response.ok) {
                formStatus.innerHTML = `
                    <div style="color: var(--accent-color); padding: 10px;">
                        ${responseData.message || 'Your message has been sent successfully!'}
                    </div>
                `;
                contactForm.reset();
            } else {
                formStatus.innerHTML = `
                    <div style="color: #ff3860; padding: 10px;">
                        ${responseData?.error || 'Something went wrong. Please try again later.'}
                    </div>
                `;
            }

        } catch (error) {
            console.error('Submission error:', error);
            formStatus.innerHTML = `
                <div style="color: #ff3860; padding: 10px;">
                    ${error.message === "Invalid JSON response"
                        ? "Server returned an invalid response. Please contact support."
                        : "Network error. Please check your connection."}
                </div>
            `;
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;

            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }
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

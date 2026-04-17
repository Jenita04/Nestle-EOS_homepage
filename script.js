/**
 * script.js
 * Handles App Routing and dynamic DOM injection
 */

const domains = [
    {
        id: 'manufacturing',
        title: 'Manufacturing',
        icon: 'ph-factory',
        color: 'var(--c-mfg)',
        url: 'https://nestleai-ops.preview.emergentagent.com/dashboard',
        desc: 'Operational Intelligence, Factory KPIs & Yield Analytics',
        redirect: true
    },
    {
        id: 'supply-chain',
        title: 'Supply Chain Workflow',
        icon: 'ph-truck',
        color: 'var(--c-sc)',
        url: 'https://supply-chain-tower.lovable.app/', 
        desc: 'End-to-end Logistics Tracking & Inventory Optimization'
    },
    {
        id: 'hr',
        title: 'Human Resources',
        icon: 'ph-users-three',
        color: 'var(--c-hr)',
        url: 'https://nestle-eos-production.up.railway.app/',
        desc: 'Employee Engagement, Talent Management & Workforce Planning'
    },
    {
        id: 'finance',
        title: 'Finance Central',
        icon: 'ph-chart-line-up',
        color: 'var(--c-fin)',
        url: 'https://id-preview--7686136b-200b-4a2a-b4b8-bd10c3565fa6.lovable.app/?__lovable_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY0VyMW1lVHByRlB3MmxFdmFqTlR0Ump6aWNDMiIsInByb2plY3RfaWQiOiI3Njg2MTM2Yi0yMDBiLTRhMmEtYjRiOC1iZDEwYzM1NjVmYTYiLCJhY2Nlc3NfdHlwZSI6InByb2plY3QiLCJpc3MiOiJsb3ZhYmxlLWFwaSIsInN1YiI6Ijc2ODYxMzZiLTIwMGItNGEyYS1iNGI4LWJkMTBjMzU2NWZhNiIsImF1ZCI6WyJsb3ZhYmxlLWFwcCJdLCJleHAiOjE3NzY2NzAzNzEsIm5iZiI6MTc3NjA2NTU3MSwiaWF0IjoxNzc2MDY1NTcxfQ.iMjOOLeYUMfvOtv7tO92TeGEPsS7AaoFCWVWfJAGdO63dczSMZifufHgEEtpr_w3--ndkA5QojdccgNCClfZnfjqfYItDMNFBypSJ9LD2ny_v3oYL8VDxzcy0cIGQJF_mb-oTPWsn4fZqrqJWqM1hdXACEjHg__RdigRxtx0HkNvY7NhRGKmEZPYe7UHKC7Cm6wh0Q5v83zhCco-IwezIr3e0DBqiOh8tFMvC3SpWpJgbS8CfRpHzkqZnGSLosBzvBYSqeXylHSo0E7jyo3A7grtRb9TzUPne-IhmYEFoY5LXuOBGIgWL635FuMzF5MYDKr031h9BBNdbpsZT0hcoK_Hv1kt8AxTesWfnl9l7SIubYZL7dPh1kORssIVSv7UJJ6YFv0oU4GW6WzAHBOShEcThJDKizbgFoQICPfYZqcht_dDXGXP7_2a7mrnXYHL4Yc9zxbJJsHXsUlWFqz5k2ghAAnJYhw0RJ-8wKOamocqdSCdAjmfiwDZshkvEvyDNMZxdux8tUmWQ_ghJechwZmT-Ti_I-JfB4wyG3WXUTsVDVzdSqBQo_a4copwsEeaTVs4eUKOR6ZpmoBLTmJoxm9VR5FJq56yRKtBWEL242JwqaTMFhmUTrZBQlIkgNHDHqTB6X2fGgEx5I7YzJi3j5xyuDmIoUjhV_gUoMHDOx8',
        desc: 'Financial Forecasting, Profitability & Real-time Reporting'
    },
    {
        id: 'it',
        title: 'IT Operations',
        icon: 'ph-cpu',
        color: 'var(--c-it)',
        url: 'https://huggingface.co/spaces/Gautam0003/IT_Demo',
        desc: 'Infrastructure Monitoring, Security Posture & ITSM Support',
        redirect: true
    },
    {
        id: 'commercial',
        title: 'Commercial & Trading',
        icon: 'ph-shopping-cart',
        color: 'var(--c-com)',
        url: 'https://alm-commercial-dashboard.vercel.app/',
        desc: 'Sales Analytics, Market Trends & Supply-Demand Matching'
    }
];

function initializeDashboard() {
    const container = document.getElementById('cards-container');
    const homeView = document.getElementById('home-view');
    const appView = document.getElementById('app-view');
    const btnBack = document.getElementById('btn-back');
    const btnRefresh = document.getElementById('btn-refresh');
    const btnNewTab = document.getElementById('btn-new-tab');
    
    const appTitle = document.getElementById('app-title');
    const appIcon = document.getElementById('app-icon');
    const iframe = document.getElementById('main-iframe');

    if (!container) return;

    // Build Cards
    domains.forEach((item, index) => {
        // Create stagger animation delay
        const delay = (index * 0.1).toFixed(1);
        
        const card = document.createElement('div');
        card.className = 'domain-card';
        card.style.setProperty('--card-color', item.color);
        card.style.animationDelay = `${delay}s`;
        
        card.innerHTML = `
            <div class="card-icon-wrapper">
                <i class="ph ${item.icon}"></i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="card-action">
                Enter Module <i class="ph ph-arrow-right"></i>
            </div>
        `;
        
        card.addEventListener('click', () => {
            if (item.redirect && item.url) {
                window.location.href = item.url;
            } else {
                openApp(item);
            }
        });
        
        container.appendChild(card);
    });

    // App Navigation Logic
    function openApp(domain) {
        // Transition Views
        homeView.classList.remove('active');
        homeView.classList.add('hidden');
        
        setTimeout(() => {
            appView.classList.remove('hidden');
            appView.classList.add('active');
            
            // Set Data
            appTitle.textContent = domain.title;
            appTitle.style.color = domain.color;
            appIcon.className = `ph ${domain.icon}`;
            appIcon.style.color = domain.color;
            
            // Set Links
            const targetUrl = domain.url || 'about:blank';
            
            if (!domain.url) {
                // If it's empty (like supply chain), show a placeholder HTML via data URI
                const placeholder = `
                    <div style="font-family: sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; background: #eef2f6; color: #5e6a80; text-align: center; padding: 20px;">
                        <div>
                            <svg width="64" height="64" viewBox="0 0 256 256" fill="var(--primary)" style="margin-bottom:20px; opacity: 0.5;"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM180.69,165.31a8,8,0,1,1-11.32,11.32l-32-32a8,8,0,0,1-2.26-4.24l-8-32A8,8,0,0,1,138.83,96l32,8a8,8,0,0,1,4.24,2.26Zm-16.74-27.18-20.73-5.18,5.18,20.73a8,8,0,0,1-1,7l0,0,0,0ZM96,184a80.11,80.11,0,0,1-65.4-33.82,8,8,0,1,1,13.06-9.27A64,64,0,1,0,64,96h18.34L71,107.31a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0l24,24A8,8,0,1,1,107.69,107.31L96,95.63V104A80.09,80.09,0,0,1,96,184Z"></path></svg>
                            <h2>Module In Development</h2>
                            <p>The Supply Chain module is currently being provisioned.</p>
                        </div>
                    </div>
                `;
                iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(placeholder);
                btnNewTab.style.display = 'none';
            } else {
                iframe.src = targetUrl;
                btnNewTab.href = targetUrl;
                btnNewTab.style.display = 'flex';
                
                // Fallback direct link
                document.getElementById('fallback-new-tab').href = targetUrl;
            }
            
            // Hide iframe fallback state initially
            document.querySelector('.iframe-fallback').classList.remove('active');
            
        }, 300); // Wait for fade out
    }
    
    function closeApp() {
        appView.classList.remove('active');
        appView.classList.add('hidden');
        
        setTimeout(() => {
            homeView.classList.remove('hidden');
            homeView.classList.add('active');
            
            // Clear iframe to stop resources
            iframe.src = 'about:blank';
        }, 300);
    }
    
    // Back Button
    btnBack.addEventListener('click', closeApp);
    
    // Refresh Button
    btnRefresh.addEventListener('click', () => {
        const currentSrc = iframe.src;
        iframe.src = 'about:blank';
        setTimeout(() => {
            iframe.src = currentSrc;
        }, 100);
    });

    // Note: Cross-origin iframes that fail to load (due to X-Frame-Options) don't fire explicit error events we can catch reliably without hacky polling, 
    // but we have provided the "Open in New Tab" prominently in the header if they encounter a blank/refused screen.
    // To make it extra safe, we could use a timeout, but standard behavior is fine.
    
    // Handle iframe load explicitly to perhaps remove a custom loader
    iframe.addEventListener('load', () => {
        // Iframe is technically loaded, even if it's an error page inside it.
        // The CSS loader sits *behind* the iframe, so when iframe background is white, it covers it.
    });
}

// Run immediately if DOM is ready, else wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}

// Parallax and 3D Tilt Logic
let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('scroll', () => { 
    scrollY = window.scrollY || window.pageYOffset; 
    updateParallax(); 
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
    updateParallax();
    
    // 3D Tilt for domain cards
    document.querySelectorAll('.domain-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to card center
        const dx = (e.clientX - cardX) / (rect.width / 2);
        const dy = (e.clientY - cardY) / (rect.height / 2);
        
        // Apply tilt only if mouse is relatively close to the card
        if (Math.abs(dx) <= 1.5 && Math.abs(dy) <= 1.5) {
            // Smooth claymorphism 3D effect
            card.style.transform = `perspective(1000px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-8px)`;
        } else {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        }
    });
});

document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.domain-card').forEach(card => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});

function updateParallax() {
    document.querySelectorAll('.parallax-shape').forEach(shape => {
        const speed = parseFloat(shape.getAttribute('data-parallax'));
        if (isNaN(speed)) return;
        
        const xOffset = mouseX * speed;
        // Combine mouse parallax and scroll parallax
        const yOffset = (mouseY * speed) - (scrollY * speed * 2);
        
        shape.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
    });
}


// Main JavaScript for Academic Website
// Loads data from content.json and populates the HTML

$(document).ready(function() {
    loadContent();
});

async function loadContent() {
    try {
        console.log('Loading content from data/content.json...');
        const response = await fetch('data/content.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Response received, parsing JSON...');
        const data = await response.json();
        console.log('Data loaded successfully:', data);

        populateProfile(data.profile);
        populateSocialLinks(data.profile);
        populateResearch(data.research);
        populatePublications(data.publications);
        populateTalks(data.talks);
        populateEducation(data.education);
        populateExperience(data.experience);
        populateTeaching(data.teaching);
        populateService(data.services);
        populateNews(data.news);
        updateFooter(data.profile.name);

        console.log('All content populated successfully!');

        // Update page title
        document.title = data.profile.name;

        // Smooth scrolling for anchor links
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, 800);
                    return false;
                }
            }
        });

        // Close navbar when clicking outside
        $(document).on('click', function(event) {
            var $navbar = $('.navbar-collapse');
            var $toggle = $('.navbar-toggle');

            // Check if navbar is expanded and click is outside navbar
            if ($navbar.hasClass('in') &&
                !$navbar.is(event.target) &&
                $navbar.has(event.target).length === 0 &&
                !$toggle.is(event.target) &&
                $toggle.has(event.target).length === 0) {
                $navbar.collapse('hide');
            }
        });

        // Close navbar when clicking a nav link
        $('.navbar-nav a').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });

        // Easter egg: Achievement system
        initAchievementSystem();

        // Easter egg: Photo click hint
        initPhotoClickHint();

        // Easter egg: Crack and cave-in effect
        initCrackEffect();
    } catch (error) {
        console.error('Error loading content:', error);
        displayError(error);
    }
}

// Easter egg: Achievement system
function initAchievementSystem() {
    let clickCount = 0;
    let lastClickTime = 0;
    const clickTimeout = 3000; // Reset after 3 seconds of no clicks

    // Track clicks on name elements
    $('#nav-name, #profile-name').on('click', function(e) {
        const now = Date.now();

        // Reset counter if too much time passed
        if (now - lastClickTime > clickTimeout) {
            clickCount = 0;
        }

        clickCount++;
        lastClickTime = now;

        // Show achievement on 3rd click
        if (clickCount === 3) {
            showAchievement();
            clickCount = 0; // Reset for next time
        }
    });
}

function showAchievement() {
    // Random humorous messages
    const messages = [
        { title: "Thanks for clicking!", subtitle: "Someone's got time 😄", badge: "+1 Persistence" },
        { title: "Achievement Unlocked!", subtitle: "Continual Clicker", badge: "+1 Robustness" },
        { title: "You found it!", subtitle: "Easter Egg Hunter", badge: "+10 Curiosity" },
        { title: "Triple Click Master", subtitle: "That's dedication!", badge: "+5 Patience" },
        { title: "Nice fingers!", subtitle: "Fast Clicker Detected", badge: "+3 Adaptability" }
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];

    // Create toast notification
    const toast = $('<div>')
        .addClass('achievement-toast')
        .html(`
            <div class="achievement-content">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-text">
                    <div class="achievement-title">${msg.title}</div>
                    <div class="achievement-subtitle">${msg.subtitle}</div>
                    <div class="achievement-badge">${msg.badge}</div>
                </div>
            </div>
        `);

    // Add to page
    $('body').append(toast);

    // Animate in
    setTimeout(() => toast.addClass('show'), 10);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Easter egg: Photo click hint
function initPhotoClickHint() {
    let photoClickCount = 0;
    let photoLastClickTime = 0;
    const photoClickTimeout = 2000; // Reset after 2 seconds

    $('#profile-photo').on('click', function(e) {
        const now = Date.now();

        // Reset counter if too much time passed
        if (now - photoLastClickTime > photoClickTimeout) {
            photoClickCount = 0;
        }

        photoClickCount++;
        photoLastClickTime = now;

        // Show hint on 2nd click
        if (photoClickCount === 2) {
            showPhotoHint();
            photoClickCount = 0; // Reset
        }
    });

    // Add cursor pointer to photo
    $('#profile-photo').css('cursor', 'pointer');
}

function showPhotoHint() {
    const email = $('#profile-photo').closest('.sponsor').find('a[href^="mailto:"]').attr('href') || 'mailto:chuyang.ye@nyu.edu';

    // Random humorous photo messages
    const photoMessages = [
        { title: "Caught you staring! 👀", subtitle: "Want the high-res version? Just ask!" },
        { title: "Like what you see?", subtitle: "I can email you the original photo!" },
        { title: "Photo inspector detected!", subtitle: "Double-click unlocked! Email me for HD?" },
        { title: "Thanks for the double-take!", subtitle: "Original photo available upon request 😊" },
        { title: "Curious about the pixels?", subtitle: "Let me send you the uncompressed version!" }
    ];

    const msg = photoMessages[Math.floor(Math.random() * photoMessages.length)];

    const hint = $('<div>')
        .addClass('photo-hint-toast')
        .html(`
            <div class="photo-hint-content">
                <div class="photo-hint-icon">📸</div>
                <div class="photo-hint-text">
                    <div class="photo-hint-title">${msg.title}</div>
                    <div class="photo-hint-subtitle">${msg.subtitle}</div>
                    <a href="${email}" class="photo-hint-button">Send Email</a>
                </div>
            </div>
        `);

    // Add to page
    $('body').append(hint);

    // Animate in
    setTimeout(() => hint.addClass('show'), 10);

    // Remove after 5 seconds
    setTimeout(() => {
        hint.removeClass('show');
        setTimeout(() => hint.remove(), 500);
    }, 5000);
}


// Easter egg: Screen crack and cave-in effect
function initCrackEffect() {
    var clicks = 0;
    var lastTime = 0;
    var resetTimer = null;
    var canvas = null;
    var ctx = null;
    var depthOverlay = null;
    var GAP = 2000;
    var START = 8;
    var PEAK = 20;

    function ensureCanvas() {
        if (canvas) return ctx;
        canvas = document.createElement('canvas');
        canvas.id = 'crack-canvas';
        var dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        return ctx;
    }

    function ensureDepthOverlay() {
        if (depthOverlay) return depthOverlay;
        depthOverlay = document.createElement('div');
        depthOverlay.id = 'crack-depth-overlay';
        depthOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9997;transition:box-shadow 0.4s ease;';
        document.body.appendChild(depthOverlay);
        return depthOverlay;
    }

    function drawImpact(c, x, y) {
        // Small impact point
        c.beginPath();
        c.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2);
        c.fillStyle = 'rgba(0,0,0,0.6)';
        c.fill();
        // Radiating micro-cracks around impact
        for (var i = 0; i < 5; i++) {
            var a = Math.random() * Math.PI * 2;
            var r = 4 + Math.random() * 6;
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
            c.strokeStyle = 'rgba(0,0,0,0.4)';
            c.lineWidth = 0.5;
            c.stroke();
        }
    }

    function drawCrack(x, y, intensity) {
        var c = ensureCanvas();
        drawImpact(c, x, y);
        var arms = 3 + Math.floor(Math.random() * 3 + intensity * 3);
        for (var i = 0; i < arms; i++) {
            var angle = (Math.PI * 2 / arms) * i + (Math.random() - 0.5) * 0.5;
            var len = 30 + Math.random() * 60 + intensity * 40;
            drawBranch(c, x, y, angle, len, 1.5 + intensity * 1.5, 3);
        }
    }

    function drawBranch(c, x, y, angle, len, width, depth) {
        if (depth <= 0 || len < 5) return;
        c.beginPath();
        c.moveTo(x, y);
        var cx = x, cy = y;
        var segs = 3 + Math.floor(Math.random() * 3);
        var sl = len / segs;
        for (var i = 0; i < segs; i++) {
            angle += (Math.random() - 0.5) * 0.7;
            cx += Math.cos(angle) * sl;
            cy += Math.sin(angle) * sl;
            c.lineTo(cx, cy);
        }
        // Dark crack line
        c.strokeStyle = 'rgba(20,20,20,' + (0.3 + Math.random() * 0.4) + ')';
        c.lineWidth = width;
        c.lineCap = 'round';
        c.stroke();
        // Glass edge highlight
        c.strokeStyle = 'rgba(255,255,255,' + (0.06 + Math.random() * 0.08) + ')';
        c.lineWidth = width + 1.5;
        c.stroke();
        // Sub-branch
        if (Math.random() > 0.35) {
            var dir = Math.random() > 0.5 ? 1 : -1;
            drawBranch(c, cx, cy, angle + dir * (0.4 + Math.random() * 0.6),
                       len * 0.45, width * 0.6, depth - 1);
        }
    }

    function updateDepression(intensity) {
        var overlay = ensureDepthOverlay();
        var spread = intensity * 120;
        var alpha = intensity * 0.35;
        overlay.style.boxShadow = 'inset 0 0 ' + spread + 'px ' + (spread * 0.4) + 'px rgba(0,0,0,' + alpha + ')';
        // Perspective cave-in on container
        var container = document.querySelector('.container');
        container.style.transition = 'transform 0.4s ease';
        container.style.transformOrigin = '50% 0%';
        container.style.transform = 'perspective(1000px) translateZ(' + (-intensity * 50) + 'px)';
    }

    function spawnCat(x, y) {
        var cats = ['\uD83D\uDC31', '\uD83D\uDC08', '\uD83D\uDE3A', '\uD83D\uDE38', '\uD83D\uDE40', '\uD83D\uDC3E'];
        var cat = document.createElement('div');
        cat.textContent = cats[Math.floor(Math.random() * cats.length)];
        cat.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;font-size:' + (24 + Math.floor(Math.random() * 12)) + 'px;pointer-events:none;z-index:9999;margin-left:-14px;margin-top:-14px;';
        document.body.appendChild(cat);

        var dx = (Math.random() - 0.5) * 220;
        var jumpH = -100 - Math.random() * 140;
        var rot = (Math.random() - 0.5) * 70;
        var dur = 1200 + Math.random() * 600;

        cat.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0, offset: 0 },
            { transform: 'scale(1.3) translateY(-10px)', opacity: 1, offset: 0.12 },
            { transform: 'translate(' + (dx * 0.3) + 'px,' + (jumpH * 0.85) + 'px) scale(1.05) rotate(' + (rot * 0.3) + 'deg)', opacity: 1, offset: 0.35 },
            { transform: 'translate(' + (dx * 0.6) + 'px,' + jumpH + 'px) scale(1) rotate(' + (rot * 0.6) + 'deg)', opacity: 1, offset: 0.55 },
            { transform: 'translate(' + (dx * 0.85) + 'px,' + (jumpH * 0.3) + 'px) scale(0.9) rotate(' + (rot * 0.85) + 'deg)', opacity: 0.7, offset: 0.8 },
            { transform: 'translate(' + dx + 'px, 80px) scale(0.7) rotate(' + rot + 'deg)', opacity: 0, offset: 1 }
        ], { duration: dur, easing: 'ease-out', fill: 'forwards' }).onfinish = function() {
            cat.remove();
        };
    }

    function shake() {
        var el = document.documentElement;
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = 'crack-shake 0.15s ease';
    }

    function reset() {
        clicks = 0;
        if (canvas) {
            canvas.style.transition = 'opacity 1.2s ease';
            canvas.style.opacity = '0';
            var c = canvas;
            setTimeout(function() { c.remove(); }, 1200);
            canvas = null;
            ctx = null;
        }
        if (depthOverlay) {
            depthOverlay.style.boxShadow = 'inset 0 0 0px 0px rgba(0,0,0,0)';
            var d = depthOverlay;
            setTimeout(function() { d.remove(); }, 1200);
            depthOverlay = null;
        }
        var container = document.querySelector('.container');
        container.style.transition = 'transform 0.8s ease';
        container.style.transform = '';
        setTimeout(function() {
            container.style.transition = '';
            container.style.transformOrigin = '';
        }, 800);
    }

    $(document).on('click', function(e) {
        var now = Date.now();
        if (now - lastTime > GAP) {
            clicks = Math.max(0, clicks - 2);
        }
        clicks++;
        lastTime = now;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(reset, 4000);

        if (clicks >= START) {
            var intensity = Math.min((clicks - START) / (PEAK - START), 1);
            drawCrack(e.clientX, e.clientY, intensity);
            updateDepression(intensity);
            shake();
            // Spawn cats from cracks
            var catChance = 0.3 + intensity * 0.4;
            if (Math.random() < catChance) {
                spawnCat(e.clientX, e.clientY);
                // Extra cat at high intensity
                if (intensity > 0.5 && Math.random() < 0.4) {
                    var ox = e.clientX + (Math.random() - 0.5) * 30;
                    var oy = e.clientY + (Math.random() - 0.5) * 30;
                    setTimeout(function() { spawnCat(ox, oy); }, 80 + Math.random() * 120);
                }
            }
        }
    });

    window.addEventListener('resize', function() {
        if (canvas) {
            var dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
        }
    });
}


// Profile Section
function populateProfile(profile) {
    $('#nav-name').text(profile.name);
    $('#profile-name').text(profile.name);
    $('#profile-photo').attr('src', profile.photo);
    $('#profile-photo').attr('alt', profile.name + ' Profile Photo');

    // Format bio - split into paragraphs
    if (Array.isArray(profile.bio)) {
        profile.bio.forEach(para => {
            $('#profile-bio').append('<p>' + para + '</p>');
        });
    } else {
        // Split by double newlines or single newline for paragraphs
        const paragraphs = profile.bio.split('\n\n').filter(p => p.trim());
        paragraphs.forEach(para => {
            $('#profile-bio').append('<p>' + para.trim() + '</p>');
        });
    }
}

// Social Links in Navbar
function populateSocialLinks(profile) {
    const socialNav = $('#social-nav');
    socialNav.empty();

    const socialLinks = [
        { url: profile.github, icon: 'fa-github', label: 'GitHub' },
        { url: profile.twitter, icon: 'fa-twitter', label: 'Twitter' },
        { url: profile.email, icon: 'fa-envelope', label: 'Contact me', prefix: 'mailto:' },
        { url: profile.linkedin, icon: 'fa-linkedin', label: 'LinkedIn' },
        { url: profile.googleScholar, icon: 'fa-graduation-cap', label: 'Google Scholar' }
    ];

    socialLinks.forEach(link => {
        if (link.url) {
            const href = link.prefix ? link.prefix + link.url : link.url;
            const target = link.prefix ? '' : '_blank';
            const li = $('<li></li>');
            const a = $('<a></a>')
                .attr('href', href)
                .attr('title', link.label);
            if (target) a.attr('target', target);

            a.html('<i class="fa ' + link.icon + ' social-icon"></i>');
            li.append(a);
            socialNav.append(li);
        }
    });
}

// Research Section
function populateResearch(research) {
    if (research.description) {
        $('#research-intro').html('<p>' + research.description + '</p>');
    }

    // Research Interests
    const interestsList = $('#research-interests');
    interestsList.empty();

    if (research.interests && research.interests.length > 0) {
        research.interests.forEach(interest => {
            interestsList.append('<li>' + interest + '</li>');
        });
    }
}

// Publications
function populatePublications(publications) {
    const pubList = $('#publications-list');
    pubList.empty();

    if (!publications || publications.length === 0) {
        pubList.append('<li>No publications listed yet.</li>');
        return;
    }

    publications.forEach(pub => {
        let html = '<li>';

        // Authors
        if (pub.authors) {
            const authorStr = pub.authors.replace('Chuyang Ye', '<strong>Chuyang Ye</strong>');
            html += authorStr + ', ';
        }

        // Title in italics
        html += '<em>' + pub.title + '</em>, ';

        // Venue
        html += pub.venue;

        // Year
        if (pub.year) {
            html += ', ' + pub.year;
        }

        // Award
        if (pub.award) {
            html += ' <strong class="award-badge">★ ' + pub.award + '</strong>';
        }

        // Links
        if (pub.links) {
            html += ' ';
            if (pub.links.paper) {
                html += '<a href="' + pub.links.paper + '" target="_blank">paper</a> ';
            }
            if (pub.links.code) {
                html += '<a href="' + pub.links.code + '" target="_blank">code</a> ';
            }
            if (pub.links.project) {
                html += '<a href="' + pub.links.project + '" target="_blank">project</a> ';
            }
            if (pub.links.slides) {
                html += '<a href="' + pub.links.slides + '" target="_blank">slides</a> ';
            }
            if (pub.links.poster) {
                html += '<a href="' + pub.links.poster + '" target="_blank">poster</a> ';
            }
        }

        // Abstract toggle
        if (pub.abstract) {
            const absId = 'abs-' + Math.random().toString(36).substr(2, 9);
            html += '<a class="abs-toggle" data-target="' + absId + '">[abs]</a>';
            html += '<div id="' + absId + '" class="abstract-text" style="display:none;">' + pub.abstract + '</div>';
        }

        // Image
        if (pub.image) {
            html += '<br><div class="publication-image-container">';
            html += '<img src="' + pub.image + '" alt="' + pub.title + '" class="publication-image">';
            html += '</div>';
        }

        html += '</li>';
        pubList.append(html);
    });

    pubList.on('click', '.abs-toggle', function(e) {
        e.preventDefault();
        const target = $('#' + $(this).data('target'));
        target.slideToggle(200);
    });
}

// Talks
function populateTalks(talks) {
    if (!talks || talks.length === 0) {
        $('#talks-section').hide();
        return;
    }

    const talksList = $('#talks-list');
    talksList.empty();

    talks.forEach(talk => {
        let html = '<li>';
        if (talk.type) {
            html += talk.type + ': ';
        }
        html += '<em>' + talk.title + '</em>';
        if (talk.venue) {
            html += ', ' + talk.venue;
        }
        if (talk.location) {
            html += ', ' + talk.location;
        }
        if (talk.date) {
            html += ', ' + talk.date;
        }
        html += '</li>';
        talksList.append(html);
    });
}

// Education
function populateEducation(education) {
    const eduList = $('#education-list');
    eduList.empty();

    if (!education || education.length === 0) {
        eduList.append('<li>No education information available.</li>');
        return;
    }

    education.forEach(edu => {
        let html = '<li><strong>' + edu.degree + '</strong>';
        if (edu.institution) {
            html += ', ' + edu.institution;
        }
        if (edu.year) {
            html += ', ' + edu.year;
        }
        if (edu.thesis) {
            html += '<br><em>Thesis: ' + edu.thesis + '</em>';
        }
        html += '</li>';
        eduList.append(html);
    });
}

// Experience
function populateExperience(experience) {
    if (!experience || experience.length === 0) {
        $('#experience-section').hide();
        return;
    }

    const expList = $('#experience-list');
    expList.empty();

    experience.forEach(exp => {
        let html = '<li><strong>' + exp.position + '</strong>';
        if (exp.institution) {
            html += ', ' + exp.institution;
        }
        if (exp.period) {
            html += ', ' + exp.period;
        }
        html += '</li>';
        expList.append(html);
    });
}

// Teaching
function populateTeaching(teaching) {
    const teachingList = $('#teaching-list');
    teachingList.empty();

    if (!teaching || teaching.length === 0) {
        teachingList.append('<li>No teaching information available.</li>');
        return;
    }

    teaching.forEach(course => {
        let html = '<li><strong>' + course.course + '</strong>';
        if (course.semester) {
            html += ', ' + course.semester;
        }
        if (course.institution) {
            html += ', ' + course.institution;
        }
        if (course.description) {
            html += '<br>' + course.description;
        }
        html += '</li>';
        teachingList.append(html);
    });
}

// Service
function populateService(services) {
    const serviceList = $('#service-list');
    serviceList.empty();

    if (!services || services.length === 0) {
        serviceList.append('<li>No service activities listed.</li>');
        return;
    }

    services.forEach(service => {
        serviceList.append('<li>' + service + '</li>');
    });
}

// News (optional)
function populateNews(news) {
    if (!news || news.length === 0) {
        $('#news-section').hide();
        return;
    }

    $('#news-section').show();
    const newsList = $('#news-list');
    newsList.empty();

    // Show only recent 10 news
    const recentNews = news.slice(0, 10);

    recentNews.forEach(item => {
        let html = '<li>';
        if (item.date) {
            html += '[' + item.date + '] ';
        }
        html += item.content;
        html += '</li>';
        newsList.append(html);
    });
}

// Footer
function updateFooter(name) {
    const currentYear = new Date().getFullYear();
    $('#footer-text').html('&copy; ' + currentYear + ' ' + name + '. All rights reserved.');
}

// Error Display
function displayError(error) {
    console.error('Error details:', error);
    $('.container').html(
        '<div style="text-align: center; padding: 50px; color: #e74c3c;">' +
        '<h2>Error Loading Content</h2>' +
        '<p>Unable to load website content.</p>' +
        '<p><strong>Error:</strong> ' + error.message + '</p>' +
        '<div style="text-align: left; max-width: 600px; margin: 20px auto; background: #f8f9fa; padding: 20px; border-radius: 5px;">' +
        '<h3>Troubleshooting:</h3>' +
        '<ol>' +
        '<li>Make sure you are running a local server (not opening file:// directly)</li>' +
        '<li>Check that <code>data/content.json</code> exists and is valid JSON</li>' +
        '<li>Open browser console (F12) for detailed error messages</li>' +
        '<li>Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>' +
        '</ol>' +
        '</div>' +
        '</div>'
    );
}

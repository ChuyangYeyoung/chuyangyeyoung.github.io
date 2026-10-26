// Main JavaScript for Academic Website
// Loads data from content.json and populates the HTML

$(document).ready(function() {
    loadContent();
});

async function loadContent() {
    try {
        console.log('Loading content from data/content.json...');
        const response = await fetch('data/content.json', { cache: 'no-cache' });

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
        $('a[href*="#"]:not([href="#"])').not('.skip-link').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400);
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


function escapeText(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Profile Section
function populateProfile(profile) {
    $('#nav-name').text(profile.name);
    $('#profile-name').text(profile.name);
    $('#profile-photo').attr('src', profile.photo);
    $('#profile-photo').attr('alt', profile.name + ' Profile Photo');

    const links = [
        { label: 'Email', url: profile.email ? 'mailto:' + profile.email : '' },
        { label: 'Google Scholar', url: profile.googleScholar },
        { label: 'GitHub', url: profile.github },
        { label: 'CV', url: profile.cv }
    ].filter(link => link.url);
    $('#profile-links').html(links.map(link =>
        '<a href="' + escapeText(link.url) + '"' +
        (link.url.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener noreferrer"') +
        '>' + link.label + '</a>'
    ).join(''));


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

// Cache for pretext-computed abstract heights, keyed by abs div ID
const abstractHeightCache = {};

// Publications
function populatePublications(publications) {
    const pubList = $('#publications-list');
    pubList.empty();

    if (!publications || publications.length === 0) {
        pubList.append('<li>No publications listed yet.</li>');
        return;
    }

    publications.forEach((pub, index) => {
        const absId = 'abstract-' + (index + 1);
        let html = '<li class="publication"><article class="publication-copy">';
        html += '<h3 class="publication-title">' + escapeText(pub.title) + '</h3>';
        if (pub.authors) {
            html += '<p class="publication-authors">' +
                escapeText(pub.authors).replace('Chuyang Ye', '<strong>Chuyang Ye</strong>') + '</p>';
        }
        html += '<p class="publication-venue">' + escapeText(pub.venue) +
            (pub.year ? ' · ' + escapeText(pub.year) : '') +
            (pub.award ? ' <span class="publication-award">' + escapeText(pub.award) + '</span>' : '') +
            '</p><div class="publication-links">';

        const labels = { paper: 'Paper', code: 'Code', project: 'Project', slides: 'Slides', poster: 'Poster' };
        Object.entries(labels).forEach(([key, label]) => {
            if (pub.links && pub.links[key]) {
                html += '<a class="pub-btn" href="' + escapeText(pub.links[key]) +
                    '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
            }
        });

        if (pub.abstract) {
            html += '<button class="pub-btn abs-toggle" type="button" data-target="' + absId +
                '" aria-controls="' + absId + '" aria-expanded="false">Abstract</button>';
        }
        html += '</div>';
        if (pub.abstract) {
            html += '<div id="' + absId + '" class="abstract-text" style="display:none;">' +
                escapeText(pub.abstract) + '</div>';
        }
        html += '</article>';
        if (pub.image) {
            html += '<figure class="publication-image-container"><a class="publication-image-link" href="' +
                escapeText(pub.image) + '" target="_blank" rel="noopener noreferrer" aria-label="View full-size figure: ' +
                escapeText(pub.title) + '" title="View full-size figure"><img src="' + escapeText(pub.image) +
                '" alt="Overview figure for ' + escapeText(pub.title) +
                '" class="publication-image" loading="lazy" decoding="async"></a></figure>';
        }
        html += '</li>';
        pubList.append(html);
    });

    pubList.off('click', '.abs-toggle').on('click', '.abs-toggle', function() {
        const absId = $(this).data('target');
        const target = $('#' + absId);
        const opening = !target.is(':visible');
        $(this).attr('aria-expanded', String(opening)).text(opening ? 'Hide abstract' : 'Abstract');

        let duration = 200;
        if (window.pretext) {
            const containerWidth = target.closest('.publication-copy').width();
            const cacheKey = absId + ':' + containerWidth;
            if (!abstractHeightCache[cacheKey]) {
                const bodyFontSize = parseFloat($('body').css('font-size'));
                const fontSize = (0.88 * bodyFontSize).toFixed(2);
                const prepared = window.pretext.prepare(target.text(), fontSize + 'px Georgia');
                const result = window.pretext.layout(prepared, Math.max(1, containerWidth - 24), 0.88 * bodyFontSize * 1.65);
                abstractHeightCache[cacheKey] = result.height;
            }
            duration = Math.round(Math.min(600, Math.max(120, abstractHeightCache[cacheKey] * 0.8)));
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0;
        target.stop(true, true).slideToggle(duration);
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
        let html = '<li class="experience-item">';
        html += '<p class="experience-period">' + escapeText(exp.period || '') + '</p>';
        html += '<div><h3 class="experience-position">' + escapeText(exp.position) + '</h3>';
        if (exp.institution) html += '<p class="experience-institution">' + exp.institution + '</p>';
        html += '</div></li>';
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

// News
function populateNews(news) {
    if (!news || news.length === 0) {
        $('#news-section').hide();
        return;
    }
    $('#news-section').show();
    const renderItems = items => items.map(item => {
        const date = item.date || '';
        return '<li><time class="news-date" datetime="' + escapeText(date ? date + '-01' : '') +
            '">' + escapeText(date) + '</time><div class="news-copy">' + item.content + '</div></li>';
    }).join('');
    $('#news-list').html(renderItems(news.slice(0, 3)));
    const older = news.slice(3);
    $('#news-archive').prop('hidden', older.length === 0);
    $('#news-archive-list').html(renderItems(older));
    $('#news-archive summary').text('Earlier news (' + older.length + ')');
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

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
    } catch (error) {
        console.error('Error loading content:', error);
        displayError(error);
    }
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
            html += '<strong>' + pub.authors + '</strong>, ';
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

        // Image
        if (pub.image) {
            html += '<br><div class="publication-image-container">';
            html += '<img src="' + pub.image + '" alt="' + pub.title + '" class="publication-image">';
            html += '</div>';
        }

        html += '</li>';
        pubList.append(html);
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

// Minecraft Bedwars Leaderboard - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Bedwars Leaderboard initialized successfully!');

    // Initialize all components
    initializeCursor();
    initializeRippleEffect();
    initializeAnimations();
    initializeStatCalculators();
    initializeFormValidation();
    initializeMobileOptimizations();
    initializePerformanceMetrics();
    initializeAccessibility();
    initializeAdvancedFeatures();
    initializeGradientAnimations();
    initializeWinRateColors();

    // Apply current theme if set
    applyCurrentTheme();

    // Initialize i18n when DOM is loaded
    if (typeof window.bedwarsI18n === 'undefined') {
        window.bedwarsI18n = new I18n();
    }

    // Ensure language switching works
    setTimeout(() => {
        if (window.bedwarsI18n && typeof window.bedwarsI18n.createLanguageSwitcher === 'function') {
            window.bedwarsI18n.createLanguageSwitcher();
        }
    }, 100);

    // Add null checks for elements that might not exist
    const modifyForm = document.getElementById('modifyForm');
    const operationRadios = document.querySelectorAll('input[name="operation_type"]');
    const operationInput = document.getElementById('operationInput');

    if (operationRadios && operationInput && modifyForm) {
        operationRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                operationInput.value = this.value;

                if (this.value === 'add') {
                    modifyForm.classList.remove('subtract-mode');
                    modifyForm.classList.add('add-mode');
                } else {
                    modifyForm.classList.remove('add-mode');
                    modifyForm.classList.add('subtract-mode');
                }
            });
        });
    }

    // Form validation for modify form
    const modifyFormElement = document.getElementById('modifyForm');
    if (modifyFormElement) {
        modifyFormElement.addEventListener('submit', function(e) {
            const formData = new FormData(this);
            let hasValue = false;

            for (let [key, value] of formData.entries()) {
                if (key !== 'operation' && value && parseInt(value) > 0) {
                    hasValue = true;
                    break;
                }
            }

            if (!hasValue) {
                e.preventDefault();
                alert('Введите хотя бы одно значение для изменения!');
            }
        });
    }
});

// Enhanced Custom Cursor System - DISABLED for stability
function initializeCursor() {
    // Минималистичный курсор
    document.addEventListener('DOMContentLoaded', function() {
        const cursor = document.getElementById('customCursor');

        if (cursor) {
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;

            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            document.addEventListener('mousedown', function() {
                cursor.classList.add('clicking');
            });

            document.addEventListener('mouseup', function() {
                cursor.classList.remove('clicking');
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.2;
                cursorY += (mouseY - cursorY) * 0.2;

                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';

                requestAnimationFrame(animateCursor);
            }

            animateCursor();
        }
    });
}

// Enhanced click ripple effect - DISABLED for stability
function createClickRipple(x, y) {
    // Ripple effects disabled to prevent scrolling issues
    return;
}

// Performance Metrics
function initializePerformanceMetrics() {
    const startTime = performance.now();

    window.addEventListener('load', function() {
        const loadTime = performance.now() - startTime;
        const navTime = performance.getEntriesByType('navigation')[0];

        console.log('🚀 Performance Metrics:', {
            'Load Time': `${loadTime.toFixed(2)}ms`,
            'DOM Content Loaded': `${navTime.domContentLoadedEventEnd - navTime.domContentLoadedEventStart}ms`,
            'Total Page Load': `${navTime.loadEventEnd - navTime.loadEventStart}ms`
        });
    });
}



// Ripple Effect System - Simplified for stability
function initializeRippleEffect() {
    // Only track interactions without visual effects to prevent scrolling issues
    document.addEventListener('click', function(e) {
        if (e.target.closest('button, .btn, .card, .stat-card, .player-row')) {
            logUserInteraction('click', e.target);
        }
    });

    // Track form submissions
    document.addEventListener('submit', function(e) {
        logUserInteraction('form_submit', e.target);
    });

    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn')) {
            logUserInteraction('button_click', e.target);
        }
    });
}

function createRipple(event) {
    // Ripple effects disabled to prevent scrolling interference
    return;
}

// User Interaction Analytics
function logUserInteraction(type, element) {
    const data = {
        timestamp: new Date().toISOString(),
        type: type,
        element: element.tagName?.toLowerCase() || 'unknown'
    };

    // Add specific data based on element type
    if (element.textContent) {
        data.text = element.textContent.trim().substring(0, 50);
    }
    if (element.className) {
        data.classes = element.className;
    }
    if (element.action) {
        data.action = element.action;
    }

    console.log(`📊 User Interaction: ${type}`, data);
}

// Animations
function initializeAnimations() {
    // Animate stat cards on load
    const statCards = document.querySelectorAll('.stat-card, .admin-stat-card, .chart-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease forwards';
            card.style.opacity = '1';
        }, index * 100);
    });

    // Animate table rows
    const playerRows = document.querySelectorAll('.player-row');
    if (playerRows.length > 0) {
        playerRows.forEach(row => {
            setTimeout(() => {
                row.style.animation = 'fadeInUp 0.4s ease forwards';
                row.style.opacity = '1';
            }, index * 50);
        });
    }


    // Initialize gradient text animations
    initializeGradientAnimations();

    // Animate stat boxes
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.stat-box').forEach((box, boxIndex) => {
            setTimeout(() => {
                box.style.animation = 'fadeInUp 0.6s ease';
            }, boxIndex * 50);
        });
    });
}

function initializeGradientAnimations() {
    // Apply gradient animations to stats
    document.querySelectorAll('.stat-value-gradient, .gradient-text').forEach(element => {
        if (!element.style.background) {
            // Apply default gradient if none set
            element.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e, #ffaa00)';
            element.style.backgroundSize = '200% 200%';
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.backgroundClip = 'text';
        }
    });

    // Fix level and experience display
    document.querySelectorAll('[data-stat="level"], [data-stat="experience"]').forEach(element => {
        if (element.style.webkitTextFillColor === 'transparent' && !element.style.background.includes('gradient')) {
            // Reset to normal text if no gradient is properly set
            element.style.webkitTextFillColor = '';
            element.style.background = '';
            element.classList.add('text-warning');
        }
    });

    // Fix gradient roles that might not be displaying properly
    fixGradientRoleDisplay();
}

function fixGradientRoleDisplay() {
    // Check if browser supports background-clip: text
    const testElement = document.createElement('div');
    testElement.style.backgroundClip = 'text';
    const supportsBackgroundClip = testElement.style.backgroundClip === 'text';
    
    // Fix gradient roles in leaderboard
    document.querySelectorAll('.gradient-role').forEach(element => {
        // Check if gradient is working properly
        const computedStyle = window.getComputedStyle(element);
        const hasBackground = computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none';
        const isTransparent = computedStyle.webkitTextFillColor === 'rgba(0, 0, 0, 0)' || 
                             computedStyle.webkitTextFillColor === 'transparent';
        
        // If gradient is not working properly, use fallback color
        if (!supportsBackgroundClip || !hasBackground || !isTransparent) {
            const fallbackColor = element.getAttribute('data-fallback-color') || '#ffc107';
            element.style.webkitTextFillColor = '';
            element.style.background = '';
            element.style.color = fallbackColor;
            element.style.textShadow = `0 0 10px ${fallbackColor}50`;
        }
    });

    // Fix nickname gradients
    document.querySelectorAll('.gradient-nickname').forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const hasBackground = computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none';
        const isTransparent = computedStyle.webkitTextFillColor === 'rgba(0, 0, 0, 0)' || 
                             computedStyle.webkitTextFillColor === 'transparent';
        
        if (!supportsBackgroundClip || !hasBackground || !isTransparent) {
            element.style.webkitTextFillColor = '';
            element.style.background = '';
            element.style.color = '#ffc107';
            element.style.textShadow = '0 0 10px #ffc10750';
        }
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
        });

        // Real-time validation for number inputs
        const numberInputs = form.querySelectorAll('input[type="number"]');
        numberInputs.forEach(input => {
            input.addEventListener('input', () => {
                validateNumberInput(this);
                formatNumberInput(this);
            });
        });

        // Nickname validation
        const nicknameInputs = form.querySelectorAll('input[name="nickname"]');
        nicknameInputs.forEach(input => {
            input.addEventListener('input', () => {
                validateNickname(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const errors = [];

    // Clear previous errors
    clearFormErrors(form);

    // Validate required fields
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Это поле обязательно для заполнения');
            isValid = false;
        }
    });

    // Validate specific field types
    const numberFields = form.querySelectorAll('input[type="number"]');
    numberFields.forEach(field => {
        if (field.value && (isNaN(field.value) || parseFloat(field.value) < 0)) {
            showFieldError(field, 'Введите корректное неотрицательное число');
            isValid = false;
        }
    });

    // Validate nickname length
    const nicknameField = form.querySelector('input[name="nickname"]');
    if (nicknameField && nicknameField.value) {
        if (nicknameField.value.length > 20) {
            showFieldError(nicknameField, 'Ник не может быть длиннее 20 символов');
            isValid = false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(nicknameField.value)) {
            showFieldError(nicknameField, 'Ник может содержать только буквы, цифры и подчеркивания');
            isValid = false;
        }
    }

    return isValid;
}

function validateNumberInput(input) {
    const value = parseFloat(input.value);
    const max = 999999;

    if (value > max) {
        input.value = max;
        showFieldError(input, `Максимальное значение: ${max.toLocaleString()}`);
    } else if (value < 0) {
        input.value = 0;
        showFieldError(input, 'Значение не может быть отрицательным');
    } else {
        clearFieldError(input);
    }
}

function validateNickname(input) {
    const value = input.value;

    if (value.length > 20) {
        showFieldError(input, 'Максимум 20 символов');
    } else if (value && !/^[a-zA-Z0-9_]+$/.test(value)) {
        showFieldError(input, 'Только буквы, цифры и _');
    } else {
        clearFieldError(input);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-danger small mt-1';
    errorDiv.textContent = message;
    errorDiv.setAttribute('data-error', 'true');

    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('[data-error="true"]');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearFormErrors(form) {
    const errorDivs = form.querySelectorAll('[data-error="true"]');
    errorDivs.forEach(div => div.remove());

    const invalidFields = form.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

function formatNumberInput(input) {
    if (input.value && !isNaN(input.value)) {
        input.value = parseInt(input.value).toString();
    }
}

function initializeStatCalculators() {
    const form = document.querySelector('.add-player-form');
    if (!form) return;

    const killsInput = form.querySelector('input[name="kills"]');
    const deathsInput = form.querySelector('input[name="deaths"]');
    const winsInput = form.querySelector('input[name="wins"]');
    const gamesInput = form.querySelector('input[name="games_played"]');

    if (killsInput && deathsInput) {
        [killsInput, deathsInput].forEach(input => {
            input.addEventListener('input', () => updateKDPreview(killsInput, deathsInput));
        });
    }

    if (winsInput && gamesInput) {
        [winsInput, gamesInput].forEach(input => {
            input.addEventListener('input', () => updateWinRatePreview(winsInput, gamesInput));
        });
    }
}

function updateKDPreview(killsInput, deathsInput) {
    const kills = parseInt(killsInput.value) || 0;
    const deaths = parseInt(deathsInput.value) || 0;
    const kd = deaths > 0 ? (kills / deaths).toFixed(2) : kills;

    showStatPreview(killsInput, `K/D: ${kd}`);
}

function updateWinRatePreview(winsInput, gamesInput) {
    const wins = parseInt(winsInput.value) || 0;
    const games = parseInt(gamesInput.value) || 0;
    const winRate = games > 0 ? ((wins / games) * 100).toFixed(1) : 0;

    showStatPreview(winsInput, `Win Rate: ${winRate}%`);
}

function showStatPreview(input, text) {
    // Remove existing preview
    const existingPreview = input.parentNode.querySelector('.stat-preview');
    if (existingPreview) {
        existingPreview.remove();
    }

    // Add new preview
    const preview = document.createElement('small');
    preview.className = 'stat-preview text-info d-block mt-1';
    preview.textContent = text;
    input.parentNode.appendChild(preview);
}

// Theme System
function applyCurrentTheme() {
    // Get theme from local storage or detect from CSS
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(JSON.parse(savedTheme));
    }
}

function applyTheme(theme) {
    if (!theme) return;

    // Apply CSS variables
    const root = document.documentElement;
    if (theme.primary_color) root.style.setProperty('--primary-color', theme.primary_color);
    if (theme.secondary_color) root.style.setProperty('--secondary-color', theme.secondary_color);
    if (theme.background_color) root.style.setProperty('--bg-primary',
        `linear-gradient(135deg, ${theme.background_color} 0%, ${theme.card_background || '#2d2d2d'} 100%)`);
    if (theme.card_background) root.style.setProperty('--bg-secondary',
        `linear-gradient(135deg, ${theme.card_background} 0%, ${theme.background_color || '#1a1a1a'} 100%)`);
    if (theme.text_color) root.style.setProperty('--text-color', theme.text_color);
    if (theme.accent_color) root.style.setProperty('--accent-color', theme.accent_color);
    if (theme.primary_color) root.style.setProperty('--player-icon-color', theme.primary_color);

    // Save theme to local storage
    localStorage.setItem('selectedTheme', JSON.stringify(theme));
}

// Function to update CSS variables based on current theme
function updateThemeVariables(theme) {
    const root = document.documentElement;
    if (theme) {
        root.style.setProperty('--primary-color', theme.primary_color);
        root.style.setProperty('--secondary-color', theme.secondary_color);
        root.style.setProperty('--background-color', theme.background_color);
        root.style.setProperty('--card-background', theme.card_background);
        root.style.setProperty('--text-color', theme.text_color);
        root.style.setProperty('--accent-color', theme.accent_color);
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selected_theme');
    if (savedTheme) {
        try {
            const theme = JSON.parse(savedTheme);
            applyTheme(theme);
            updateThemeVariables(theme);
        } catch (e) {
            console.error('Error parsing saved theme:', e);
        }
    }

    // Also update variables if there's a session theme
    const sessionTheme = window.sessionTheme;
    if (sessionTheme) {
        updateThemeVariables(sessionTheme);
    }
});

// Advanced Features
function initializeAdvancedFeatures() {
    initializeQuickFilters();
    initializeKeyboardShortcuts();
    initializeTableEnhancements();
    initializeSearchEnhancements();
    // Add logic for custom emojis in roles here
    initializeCustomEmojiRoles();
    // Add logic for experience guide icon here
    addExperienceGuideIcon();
    // Add logic for expanding shop items here
    expandShopItems();
    // Add logic for quest update timer here
    showQuestUpdateTimer();
    // Add logic for final deaths in admin editing here
    addFinalDeathsToAdminEdits();
}

// Custom Emoji Roles
function initializeCustomEmojiRoles() {
    const roleBadges = document.querySelectorAll('.role-badge');
    roleBadges.forEach(badge => {
        const emojiCode = badge.dataset.emoji;
        if (emojiCode) {
            // Use a library or custom logic to render emoji from code
            // For simplicity, assume emojiCode is a valid Unicode emoji character or shortcode
            badge.textContent = `${emojiCode} ${badge.textContent}`;
        }
    });
}

// Experience Guide Icon
function addExperienceGuideIcon() {
    // Placeholder for adding the experience guide icon.
    // This would typically involve finding an element related to experience
    // and appending an icon (e.g., a "?" icon) next to it.
    const experienceElements = document.querySelectorAll('[data-stat="experience"]');
    experienceElements.forEach(el => {
        if (!el.querySelector('.experience-guide-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-question-circle ml-1 text-muted experience-guide-icon';
            icon.setAttribute('data-bs-toggle', 'tooltip');
            icon.setAttribute('data-bs-placement', 'top');
            icon.setAttribute('title', 'Опыт показывает ваш прогресс. Чем больше опыта, тем выше ваш ранг.');
            el.appendChild(icon);
        }
    });
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Shop Items Expansion
function expandShopItems() {
    // Placeholder for expanding shop items.
    // This could involve making more items visible, loading more items, or changing the layout.
    const shopItemsContainer = document.querySelector('.shop-items-container');
    if (shopItemsContainer) {
        console.log('Expanding shop inventory...');
        // Example: Add more items (replace with actual data loading)
        const newItem = document.createElement('div');
        newItem.className = 'shop-item';
        newItem.innerHTML = `
            <img src="/path/to/new_item.png" alt="New Item">
            <div class="item-name">Супер Меч</div>
            <div class="item-price">1000</div>
        `;
        shopItemsContainer.appendChild(newItem);

        const anotherNewItem = document.createElement('div');
        anotherNewItem.className = 'shop-item';
        anotherNewItem.innerHTML = `
            <img src="/path/to/another_item.png" alt="Another Item">
            <div class="item-name">Защитный Амулет</div>
            <div class="item-price">1500</div>
        `;
        shopItemsContainer.appendChild(anotherNewItem);
    }
}

// Quest Update Timer
function showQuestUpdateTimer() {
    // Placeholder for displaying the quest update timer.
    const timerElement = document.getElementById('quest-timer');
    if (timerElement && !timerElement.querySelector('.timer-display')) {
        const timerDisplay = document.createElement('span');
        timerDisplay.className = 'timer-display';
        timerDisplay.textContent = '05:00'; // Example timer
        timerElement.appendChild(timerDisplay);

        // Logic to update the timer would go here.
        console.log('Quest timer displayed.');
    }
}

// Admin Edits - Final Deaths
function addFinalDeathsToAdminEdits() {
    const editForms = document.querySelectorAll('.admin-edit-form');
    editForms.forEach(form => {
        // Find where to insert the 'final_deaths' input
        const section = form.querySelector('.player-stats-section'); // Assuming a section for stats
        if (section && !section.querySelector('input[name="final_deaths"]')) {
            const finalDeathsInput = document.createElement('div');
            finalDeathsInput.className = 'mb-3';
            finalDeathsInput.innerHTML = `
                <label for="final_deaths" class="form-label">Финальные смерти</label>
                <input type="number" class="form-control" id="final_deaths" name="final_deaths" value="0" min="0">
            `;
            // Insert after the last input or at a specific location
            const lastInput = section.querySelector('input[type="number"]:last-of-type');
            if (lastInput) {
                lastInput.parentNode.after(finalDeathsInput);
            } else {
                section.appendChild(finalDeathsInput);
            }
        }
    });
}

function initializeQuickFilters() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;

    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'quick-filters d-flex gap-2 mt-2 flex-wrap';
    filtersDiv.innerHTML = `
        <small class="text-muted align-self-center me-2">Быстрые фильтры:</small>
        <button type="button" class="btn btn-outline-info btn-sm" data-filter="level:high">
            <i class="fas fa-star"></i> Высокий уровень
        </button>
        <button type="button" class="btn btn-outline-success btn-sm" data-filter="kd:good">
            <i class="fas fa-trophy"></i> Хороший K/D
        </button>
        <button type="button" class="btn btn-outline-warning btn-sm" data-filter="active">
            <i class="fas fa-fire"></i> Активные
        </button>
        <button type="button" class="btn btn-outline-secondary btn-sm" data-filter="reset">
            <i class="fas fa-undo"></i> Сбросить
        </button>
    `;

    searchForm.appendChild(filtersDiv);

    // Add filter functionality
    filtersDiv.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            applyQuickFilter(btn.dataset.filter);
        });
    });
}

function applyQuickFilter(filter) {
    const rows = document.querySelectorAll('.player-row');

    rows.forEach(row => {
        let show = true;

        switch (filter) {
            case 'level:high':
                const levelText = row.querySelector('.level-badge, .stat-value')?.textContent || '0';
                const level = parseInt(levelText.replace('Уровень ', '').replace('Level ', ''));
                show = level >= 50; // Changed from 25 to 50 for "High Level"
                break;
            case 'kd:good':
                const kdText = row.querySelector('.stat-value')?.textContent || '0';
                const kd = parseFloat(kdText);
                show = kd >= 1.5;
                break;
            case 'active':
                const games = parseInt(row.querySelector('.player-row td:nth-child(8)')?.textContent || '0');
                show = games >= 50;
                break;
            case 'reset':
                show = true;
                break;
        }

        row.style.display = show ? '' : 'none';
    });
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    if (!isMobileDevice()) return;

    // Add mobile-specific styles
    document.body.classList.add('mobile-device');

    // Optimize table for mobile
    optimizeTableForMobile();

    // Add touch gestures
    initializeTouchGestures();
}

function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function optimizeTableForMobile() {
    const tables = document.querySelectorAll('table.leaderboard-table');

    tables.forEach(table => {
        // Make table horizontally scrollable
        table.style.fontSize = '0.85rem';

        // Add scroll indicators
        const container = table.closest('.table-responsive, .leaderboard-table-container'); // Changed selector to be more general
        if (container) {
            container.style.position = 'relative';

            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator d-md-none';
            scrollIndicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Прокрутите горизонтально';
            scrollIndicator.style.cssText = `
                position: absolute;
                bottom: 5px; /* Adjusted position */
                right: 5px; /* Adjusted position */
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 3px 8px; /* Adjusted padding */
                border-radius: 15px;
                font-size: 0.65rem; /* Adjusted font size */
                z-index: 10;
                pointer-events: none; /* Prevent interaction */
            `;

            container.appendChild(scrollIndicator);

            // Hide indicator after user scrolls
            const scrollHandler = () => {
                scrollIndicator.style.opacity = '0.3';
                container.removeEventListener('scroll', scrollHandler);
            };
            container.addEventListener('scroll', scrollHandler, { once: true });

            // Also hide if container is not scrollable
            if (container.scrollWidth <= container.clientWidth) {
                scrollIndicator.style.display = 'none';
            }
        }
    });
}

function initializeTouchGestures() {
    // Touch gestures completely disabled to prevent double scrolling
    return;
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.form.submit();
            }
        }
    });
}

// Table Enhancements
function initializeTableEnhancements() {
    const tables = document.querySelectorAll('.leaderboard-table');

    tables.forEach(table => {
        // Add zebra striping enhancement
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index % 2 === 0) {
                row.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            }
        });

        // Add hover effect to table rows
        const playerRows = document.querySelectorAll('.player-row');
        if (playerRows.length > 0) {
            playerRows.forEach(row => {
                row.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                    this.style.transition = 'transform 0.2s ease';
                });

                row.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        }
    });
}

// Search Enhancements
function initializeSearchEnhancements() {
    const searchInput = document.querySelector('input[name="search"]');
    if (!searchInput) return;

    // Add search suggestions
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            // Could implement live search here
            console.log('🔍 Search query:', this.value);
        }, 300);
    });

    // Add search history
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    searchInput.addEventListener('focus', function() {
        if (searchHistory.length > 0) {
            showSearchSuggestions(this, searchHistory.slice(0, 5));
        }
    });

    searchInput.form.addEventListener('submit', function() {
        const query = searchInput.value.trim();
        if (query && !searchHistory.includes(query)) {
            searchHistory.unshift(query);
            if (searchHistory.length > 10) searchHistory.pop();
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    });
}

function showSearchSuggestions(input, suggestions) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }

    if (suggestions.length === 0) return;

    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions position-absolute bg-dark border rounded shadow-lg';
    suggestionsDiv.style.cssText = `
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
    `;

    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item px-3 py-2 text-light cursor-pointer';
        item.style.cursor = 'pointer';

        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });

        item.addEventListener('click', function() {
            input.value = suggestion;
            input.form.submit();
        });

        suggestionsDiv.appendChild(item);
    });

    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(suggestionsDiv);

    // Remove suggestions when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function(e) {
            if (!input.parentNode.contains(e.target)) {
                suggestionsDiv.remove();
            }
        }, { once: true });
    }, 100);
}

// Accessibility
function initializeAccessibility() {
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.stat-card, .action-card');

    customButtons.forEach(button => {
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }

        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add screen reader announcements for dynamic content
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);

    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    };
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.log('🚨 JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

// Export for other scripts
window.BedwarsLeaderboard = {
    applyTheme,
    logUserInteraction,
    announceToScreenReader: window.announceToScreenReader
};

// Apply gradients to elements
function applyGradients() {
    const gradientElements = document.querySelectorAll('[data-gradient]');
    gradientElements.forEach(element => {
        const gradientData = element.dataset.gradient;
        if (gradientData) {
            try {
                const gradient = JSON.parse(gradientData);
                element.style.background = gradient.css;
                element.style.webkitBackgroundClip = 'text';
                element.style.webkitTextFillColor = 'transparent';
                element.style.backgroundClip = 'text';

                if (gradient.animated) {
                    element.classList.add('animated-gradient');
                }
            } catch (e) {
                console.error('Error applying gradient:', e);
            }
        }
    });

    // Apply gradients from inline styles
    const inlineGradients = document.querySelectorAll('.gradient-text, .nickname-gradient, .stats-gradient, .title-gradient');
    inlineGradients.forEach(element => {
        const style = element.getAttribute('style');
        if (style && style.includes('background:')) {
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.backgroundClip = 'text';
        }
    });
}

// Load ASCEND ratings
function loadASCENDRatings(playerId, gameMode = 'bed_wars') {
    const ascendContainer = document.querySelector('.ascend-ratings');
    if (!ascendContainer) return;

    fetch(`/api/player/${playerId}/rating/${getGameModeId(gameMode)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateASCENDCard(data.rating, data.mode);
            } else {
                showNoASCENDData(gameMode);
            }
        })
        .catch(error => {
            console.error('Error loading ASCEND ratings:', error);
            showNoASCENDData(gameMode);
        });
}

function getGameModeId(mode) {
    const modeMap = {
        'bed_wars': 1,
        'sky_wars': 2,
        'fireball_fight': 3,
        'tnt_run': 4,
        'duels': 5
    };
    return modeMap[mode] || 1;
}

function updateASCENDCard(rating, mode) {
    const container = document.querySelector('.ascend-ratings');
    if (!container) return;

    container.innerHTML = `
        <div class="rating-grid">
            <div class="rating-card tier-${rating.kd_rating.toLowerCase()}">
                <div class="rating-label">K/D РЕЙТИНГ</div>
                <div class="rating-tier">${rating.kd_rating}</div>
                <div class="rating-stats">${rating.mode_kd_ratio} K/D • ${rating.mode_kills} убийств</div>
            </div>
            <div class="rating-card tier-${rating.kills_rating.toLowerCase()}">
                <div class="rating-label">РЕЙТИНГ УБИЙСТВ</div>
                <div class="rating-tier">${rating.kills_rating}</div>
                <div class="rating-stats">${rating.mode_kills}+ убийств • Топ 15%</div>
            </div>
            <div class="rating-card tier-${rating.objective_rating.toLowerCase()}">
                <div class="rating-label">РЕЙТИНГ ЦЕЛЕЙ</div>
                <div class="rating-tier">${rating.objective_rating}</div>
                <div class="rating-stats">${rating.mode_objectives}+ кроватей • Топ 5%</div>
            </div>
            <div class="rating-card tier-${rating.efficiency_rating.toLowerCase()}">
                <div class="rating-label">ЭФФЕКТИВНОСТЬ</div>
                <div class="rating-tier">${rating.efficiency_rating}</div>
                <div class="rating-stats">${rating.mode_win_rate}% WR • ${rating.mode_wins} побед</div>
            </div>
            <div class="rating-card overall-rating tier-${rating.overall_rating.toLowerCase()}">
                <div class="rating-label">ОБЩИЙ РЕЙТИНГ</div>
                <div class="rating-tier">${rating.overall_rating}</div>
                <div class="rating-stats">Отличный игрок • Топ 20%</div>
            </div>
        </div>
    `;
}

function showNoASCENDData(gameMode) {
    const container = document.querySelector('.ascend-ratings');
    if (!container) return;

    container.innerHTML = `
        <div class="no-data-message">
            <i class="fas fa-chart-line text-muted mb-3"></i>
            <h6>Нет данных для режима ${gameMode}</h6>
            <p class="text-muted">Статистика для этого режима пока не доступна.</p>
        </div>
    `;
}

// View switching functionality
function switchView(viewType) {
    const tableView = document.getElementById('tableView');
    const cardView = document.getElementById('cardView');
    const tableBtn = document.getElementById('tableViewBtn');
    const cardBtn = document.getElementById('cardViewBtn');

    if (viewType === 'table') {
        tableView.classList.remove('d-none');
        cardView.classList.add('d-none');
        tableBtn.classList.add('active');
        cardBtn.classList.remove('active');
        localStorage.setItem('preferredView', 'table');
    } else if (viewType === 'cards') {
        tableView.classList.add('d-none');
        cardView.classList.remove('d-none');
        tableBtn.classList.remove('active');
        cardBtn.classList.add('active');
        localStorage.setItem('preferredView', 'cards');
    }
}

// Load preferred view from localStorage
function loadPreferredView() {
    const preferredView = localStorage.getItem('preferredView') || 'table';
    switchView(preferredView);
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (tooltipTriggerList.length > 0 && typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('playerSearch');
    const searchForm = document.getElementById('searchForm');
    
    if (searchInput && searchForm) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchForm.submit();
            }
        });
    }
}

// Initialize forms
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                setTimeout(() => submitBtn.disabled = false, 3000);
            }
        });
    });
}

// Apply gradients and win rate colors
function applyGradients() {
    // This function will be called by initializeGradientAnimations
    if (typeof initializeGradientAnimations === 'function') {
        initializeGradientAnimations();
    }
    
    // Apply win rate colors with new thresholds
    applyWinRateColors();
}

// Apply win rate colors based on updated thresholds: 40%+ yellow, 50%+ green
function applyWinRateColors() {
    const winRateElements = document.querySelectorAll('[data-win-rate]');
    winRateElements.forEach(element => {
        const winRate = parseFloat(element.dataset.winRate);
        
        // Remove existing classes
        element.classList.remove('winrate-low', 'winrate-medium', 'winrate-high');
        
        // Apply new thresholds
        if (winRate >= 50) {
            element.classList.add('winrate-high');
        } else if (winRate >= 40) {
            element.classList.add('winrate-medium');
        } else {
            element.classList.add('winrate-low');
        }
    });

    // Also handle win rate percentage text display
    const winRateTexts = document.querySelectorAll('.win-rate-text, .winrate-display');
    winRateTexts.forEach(element => {
        const text = element.textContent || element.innerText;
        const winRateMatch = text.match(/(\d+\.?\d*)%/);
        
        if (winRateMatch) {
            const winRate = parseFloat(winRateMatch[1]);
            element.classList.remove('winrate-low', 'winrate-medium', 'winrate-high');
            
            if (winRate >= 50) {
                element.classList.add('winrate-high');
            } else if (winRate >= 40) {
                element.classList.add('winrate-medium');
            } else {
                element.classList.add('winrate-low');
            }
        }
    });
}

// Initialize when DOM is ready - Optimized for performance
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Elite Squad Bedwars initialized successfully!');

    // Performance optimization - batch DOM operations
    requestAnimationFrame(() => {
        // Initialize core components in priority order
        initializeSearch();
        initializeTooltips();
        initializeForms();
        
        // Defer visual enhancements
        requestAnimationFrame(() => {
            applyGradients();
            initializeShop();
            loadPreferredView();
        });
    });

    // Performance metrics (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        const loadTime = performance.now();
        console.log('🚀 Load Time:', `${loadTime.toFixed(2)}ms`);
    }
});

// Shop System with Effects
function initializeShop() {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');

    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            if (this.disabled) {
                // Shake effect for insufficient funds
                this.classList.add('shake-error');
                setTimeout(() => this.classList.remove('shake-error'), 600);
                return;
            }

            const itemId = this.dataset.itemId;
            const itemName = this.dataset.itemName;
            const costCoins = parseInt(this.dataset.costCoins) || 0;
            const costReputation = parseInt(this.dataset.costReputation) || 0;
            const rarity = this.dataset.rarity;

            // Show confirmation
            if (confirm(`Купить "${itemName}" за ${costCoins} койнов и ${costReputation} репутации?`)) {
                purchaseItem(itemId, itemName, costCoins, costReputation, rarity, this);
            }
        });
    });
}

function purchaseItem(itemId, itemName, costCoins, costReputation, rarity, button) {
    // Disable button during purchase
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Покупка...';

    // Create purchase request
    fetch('/shop/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            item_id: itemId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Success animation based on rarity
            createPurchaseEffect(button, rarity);

            // Update button
            button.innerHTML = '<i class="fas fa-check me-2"></i>Куплено!';
            button.classList.remove('btn-warning');
            button.classList.add('btn-success');

            // Update player currency display
            updateCurrencyDisplay(data.new_coins, data.new_reputation);

            // Show success message
            showNotification(`Успешно куплено: ${itemName}!`, 'success');

            setTimeout(() => {
                location.reload(); // Refresh to show updated shop
            }, 2000);
        } else {
            // Error handling
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${data.error}`;
            button.classList.add('btn-danger');

            setTimeout(() => {
                button.innerHTML = button.querySelector('.btn-text').innerHTML;
                button.classList.remove('btn-danger');
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Purchase error:', error);
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-times me-2"></i>Ошибка';
        button.classList.add('btn-danger');
    });
}

function createPurchaseEffect(button, rarity) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Particle colors based on rarity
    const rarityColors = {
        'common': ['#6c757d', '#adb5bd'],
        'uncommon': ['#28a745', '#20c997'],
        'rare': ['#007bff', '#17a2b8'],
        'epic': ['#6f42c1', '#e83e8c'],
        'legendary': ['#ffc107', '#fd7e14'],
        'mythic': ['#8a2be2', '#9370db']
    };

    const colors = rarityColors[rarity] || rarityColors['common'];

    // Create particles
    for (let i = 0; i < 12; i++) {
        createParticle(centerX, centerY, colors);
    }

    // Flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle at ${centerX}px ${centerY}px, ${colors[0]}33, transparent 50%);
        pointer-events: none;
        z-index: 9999;
        animation: purchaseFlash 0.5s ease-out;
    `;

    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

function createParticle(x, y, colors) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 50;
    const size = 4 + Math.random() * 4;

    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: particleAnimation 1s ease-out forwards;
        --dx: ${Math.cos(angle) * velocity}px;
        --dy: ${Math.sin(angle) * velocity}px;
    `;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
}

function updateCurrencyDisplay(coins, reputation) {
    const coinsDisplay = document.querySelector('.coins-display');
    const reputationDisplay = document.querySelector('.reputation-display');

    if (coinsDisplay) {
        coinsDisplay.textContent = `${coins} Койны`;
        coinsDisplay.classList.add('currency-updated');
        setTimeout(() => coinsDisplay.classList.remove('currency-updated'), 1000);
    }

    if (reputationDisplay) {
        reputationDisplay.textContent = `${reputation} Репутация`;
        reputationDisplay.classList.add('currency-updated');
        setTimeout(() => reputationDisplay.classList.remove('currency-updated'), 1000);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Search initialization function
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Search functionality
            console.log('Search term:', this.value);
        });
    }
}

// Auto-refresh quest progress every 30 seconds
let questRefreshInterval;

function initializeQuestRefresh() {
    // Clear existing interval
    if (questRefreshInterval) {
        clearInterval(questRefreshInterval);
    }

    // Only set up refresh if we're on the quests page
    if (document.querySelector('.quest-progress') && window.location.pathname === '/quests') {
        questRefreshInterval = setInterval(() => {
            refreshQuestProgress();
        }, 15000); // Refresh every 15 seconds
    }
}

function refreshQuestProgress() {
    const questCards = document.querySelectorAll('.quest-card');

    questCards.forEach(card => {
        const progressBar = card.querySelector('.quest-progress-bar');
        const progressText = card.querySelector('.quest-progress-text');
        const acceptButton = card.querySelector('button[type="submit"]');

        if (progressBar && progressText) {
            // Update progress without full page reload
            fetch('/api/quest-progress', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateQuestCards(data.quests);
                }
            })
            .catch(error => console.log('Quest refresh error:', error));
        }
    });
}

function updateQuestCards(questsData) {
    questsData.forEach(questData => {
        const questCard = document.querySelector(`[data-quest-id="${questData.id}"]`);
        if (questCard) {
            const progressBar = questCard.querySelector('.quest-progress-bar');
            const progressText = questCard.querySelector('.quest-progress-text');
            const actionButton = questCard.querySelector('.quest-actions button');

            if (progressBar) {
                progressBar.style.width = `${questData.progress_percentage}%`;
            }

            if (progressText) {
                progressText.textContent = `${questData.current_progress} / ${questData.target_value} (${questData.progress_percentage}%)`;
            }

            if (actionButton && questData.is_completed) {
                actionButton.textContent = 'Выполнен';
                actionButton.className = 'btn btn-sm btn-success w-100';
                actionButton.disabled = true;

                // Add completed badge if not exists
                if (!questCard.querySelector('.completed-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'completed-badge';
                    badge.innerHTML = '<i class="fas fa-check"></i> Выполнено';
                    questCard.appendChild(badge);
                }
            }
        }
    });
}

// Initialize quest refresh when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestRefresh();
});

// Reinitialize when navigating to quests page
window.addEventListener('popstate', function() {
    initializeQuestRefresh();
});

// Initialize win rate colors (theme-independent)
function initializeWinRateColors() {
    // Apply win rate colors based on new thresholds: 40%+ yellow, 50%+ green
    const winRateElements = document.querySelectorAll('[data-win-rate]');
    
    winRateElements.forEach(element => {
        const winRate = parseFloat(element.getAttribute('data-win-rate'));
        
        if (isNaN(winRate)) return;
        
        // Remove existing color classes
        element.classList.remove('winrate-low', 'winrate-medium', 'winrate-high');
        
        // Apply new color thresholds
        if (winRate >= 50) {
            element.style.color = '#32cd32 !important'; // Green for 50%+
            element.classList.add('winrate-high');
        } else if (winRate >= 40) {
            element.style.color = '#ffd700 !important'; // Yellow for 40-49%
            element.classList.add('winrate-medium');
        } else {
            element.style.color = '#dc3545 !important'; // Red for below 40%
            element.classList.add('winrate-low');
        }
    });
}
// Utility functions for all games

/**
 * Get a random integer between min and max (inclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Show a simple modal with message
 */
function showModal(message, type = 'info') {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 flex items-center justify-center z-50 bg-black/50`;
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 class="text-xl font-bold mb-4 ${type === 'error' ? 'text-red-500' : 'text-purple-500'}">
                ${type === 'error' ? 'Error' : 'Message'}
            </h3>
            <p class="mb-4">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                class="px-4 py-2 rounded ${type === 'error' ? 'bg-red-500' : 'bg-purple-500'} text-white">
                OK
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Save high score to localStorage
 */
function saveHighScore(gameName, score) {
    const highscores = JSON.parse(localStorage.getItem('chicJokesterHighscores') || '{}');
    if (!highscores[gameName] || score > highscores[gameName]) {
        highscores[gameName] = score;
        localStorage.setItem('chicJokesterHighscores', JSON.stringify(highscores));
        return true;
    }
    return false;
}

/**
 * Get high score for a game
 */
function getHighScore(gameName) {
    const highscores = JSON.parse(localStorage.getItem('chicJokesterHighscores') || '{}');
    return highscores[gameName] || 0;
}

/**
 * Format time in MM:SS
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Vibrate device if supported
 */
function vibrate(pattern = 200) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

/**
 * Play sound effect
 */
function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play().catch(e => console.log('Audio play failed:', e));
}

/**
 * Share game result
 */
async function shareResult(gameName, score) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: `I scored ${score} in ${gameName}!`,
                text: `Can you beat my score in Chic Jokester?`,
                url: window.location.href
            });
        } catch (err) {
            console.log('Sharing failed:', err);
        }
    } else {
        showModal('Web Share API not supported in your browser', 'error');
    }
}
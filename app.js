// Random Fact Generator - Application Logic

const API_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en';

const factCard = document.getElementById('factCard');
const factText = document.getElementById('factText');
const newFactBtn = document.getElementById('newFactBtn');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

let currentFact = '';

/**
 * Fetch a random fact from the UselessFacts API
 * @returns {Promise<string>} The fact text
 */
async function fetchRandomFact() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Set the loading state on the fact card
 */
function setLoading() {
  factCard.classList.add('loading');
  factCard.classList.remove('error');
  factText.textContent = '';
}

/**
 * Remove the loading state
 */
function removeLoading() {
  factCard.classList.remove('loading');
}

/**
 * Display an error message
 * @param {string} message - The error message to display
 */
function showError(message) {
  removeLoading();
  factCard.classList.add('error');
  factText.textContent = message;
}

/**
 * Display a fact
 * @param {string} fact - The fact to display
 */
function displayFact(fact) {
  removeLoading();
  factCard.classList.remove('error');
  factText.textContent = fact;
  currentFact = fact;
}

/**
 * Show a toast notification
 * @param {string} message - The message to show
 */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/**
 * Copy the current fact to clipboard
 */
async function copyToClipboard() {
  if (!currentFact) {
    showToast('No fact to copy yet!');
    return;
  }

  try {
    await navigator.clipboard.writeText(currentFact);
    copyBtn.classList.add('copied');
    showToast('Copied to clipboard!');

    setTimeout(() => {
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = currentFact;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      copyBtn.classList.add('copied');
      showToast('Copied to clipboard!');

      setTimeout(() => {
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      showToast('Failed to copy');
    }

    document.body.removeChild(textArea);
  }
}

/**
 * Handle fetching a new fact
 */
async function getNewFact() {
  newFactBtn.disabled = true;
  setLoading();

  try {
    const fact = await fetchRandomFact();
    displayFact(fact);
  } catch (error) {
    console.error('Error fetching fact:', error);
    
    if (error.name === 'AbortError') {
      showError('Request timed out. Please try again.');
    } else if (!navigator.onLine) {
      showError('You are offline. Please check your connection.');
    } else {
      showError('Something went wrong. Please try again.');
    }
  } finally {
    newFactBtn.disabled = false;
  }
}

/**
 * Check online/offline status
 */
function handleOnlineStatus() {
  if (!navigator.onLine && !factCard.classList.contains('error')) {
    // User went offline while app is running
  } else if (navigator.onLine && factCard.classList.contains('error') && factText.textContent.includes('offline')) {
    // User came back online after an offline error
    getNewFact();
  }
}

// Event Listeners
newFactBtn.addEventListener('click', getNewFact);
copyBtn.addEventListener('click', copyToClipboard);

// Listen for online/offline events
window.addEventListener('online', handleOnlineStatus);
window.addEventListener('offline', handleOnlineStatus);

// Load initial fact on page load (optional - uncomment if desired)
// getNewFact();

// Handle keyboard accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement === newFactBtn) {
    getNewFact();
  }
});
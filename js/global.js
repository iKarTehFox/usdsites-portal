// Scroll to top logic functions
function checkScrollPosition() {
  var scrollButton = document.getElementById('scroll-to-top-btn');
  if (scrollButton) {
    if (window.pageYOffset < 200) {
      scrollButton.style.opacity = 0;
      scrollButton.style.transition = "opacity 0.1s ease-out";
      scrollButton.style.pointerEvents = "none";
  } else {
      scrollButton.style.opacity = 1;
      scrollButton.style.transition = "opacity 0.1s ease-in";
      scrollButton.style.pointerEvents = "auto";
  }
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Last updated text navbar function
function updateLastUpdatedText() {
  const lastUpdated = new Date();
  lastUpdated.setTime(1686635191262);
  const currentDate = new Date();
  const timeDifference = Math.floor((currentDate - lastUpdated) / (1000 * 60 * 60));

  let text = '';

  if (timeDifference < 1) {
    text = 'Last updated less than an hour ago';
  } else if (timeDifference < 24) {
    text = `Last updated ${timeDifference} hours ago`;
  } else {
    const days = Math.floor(timeDifference / 24);
    text = `Last updated ${days} days ago`;
  }

  const lastUpdatedElement = document.getElementById('last-updated');
  if (lastUpdatedElement) {
    lastUpdatedElement.textContent = text;
  }
}

// Copy text function
function copyText(text) {
  try {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard: " + text);
  } catch (err) {
    alert("Error copying text: " + err);
  }
}

// Initialize last updated text in navbar on load
document.addEventListener('DOMContentLoaded', function() {
  updateLastUpdatedText();
});

// Start timer and event listener
setInterval(updateLastUpdatedText, 60000);
window.addEventListener('scroll', checkScrollPosition);

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

function copyText(text) {
  try {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard: " + text);
  } catch (err) {
    alert("Error copying text: " + err);
  }
}

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

function updateCurrentTime() {
  const dateElement = document.getElementById('network-datecard');
  if (dateElement) {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    var formattedDate = currentDate.toLocaleDateString(undefined, options);
    dateElement.textContent = formattedDate;
  }
}

function copyFormattedDate() {
  const dateCardElement = document.getElementById('network-datecard');
  const formattedDate = dateCardElement.textContent;
  copyText(formattedDate);
}

function getIPAddress() {
  // Remove disabled attribute from button first
  var ipButton = document.getElementById('ip-button');
  ipButton.removeAttribute('disabled');
  const networkIPTextElement = document.getElementById('network-ipcard');
  networkIPTextElement.textContent = "Getting IP information...";
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip);
}

function updateNetworkIPText() {
  getIPAddress()
    .then(ip => {
      const networkIPTextElement = document.getElementById('network-ipcard');
      if (networkIPTextElement) {
        networkIPTextElement.textContent = ip;
      }
    })
    .catch(error => {
      console.error('Error retrieving IP address:', error);
      const networkIPTextElement = document.getElementById('network-ipcard');
      networkIPTextElement.textContent = "Error retrieving IP address.";
    });
}

function getGeolocationInfo() {
  const geolocationElement = document.getElementById('network-geocard');
  geolocationElement.textContent = "Getting IP information...";
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const userIP = data.ip;
      geolocationElement.textContent = "Getting geolocation information...";
      fetch(`https://ipapi.co/${userIP}/json/`)
        .then(response => response.json())
        .then(geolocationData => {
          const geolocationText = `Estimated Location: ${geolocationData.city}, ${geolocationData.region}, ${geolocationData.country}`;
          if (geolocationElement) {
            geolocationElement.textContent = geolocationText;
          }
        });
    })
    .catch(error => {
      console.error('Error retrieving geolocation data:', error);
      const geolocationElement = document.getElementById('network-geocard');
      geolocationElement.textContent = "Error retrieving geolocation data.";
    });
}

function getConnectionSpeed() {
  if (navigator.connection) {
    const connection = navigator.connection;
    const { downlink, effectiveType } = connection;

    let speedText = '';
    if (downlink) {
      const speedMbps = (downlink * 8).toFixed(2);
      speedText = `${speedMbps} Mbps`;
    }

    if (effectiveType) {
      speedText += ` (${effectiveType})`;
    }

    return speedText;
  }

  return 'Connection speed information not available';
}

function setSpeedTestText() {
  const connectionSpeedElement = document.getElementById('network-speedcard');
  if (connectionSpeedElement) {
    connectionSpeedElement.textContent = "Click the link below to perform a speed test!";
  }
}

function setGeoIPText() {
  const geolocationElement = document.getElementById('network-geocard');
  geolocationElement.textContent = "Click the button below to request geo information.";
}

// Enable Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

document.addEventListener('DOMContentLoaded', function() {
  // Initialize cards
  updateLastUpdatedText(); // not a card but who cares...
  updateCurrentTime();
  updateNetworkIPText();
  setGeoIPText();
  setSpeedTestText();
  
  // Enable buttons (Will error if not index.html)
  var buttons = ['copylink-button', 'geo-button', 'ip-button', 'unix-button', 'date-button', 'speed-button'];

  buttons.forEach(function(buttonId) {
    var button = document.getElementById(buttonId);
    if (button) {
      button.removeAttribute('disabled');
    }
  });

});

setInterval(updateCurrentTime, 500);
setInterval(updateLastUpdatedText, 60000);
window.addEventListener('scroll', checkScrollPosition);

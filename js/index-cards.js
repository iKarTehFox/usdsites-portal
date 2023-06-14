// Network IP card functions
function getIPAddress() {
  const networkIPTextElement = document.getElementById('network-ipcard');
  networkIPTextElement.textContent = "Getting IP information...";
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip);
}

function updateNetworkIPText() { // Runs automatically on load
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

// Network geolocation card functions
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

// Current time card functions
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

// Initialize cards text functions
function setGeoIPText() {
  const geolocationElement = document.getElementById('network-geocard');
  geolocationElement.textContent = "Click the button below to request geo information.";
}

function setSpeedTestText() {
  const connectionSpeedElement = document.getElementById('network-speedcard');
  if (connectionSpeedElement) {
    connectionSpeedElement.textContent = "Click the link below to perform a speed test!";
  }
}

// Initialize cards on load
document.addEventListener('DOMContentLoaded', function() {
  updateNetworkIPText();
  setGeoIPText();
  updateCurrentTime();
  setSpeedTestText();
  
  // Enable buttons
  var buttons = ['copylink-button', 'geo-button', 'ip-button', 'unix-button', 'date-button', 'speed-button'];

  buttons.forEach(function(buttonId) {
    var button = document.getElementById(buttonId);
    if (button) {
      button.removeAttribute('disabled');
    }
  });

});


// Start timer for time card
setInterval(updateCurrentTime, 500);
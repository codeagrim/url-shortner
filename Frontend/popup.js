const BASE_URL = 'http://localhost:3001';

// show/hide sections
const showSection = (sectionId) => {
  console.log(`Showing section: ${sectionId}`);
  document.querySelectorAll('#app > div').forEach(div => {
    div.classList.add('hidden');
    console.log(`Hiding div: ${div.id}`);
  });
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
    console.log(`Section ${sectionId} shown`);
  } else {
    console.error(`Section ${sectionId} not found`);
  }
};


//display error
const showError = (message) => {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    if (message === 'Copied to clipboard!') {
      errorDiv.classList.add('success');
      setTimeout(() => {
        errorDiv.classList.remove('success');
        errorDiv.classList.add('hidden');
      }, 2000);
    }
    console.log(`Error displayed: ${message}`);
  } else {
    console.error('Error message div not found');
  }
};

document.addEventListener('DOMContentLoaded', () => 
  {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    if(url == 'chrome://newtab/'){
      return  showError('Failed to shorten URL');
    }
    document.getElementById('original-url').value = url;
});
  });


// Shorten URL handler
document.getElementById('shorten-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const originalUrl = document.getElementById('original-url').value;
  try {
    const response = await fetch(`${BASE_URL}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });
    const data = await response.json();
    if (response.status === 409) {
      const resultDiv = document.getElementById('shortened-result');
      const shortUrlLink = document.getElementById('short-url');
      shortUrlLink.textContent = `http://localhost:3001/${data.shortId}`;
      shortUrlLink.href = `http://localhost:3001/${data.shortId}`;
      resultDiv.classList.remove('hidden');

      await generateQRCode(data.shortId);

      showError(`${data.message}` || 'Failed to shorten URL');
    } 
    else if(response.ok) {
      const resultDiv = document.getElementById('shortened-result');
      const shortUrlLink = document.getElementById('short-url');
      shortUrlLink.textContent = `http://localhost:3001/${data.shortId}`;
      shortUrlLink.href = `http://localhost:3001/${data.shortId}`;

      await generateQRCode(data.shortId);


      resultDiv.classList.remove('hidden');
    }
    else {
      showError(data.message || 'Failed to shorten URL');
    }
  } catch (error) {
    console.error('Shorten URL error:', error.message);
    showError('Server error');
  }
});

// Copy short URL to clipboard
document.getElementById('copy-btn').addEventListener('click', () => {
  const shortUrl = document.getElementById('short-url').textContent;
  navigator.clipboard.writeText(shortUrl).then(() => {
    showError('Copied to clipboard!');
  }).catch(err => {
    console.error('Copy error:', err);
    showError('Failed to copy URL');
  });
});

async function generateQRCode(shortId) {  
// Generate QR code

  try {
    const response = await fetch(`${BASE_URL}/qr/${shortId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
       const qrResult = document.getElementById('qr-result');
      const qrImage = document.getElementById('qr-image');
      qrImage.src = data.QRimage;
      const downloadqr = document.getElementById('download-qr');
      downloadqr.href = data.QRimage;
      qrResult.classList.remove('hidden');
    } else {
      showError(data.message || 'Failed to generate QR code');
    }
  } catch (error) {
    console.error('QR code error:', error.message);
    showError('Server error');
  }
}

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Initialize
console.log('Initializing extension');
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
}
showSection('main-section');
loadAnalytics();
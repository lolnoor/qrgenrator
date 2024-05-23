import React, { useState } from 'react';
import QRCode from 'qrcode';
import './index.css';

function App() {
  const [url, setUrl] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [error, setError] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const GenerateQRCode = () => {
    if (isValidUrl(url)) {
      QRCode.toDataURL(url, {
        width:800,
        margin:2,
        color:{
            dark: '#301934'
        }
      }, (err, url) => {
        if (err) return console.error(err);
        setQrcode(url);
        setError(false);
      });
    } else {
      setQrcode('');
      setError(true);
    }
  };

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="e.g. https://exampleurl.com"
        value={url}
        onChange={(evt) => setUrl(evt.target.value)}
      />
      <button onClick={GenerateQRCode}>Generate</button>
      {qrcode ? ( <>
        <img src={qrcode} alt="qrcode" />
        <a href= {qrcode} download="qrcode.png">Download </a>
        </>
      ) : (
        error && <p><text>Please enter the URL carefully</text></p>
      )}
      
    </div>
  );
}

export default App;
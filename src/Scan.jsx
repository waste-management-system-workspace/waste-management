import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Scan.css';

const wasteClasses = {
  en: ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-waste'],
  zu: ['Ipulasitiki', 'Iphepha', 'Insimbi', 'Ingilazi', 'Okwemvelo', 'I-e-waste'],
  af: ['Plastiek', 'Papier', 'Metaal', 'Glas', 'Organies', 'E-afval'],
  ts: ['Pulasitiki', 'Phepha', 'Nsimbi', 'Gilazi', 'Swi humelela hi tlhelo', 'E-waste'],
  st: ['Polasetiki', 'Pampiri', 'Tšebetso', 'Galase', 'Tša tlhaho', 'E-waste'],
  ve: ['Ṱhulusi', 'Beba', 'Tsimbi', 'Gilasi', 'Zwa vhutshilo', 'E-waste']
};

export default function Scan() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef();
  const fileInputRef = useRef();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 400, 
          height: 300,
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      videoRef.current.srcObject = stream;
      setCameraStarted(true);
      setError(null);
      setUploadedImage(null); // Clear any uploaded image when starting camera
    } catch (err) {
      console.error('Camera error:', err);
      setError(t('camera_error'));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Stop camera if it's running
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setCameraStarted(false);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const classifyWaste = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock classification - randomly select a waste type
      const language = i18n.language || 'en';
      const availableClasses = wasteClasses[language] || wasteClasses.en;
      const randomIndex = Math.floor(Math.random() * availableClasses.length);
      const classifiedType = availableClasses[randomIndex];
      
      setResult({
        type: classifiedType,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100% confidence
        points: Math.floor(Math.random() * 10) + 5 // 5-15 points
      });
      
    } catch (err) {
      console.error('Classification error:', err);
      setError(t('classification_error'));
    } finally {
      setLoading(false);
    }
  };

  const logDisposal = () => {
    if (result) {
      // In a real app, this would send data to a backend
      console.log('Logging disposal:', result);
      alert(t('disposal_logged', { type: result.type, points: result.points }));
      setResult(null);
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      if (videoElement?.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="scanner-container">
      <h1>{t('scan_title')}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="video-container">
        {uploadedImage ? (
          <img 
            src={uploadedImage} 
            alt={t('uploaded_waste_image')} 
            className="scanner-video"
            style={{
              display: 'block',
              objectFit: 'cover'
            }}
          />
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="scanner-video"
              style={{
                display: cameraStarted ? 'block' : 'none'
              }}
            />
            
            {!cameraStarted && (
              <div className="camera-placeholder">
                <p>{t('camera_placeholder1')}</p>
                <p>{t('camera_placeholder2')}</p>
                <p>{t('camera_placeholder3')}</p>
                <p>{t('camera_placeholder4')}</p>
              </div>
            )}
          </>
        )}
        
        <div className="camera-controls">
          <button 
            onClick={startCamera}
            className="camera-btn"
            disabled={cameraStarted || uploadedImage}
          >
            {cameraStarted ? t('camera_started') : t('start_camera')}
          </button>
          
          <button 
            onClick={() => fileInputRef.current.click()}
            className="upload-btn"
            disabled={loading}
          >
            {t('upload_image')}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>
      
      <div className="action-buttons">
        <button 
          onClick={classifyWaste}
          disabled={loading || (!cameraStarted && !uploadedImage)}
          className={`classify-btn ${loading ? 'loading' : ''}`}
        >
          {loading ? t('classifying') : t('classify_waste')}
        </button>
      </div>
      
      {result && (
        <div className="result-card">
          <h3>{t('dispose_in')}:</h3>
          <p className="result-type">{result.type}</p>
          <p className="confidence">{t('confidence')}: {result.confidence}%</p>
          <p className="points-earned">{t('earn_points', { points: result.points })}</p>
          <button className="log-btn" onClick={logDisposal}>
            {t('log_disposal')}
          </button>
        </div>
      )}
    </div>
  );
}
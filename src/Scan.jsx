import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Scan.css';

const wasteClasses = {
  en: ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-waste'],
  zu: ['Ipulasitiki', 'Iphepha', 'Insimbi', 'Ingilazi', 'Okwemvelo', 'I-e-waste'],
  af: ['Plastiek', 'Papier', 'Metaal', 'Glas', 'Organies', 'E-afval'],
};

const wasteDetails = {
  Plastic: {
    description: "Recyclable plastic container",
    disposal: "Yellow recycling bin",
    icon: "♻️",
    color: "#3498db",
    tips: ["Rinse before recycling", "Remove caps and lids", "Flatten containers to save space"]
  },
  Paper: {
    description: "Paper or cardboard material",
    disposal: "Blue recycling bin",
    icon: "📄",
    color: "#e74c3c",
    tips: ["Flatten cardboard boxes", "Remove any plastic packaging", "Keep dry and clean"]
  },
  Metal: {
    description: "Metal can or container",
    disposal: "Green recycling bin",
    icon: "🥫",
    color: "#95a5a6",
    tips: ["Rinse cans before recycling", "Remove paper labels if possible", "Crush aluminum cans to save space"]
  },
  Glass: {
    description: "Glass bottle or jar",
    disposal: "Purple glass bin",
    icon: "🍾",
    color: "#9b59b6",
    tips: ["Rinse thoroughly", "Remove metal caps and lids", "Don't mix with other recyclables"]
  },
  Organic: {
    description: "Food waste or compostable material",
    disposal: "Brown compost bin",
    icon: "🍎",
    color: "#27ae60",
    tips: ["No plastic in compost", "Collect in compostable bags", "Mix with yard waste"]
  },
  "E-waste": {
    description: "Electronic waste or batteries",
    disposal: "Special e-waste facility",
    icon: "🔋",
    color: "#f39c12",
    tips: ["Never put in regular bins", "Check for drop-off locations", "Remove batteries if possible"]
  }
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
  const [scanProgress, setScanProgress] = useState(0);
  const [showScanAnimation, setShowScanAnimation] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 300, 
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
      setResult(null);
      setShowScanAnimation(true);
      setScanProgress(0);
      
      // Simulate scanning progress
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock classification - randomly select a waste type
      const language = i18n.language || 'en';
      const availableClasses = wasteClasses[language] || wasteClasses.en;
      const randomIndex = Math.floor(Math.random() * availableClasses.length);
      const classifiedType = availableClasses[randomIndex];
      
      setResult({
        type: classifiedType,
        confidence: Math.floor(Math.random() * 15) + 85, // 85-100% confidence
        points: Math.floor(Math.random() * 10) + 5, // 5-15 points
        ...wasteDetails[availableClasses[randomIndex]]
      });
      
      setShowScanAnimation(false);
      setLoading(false);
      clearInterval(progressInterval);
    } catch (err) {
      console.error('Classification error:', err);
      setError(t('classification_error'));
      setLoading(false);
      setShowScanAnimation(false);
    }
  };

  const logDisposal = () => {
    if (result) {
      // In a real app, this would send data to a backend
      console.log('Logging disposal:', result);
      alert(`${t('disposal_logged')}: ${result.type} in ${result.disposal}`);
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
      {/* Header with centered title */}
      <header className="app-header">
        <div className="header-content">
          <div className="scan-header">
            <Link to="/" className="back-btn">
              &larr; {t('back')}
            </Link>
            <h1 className="scan-title">{t('scan_title')}</h1>
            <div className="header-controls">
              <select 
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="language-selector"
              >
                <option value="en">🇺🇸 English</option>
                <option value="zu">🇿🇦 isiZulu</option>
                <option value="af">🇿🇦 Afrikaans</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="scanner-content">
        {error && <div className="error-message">{error}</div>}
        
        <div className="video-container">
          {uploadedImage ? (
            <div className="image-preview-container">
              <img 
                src={uploadedImage} 
                alt={t('uploaded_waste_image')} 
                className="scanner-image"
              />
              {showScanAnimation && (
                <div className="scan-animation">
                  <div className="scan-line" style={{ top: `${scanProgress}%` }}></div>
                  <div className="scan-progress">{scanProgress}%</div>
                </div>
              )}
            </div>
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
                </div>
              )}
            </>
          )}
          
          <div className="camera-controls">
            <button 
              onClick={startCamera}
              className={`camera-btn ${cameraStarted ? 'active' : ''}`}
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
          <div className="result-card" style={{ borderColor: result.color }}>
            <div className="result-header">
              <div className="result-icon" style={{ backgroundColor: `${result.color}20` }}>
                {result.icon}
              </div>
              <div>
                <h3>{t('dispose_in')}:</h3>
                <p className="result-type" style={{ color: result.color }}>
                  {result.disposal}
                </p>
              </div>
            </div>
            
            <div className="result-details">
              <div className="detail-item">
                <span className="detail-label">Material:</span>
                <span className="detail-value">{result.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Confidence:</span>
                <span className="detail-value">{result.confidence}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{result.description}</span>
              </div>
            </div>
            
            <div className="points-earned">
              {t('earn_points', { points: result.points })}
            </div>
            
            <div className="disposal-tips">
              <h4>Disposal Tips:</h4>
              <ul>
                {result.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <button className="log-btn" onClick={logDisposal}>
              {t('log_disposal')}
            </button>
          </div>
        )}
        
        {!result && !loading && (
          <div className="scan-guide">
            <h3>How to scan waste items:</h3>
            <ol>
              <li>Position the item on a flat surface with good lighting</li>
              <li>Make sure the entire item is visible in the frame</li>
              <li>Keep your camera steady for accurate scanning</li>
              <li>Scan one item at a time for best results</li>
            </ol>
            <div className="examples-grid">
              <div className="example">
                <div className="example-icon">🥫</div>
                <span>Metal Can</span>
              </div>
              <div className="example">
                <div className="example-icon">🧃</div>
                <span>Plastic Bottle</span>
              </div>
              <div className="example">
                <div className="example-icon">📰</div>
                <span>Newspaper</span>
              </div>
              <div className="example">
                <div className="example-icon">🍶</div>
                <span>Glass Jar</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
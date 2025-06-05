import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Municipal.css';

export default function Municipal() {
  const { t } = useTranslation();
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on time range
        const mockData = timeRange === 'day' 
          ? [
              { x: 'Soweto', y: 82, bins: 45 },
              { x: 'Khayelitsha', y: 38, bins: 32 },
              { x: 'Alexandra', y: 65, bins: 28 },
              { x: 'Diepsloot', y: 71, bins: 41 },
              { x: 'Gugulethu', y: 59, bins: 35 },
            ]
          : timeRange === 'week'
          ? [
              { x: 'Soweto', y: 75, bins: 120 },
              { x: 'Khayelitsha', y: 42, bins: 85 },
              { x: 'Alexandra', y: 38, bins: 92 },
              { x: 'Diepsloot', y: 65, bins: 110 },
              { x: 'Gugulethu', y: 53, bins: 78 },
            ]
          : [
              { x: 'Soweto', y: 78, bins: 520 },
              { x: 'Khayelitsha', y: 45, bins: 380 },
              { x: 'Alexandra', y: 41, bins: 410 },
              { x: 'Diepsloot', y: 68, bins: 475 },
              { x: 'Gugulethu', y: 56, bins: 340 },
            ];
        
        setHeatmapData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);

  const generateOptimizedRoutes = () => {
    // Mock route optimization
    const highActivityAreas = heatmapData.filter(area => area.y > 60);
    alert(`Generated optimized routes for ${highActivityAreas.length} high-activity areas: ${highActivityAreas.map(area => area.x).join(', ')}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{t('municipal_dashboard')}</h1>
        <div className="time-selector">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">{t('last_day')}</option>
            <option value="week">{t('last_week')}</option>
            <option value="month">{t('last_month')}</option>
          </select>
        </div>
      </header>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Areas</h3>
          <div className="stat-number">{heatmapData.length}</div>
        </div>
        <div className="stat-card">
          <h3>Average Rate</h3>
          <div className="stat-number">
            {Math.round(heatmapData.reduce((acc, area) => acc + area.y, 0) / heatmapData.length)}%
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Bins</h3>
          <div className="stat-number">
            {heatmapData.reduce((acc, area) => acc + area.bins, 0)}
          </div>
        </div>
      </div>

      <div className="heatmap-section">
        <h2>{t('recycling_heatmap')}</h2>
        <div className="heatmap-container">
          {heatmapData.map((area, index) => (
            <div 
              key={index}
              className="heatmap-area"
              style={{
                backgroundColor: `rgba(46, 204, 113, ${area.y / 100})`,
                borderColor: area.y > 60 ? '#27ae60' : '#e74c3c',
                borderWidth: area.y > 60 ? '3px' : '2px'
              }}
            >
              <span className="area-name">{area.x}</span>
              <div className="area-stats">
                <div className="recycling-rate">
                  <strong>{area.y}%</strong> {t('recycling_rate')}
                </div>
                <div className="bins-count">
                  <strong>{area.bins}</strong> {t('bins_serviced')}
                </div>
                <div className="status-indicator">
                  <span className={`status ${area.y > 60 ? 'good' : 'needs-attention'}`}>
                    {area.y > 60 ? '✓ Good' : '⚠ Needs Attention'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="optimization-section">
        <h2>{t('route_optimization')}</h2>
        <div className="optimization-card">
          <p>{t('optimization_suggestion')}</p>
          <div className="optimization-stats">
            <p><strong>High Activity Areas:</strong> {heatmapData.filter(area => area.y > 60).length}</p>
            <p><strong>Areas Needing Attention:</strong> {heatmapData.filter(area => area.y <= 60).length}</p>
          </div>
          <button className="optimize-btn" onClick={generateOptimizedRoutes}>
            {t('generate_routes')}
          </button>
        </div>
      </div>
    </div>
  );
}
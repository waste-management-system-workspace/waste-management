import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Rewards.css';

const partnerOffers = {
  en: [
    { name: "Shoprite", discount: "10% off", points: 50 },
    { name: "Pick n Pay", discount: "Free reusable bag", points: 30 },
    { name: "Woolworths", discount: "15% off organic products", points: 70 }
  ],
  zu: [
    { name: "Shoprite", discount: "10% off", points: 50 },
    { name: "Pick n Pay", discount: "Isikhwama esisetshenziswa kabusha samahhala", points: 30 },
    { name: "Woolworths", discount: "15% off imikhiqizo yemvelo", points: 70 }
  ],
  af: [
    { name: "Shoprite", discount: "10% afslag", points: 50 },
    { name: "Pick n Pay", discount: "Gratis herbruikbare sak", points: 30 },
    { name: "Woolworths", discount: "15% afslag op organiese produkte", points: 70 }
  ]
};

export default function Rewards() {
  const { t, i18n } = useTranslation();
  const [userPoints] = useState(120);
  const currentOffers = partnerOffers[i18n.language] || partnerOffers.en;

  return (
    <div className="rewards-container">
      <h1>{t('rewards_title')}</h1>
      
      <div className="points-display">
        <h2>{t('your_points')}</h2>
        <div className="points-value">{userPoints}</div>
        <p>{t('points_description')}</p>
      </div>
      
      <div className="offers-section">
        <h2>{t('available_offers')}</h2>
        <div className="offers-grid">
          {currentOffers.map((offer, index) => (
            <div key={index} className="offer-card">
              <h3>{offer.name}</h3>
              <p className="discount">{offer.discount}</p>
              <p className="points-required">{t('points_required')}: {offer.points}</p>
              <button 
                className="redeem-btn"
                disabled={userPoints < offer.points}
              >
                {t('redeem_offer')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
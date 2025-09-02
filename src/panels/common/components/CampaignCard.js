import {React, useState} from 'react';
import { Card, Div, Gradient, Image } from '@vkontakte/vkui';

import './css/CampaignCard.css';

function CampaignCard({ imageSrc, title, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      mode="shadow"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='campaignCardBase'
    >
      {/* Image background */}
      <Image
        src={imageSrc}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      <Gradient
        to="top"
        style={{
          height: hovered ? 120 : 80,
          transition: 'height 0.3s ease, background 0.3s ease',
          background: hovered
            ? 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,1) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.8) 100%)',
        }}
        className='campaignCardShadow'
      />

      {/* Text */}
      <Div
        style={{
          textShadow: '0 0 5px rgba(0,0,0,0.7)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
        className='campaignCardTitle'
      >
        {title}
      </Div>
    </Card>
  );
}

export default CampaignCard;

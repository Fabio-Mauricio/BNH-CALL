import React, { useEffect } from "react";
import * as L from './LogoSlider.style';

const LogoSlider = () => {
  const logos = [
    { id: 1, image: '/images/logos/coca-cola_logo.png' },
    { id: 2, image: '/images/logos/pepsi_logo.png' },
    { id: 3, image: '/images/logos/microsoft_logo.png' },
    { id: 4, image: '/images/logos/playstation_logo.png' },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos]

  useEffect(() => {
    duplicatedLogos.forEach(logo => {
      const img = new Image();
      img.src = logo.image;
    });
  }, []);

  return (
  <L.Logos>
    <L.Track>
      {duplicatedLogos.map((logo, index) => (
        <L.LogoImage key={index} src={logo.image} />
      ))}
    </L.Track>
  </L.Logos>
)};

export default LogoSlider;

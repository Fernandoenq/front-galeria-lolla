import React, { useState } from 'react';

import { QRCodeCanvas } from 'qrcode.react';
import './VideoCard.css';

interface Video {
  image_id: number;
  image_name: string;
  url: string;
}

interface Props {
  video: Video;
}

const VideoCard: React.FC<Props> = ({ video }) => {
  const [showQR, setShowQR] = useState(false);

  const handleToggleQR = () => {
    setShowQR((prev) => !prev);
  };

  return (
    <div className={showQR ? 'video-card fullscreen' : 'video-card'}>
      {showQR ? (
        <>
          <h1 className="galeria-titulo">Galeria Picbrand</h1>
          <QRCodeCanvas value={video.url} size={256} />
          <button onClick={handleToggleQR} className="fechar-btn">Fechar</button>
        </>
      ) : (
        <video
          width="100%"
          controls
          onClick={handleToggleQR}
          poster="https://upload.wikimedia.org/wikipedia/commons/7/75/No_video_thumbnail.svg"
        >
          <source src={video.url} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      )}
    </div>
  );
};

export default VideoCard;

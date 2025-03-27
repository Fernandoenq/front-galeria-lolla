import React, { useState, useEffect } from 'react';
import api from './services/api';
import VideoCard from './components/VideoCard';
import './components/VideoCard.css';

interface Video {
  image_id: number;
  image_name: string;
  url: string;
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get<Video[]>('/imagens');
        setVideos(res.data);
      } catch (err) {
        console.error('❌ Erro ao buscar vídeos da API:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', paddingBottom: '4rem' }}>
      <h1 className="galeria-titulo-principal">Galeria Picbrand</h1>

      {loading && (
        <p style={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>
          🔄 Carregando vídeos...
        </p>
      )}

      {error && (
        <p style={{ color: 'red', textAlign: 'center', fontSize: '1.2rem' }}>
          ❌ Não foi possível conectar à API. Verifique a conexão ou backend.
        </p>
      )}

      {!loading && !error && videos.length === 0 && (
        <p style={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>
          📭 Nenhum vídeo disponível no momento.
        </p>
      )}

      {!loading && !error && videos.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          {videos.map((video) => (
            <VideoCard key={video.image_name} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

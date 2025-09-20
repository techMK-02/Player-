import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';

const Player: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      try {
        new URL(url); // Validate URL
        setVideoUrl(url);
      } catch (e) {
        setError('Invalid video URL');
      }
    } else {
      setError('No video URL provided');
    }
  }, [searchParams]);

  return (
    <div className="player-container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {loading && <p className="loading">Loading...</p>}
          {videoUrl && (
            <ReactPlayer
              url={videoUrl}
              playing={true}
              controls={true}
              width="80%"
              height="80%"
              onReady={() => setLoading(false)}
              onError={() => setError('Error loading video')}
              config={{
                youtube: {
                  playerVars: { showinfo: 0 },
                },
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Player;

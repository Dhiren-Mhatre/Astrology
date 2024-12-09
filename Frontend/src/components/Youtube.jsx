import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';

const YouTubeMiniPlayer = ({ 
  videoId, 
  thumbnail, 
  aspectRatio = '16:9' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  // Calculate aspect ratio classes
  const aspectRatioMap = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '21:9': 'aspect-[21/9]'
  };

  const aspectRatioClass = aspectRatioMap[aspectRatio] || 'aspect-video';

  return (
    <div 
      className={`relative w-full cursor-pointer ${aspectRatioClass} h-auto md:h-[350px] lg:h-[500px] md:w-[750px] lg:w-[1500px]`}
      onClick={handlePlay}
    >
      {!isPlaying ? (
        <div className="absolute inset-0">
          {/* Thumbnail or placeholder image */}
          <img 
            src={thumbnail || `/api/placeholder/800/450`} 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
            <PlayCircle 
              color="white" 
              size={64} 
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0">
          {/* YouTube Embedded Player */}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 z-10"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeMiniPlayer;
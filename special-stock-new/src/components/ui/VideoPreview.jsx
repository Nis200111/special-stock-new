import React, { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const VideoPreview = ({ src, poster, className }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.error("Video play failed:", err));
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <div
            className="relative w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                src={src}
                className={className}
                muted
                loop
                playsInline
                poster={poster} // Optional: Add poster if available
            />
            {/* Play Icon Overlay (visible when not playing) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/30 p-3 rounded-full backdrop-blur-sm">
                        <FaPlay className="text-white text-xl opacity-80" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPreview;

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface Song {
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // Sample playlist - replace with actual data from your backend
  const playlist: Song[] = [
    {
      title: "Shadow Warriors",
      artist: "Neon Fighters",
      url: "https://example.com/song1.mp3", // Replace with actual URL
      cover: "https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg"
    },
    {
      title: "Neon Dreams",
      artist: "Cyber Beats",
      url: "https://example.com/song2.mp3", // Replace with actual URL
      cover: "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg"
    }
  ];

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4f46e5',
        progressColor: '#818cf8',
        cursorColor: '#818cf8',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 60,
        barGap: 3
      });

      wavesurferRef.current.load(playlist[currentSongIndex].url);

      wavesurferRef.current.on('ready', () => {
        setDuration(wavesurferRef.current?.getDuration() || 0);
      });

      wavesurferRef.current.on('audioprocess', () => {
        setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0);
      });

      wavesurferRef.current.on('finish', () => {
        if (isRepeat) {
          wavesurferRef.current?.play();
        } else if (isShuffle) {
          const nextIndex = Math.floor(Math.random() * playlist.length);
          setCurrentSongIndex(nextIndex);
        } else {
          const nextIndex = (currentSongIndex + 1) % playlist.length;
          setCurrentSongIndex(nextIndex);
        }
      });
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [currentSongIndex]);

  useEffect(() => {
    wavesurferRef.current?.setVolume(volume);
  }, [volume]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(isMuted ? volume : 0);
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-black/50 backdrop-blur-md rounded-xl p-5 border border-gray-800 hover:border-violet-900/50 transition-all duration-500 shadow-lg hover:shadow-glow-violet/20">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Album art */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-violet-900 to-blue-900 flex-shrink-0 group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
            style={{ backgroundImage: `url('${playlist[currentSongIndex].cover}')` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
        {/* Song details */}
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-semibold text-lg">{playlist[currentSongIndex].title}</h3>
              <p className="text-gray-400 text-sm">{playlist[currentSongIndex].artist}</p>
            </div>
            <div className="text-gray-400 text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          {/* Waveform visualization */}
          <div ref={waveformRef} className="mt-4 w-full" />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsShuffle(!isShuffle)}
            className={`text-${isShuffle ? 'violet-500' : 'gray-400'} hover:text-white transition-colors`}
          >
            <Shuffle size={18} />
          </button>
          <button 
            onClick={() => setIsRepeat(!isRepeat)}
            className={`text-${isRepeat ? 'violet-500' : 'gray-400'} hover:text-white transition-colors`}
          >
            <Repeat size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrevious}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-glow-blue'
            }`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={handleNext}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="w-20 h-1 bg-gray-800 rounded-full relative group cursor-pointer">
            <div 
              className="absolute h-full bg-gray-400 rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
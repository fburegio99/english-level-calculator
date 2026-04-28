import React, { useState, useRef } from 'react';

const Header: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showFeliLogo, setShowFeliLogo] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLogoClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      setClickCount(0);
      setShowEasterEgg(true);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();

        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 5200);
      }

      setTimeout(() => setShowFeliLogo(true), 200);

      setTimeout(() => {
        setShowFeliLogo(false);
        setShowEasterEgg(false);
      }, 5200);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 relative overflow-visible">
      <style>
        {`
          @keyframes logoShake {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(-8deg); }
            40% { transform: rotate(8deg); }
            60% { transform: rotate(-6deg); }
            80% { transform: rotate(6deg); }
            100% { transform: rotate(0deg); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes confettiFall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
          }

          .logo-shake {
            animation: logoShake 0.5s ease-in-out;
          }

          .fade-in {
            animation: fadeIn 0.4s ease forwards;
          }

          .confetti-piece {
            position: absolute;
            top: 42px;
            width: 8px;
            height: 12px;
            border-radius: 2px;
            animation: confettiFall 1.2s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4">
          <div
            onClick={handleLogoClick}
            className={`cursor-pointer select-none ${isShaking ? 'logo-shake' : ''}`}
          >
            {!showFeliLogo ? (
              <img
                src="/Velozient-Logo-Hi-Res.jpg"
                alt="Velozient"
                className="h-8 w-auto fade-in"
              />
            ) : (
              <img
                src="/feli-was-here.png"
                alt="Feli was here"
                className="h-10 w-auto fade-in scale-105"
              />
            )}
          </div>

          <h1 className="text-lg sm:text-xl font-semibold text-slate-700">
            English Level Calculator
          </h1>
        </div>
      </div>

      {showEasterEgg && (
        <>
          <div className="absolute left-6 top-14 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-bounce z-50">
            Stop clicking me!
          </div>

          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="confetti-piece z-40"
              style={{
                left: `${20 + Math.random() * 220}px`,
                backgroundColor: ['#f9a825', '#003865', '#3b82f6', '#22c55e', '#ef4444'][index % 5],
                animationDelay: `${Math.random() * 0.25}s`,
              }}
            />
          ))}
        </>
      )}

      <audio ref={audioRef} src="/ff-sound.mp3" preload="auto" />
    </header>
  );
};

export default Header;

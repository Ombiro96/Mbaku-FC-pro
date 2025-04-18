import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useTheme } from '../context/ThemeContext';

const ChessHeroImage = () => {
  const { isDark } = useTheme();
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);

  // Simplified PGN - Scholar's Mate
  const moves = [
    'e4', 'e5',
    'Qh5', 'Nc6',
    'Bc4', 'Nf6',
    'Qxf7'
  ];

  useEffect(() => {
    try {
      const newGame = new Chess();
      setGame(newGame);

      const interval = setInterval(() => {
        setCurrentMove(prev => {
          try {
            if (prev >= moves.length) {
              const resetGame = new Chess();
              setGame(resetGame);
              return 0;
            }

            const nextGame = new Chess();
            for (let i = 0; i <= prev; i++) {
              nextGame.move(moves[i]);
            }
            setGame(nextGame);
            return prev + 1;
          } catch (error) {
            console.error('Error during move animation:', error);
            return prev;
          }
        });
      }, 1500);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error initializing chess game:', error);
    }
  }, []);

  return (
    <div className="chess-hero-container">
      <Chessboard
        position={game.fen()}
        boardWidth={400}
        customDarkSquareStyle={{ backgroundColor: isDark ? '#779952' : '#b58863' }}
        customLightSquareStyle={{ backgroundColor: isDark ? '#ebecd0' : '#f0d9b5' }}
        areArrowsAllowed={false}
        boardOrientation="white"
      />
    </div>
  );
};

export default ChessHeroImage;
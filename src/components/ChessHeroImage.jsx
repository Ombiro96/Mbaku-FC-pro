import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ChessHeroImage = () => {
  const { isDark } = useTheme();
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  const [currentGame, setCurrentGame] = useState(0);

  // Famous games collection
  const famousGames = [
    {
      name: "Immortal Game",
      white: "Adolf Anderssen",
      black: "Lionel Kieseritzky",
      moves: ['e4', 'e5', 'f4', 'exf4', 'Bc4', 'Qh4+', 'Kf1', 'b5', 'Bxb5', 'Nf6', 'Nf3', 'Qh6', 'd3', 'Nh5', 'Nh4', 'Qg5', 'Nf5', 'c6', 'g4', 'Nf6', 'Rg1', 'cxb5', 'h4', 'Qg6', 'h5', 'Qg5', 'Qf3', 'Ng8', 'Bxf4', 'Qf6', 'Nc3', 'Bc5', 'Nd5', 'Qxb2', 'Bd6', 'Bxg1', 'e5', 'Qxa1+', 'Ke2', 'Na6', 'Nxg7+', 'Kd8', 'Qf6+']
    },
    {
      name: "Game of the Century",
      white: "Donald Byrne",
      black: "Bobby Fischer",
      moves: ['Nf3', 'd5', 'c4', 'e6', 'd4', 'c5', 'e3', 'Nc6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bb5', 'Bd6', 'O-O', 'O-O', 'dxc5', 'Bxc5', 'h3', 'Bb4', 'Bd3', 'Bxc3', 'bxc3', 'Ne4', 'Bb2', 'f5', 'Qc2', 'Qe7', 'Rfe1', 'Bd7', 'Nd4', 'Nxd4', 'cxd4', 'Bb5']
    },
    {
      name: "Opera Game",
      white: "Paul Morphy",
      black: "Duke of Brunswick & Count Isouard",
      moves: ['e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3', 'Qxf3', 'dxe5', 'Bc4', 'Nf6', 'Qb3', 'Qe7', 'Nc3', 'c6', 'Bg5', 'b5', 'Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8', 'Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7', 'Qb8+', 'Nxb8', 'Rd8#']
    }
  ];

  useEffect(() => {
    try {
      const newGame = new Chess();
      setGame(newGame);

      const interval = setInterval(() => {
        setCurrentMove(prev => {
          try {
            const currentMoves = famousGames[currentGame].moves;
            if (prev >= currentMoves.length) {
              // Switch to next game
              setCurrentGame(current => (current + 1) % famousGames.length);
              const resetGame = new Chess();
              setGame(resetGame);
              return 0;
            }

            const nextGame = new Chess();
            for (let i = 0; i <= prev; i++) {
              nextGame.move(currentMoves[i]);
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
  }, [currentGame]);

  return (
    <div className="chess-hero-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-3">
          <h3 className="game-title">{famousGames[currentGame].name}</h3>
          <p className="players">
            <span className="white-player">{famousGames[currentGame].white}</span>
            {' vs '}
            <span className="black-player">{famousGames[currentGame].black}</span>
          </p>
        </div>
        <Chessboard
          position={game.fen()}
          boardWidth={400}
          customDarkSquareStyle={{ backgroundColor: isDark ? '#779952' : '#b58863' }}
          customLightSquareStyle={{ backgroundColor: isDark ? '#ebecd0' : '#f0d9b5' }}
          areArrowsAllowed={false}
          boardOrientation="white"
        />
      </motion.div>
    </div>
  );
};

export default ChessHeroImage;
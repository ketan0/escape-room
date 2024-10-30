import { useState } from 'react';

const INITIAL_PASSWORD = "halloween";

const RIDDLES = [
  {
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?",
    answer: "map"
  },
  {
    question: "The more I dry, the wetter I become. What am I?",
    answer: "towel"
  },
  {
    question: "What has keys, but no locks; space, but no room; and you can enter, but not go in?",
    answer: "keyboard"
  }
];

const GameScreen = () => {
  const [gameState, setGameState] = useState('password');
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (gameState === 'password') {
      if (input.toLowerCase() === INITIAL_PASSWORD) {
        setGameState('riddles');
        setMessage('');
      } else {
        setMessage('Incorrect password...');
      }
    } else if (gameState === 'riddles') {
      if (input.toLowerCase() === RIDDLES[currentRiddle].answer.toLowerCase()) {
        setMessage('Correct!');
        setTimeout(() => {
          if (currentRiddle === RIDDLES.length - 1) {
            setGameState('complete');
          } else {
            setCurrentRiddle(prev => prev + 1);
            setMessage('');
          }
        }, 1000);
      } else {
        setMessage('Try again...');
      }
    }
    setInput('');
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center p-4 font-[Creepster]">
      {gameState === 'password' && (
        <div className="w-full max-w-md text-center space-y-8">
          <h1 className="text-3xl mb-8">Enter the Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
              autoFocus
            />
            <p className="text-red-500 h-6">{message}</p>
          </form>
        </div>
      )}

      {gameState === 'riddles' && (
        <div className="w-full max-w-md text-center space-y-8">
          <h2 className="text-2xl mb-8">Riddle {currentRiddle + 1}</h2>
          <p className="text-xl mb-8">{RIDDLES[currentRiddle].question}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500"
              autoFocus
            />
            <p className={`h-6 ${message === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          </form>
        </div>
      )}

      {gameState === 'complete' && (
        <div className="text-center">
          <h1 className="text-5xl animate-pulse">Congratulations!</h1>
        </div>
      )}
    </div>
  );
};

// Load Creepster font from Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default GameScreen;

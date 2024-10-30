import { useState, useEffect } from 'react';

const INITIAL_PASSWORD = "ghostadmin";
const HINT_DELAY = 120000; // 2 minutes
const RIDDLES = [
    // {
    //     question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?",
    //     answer: "map",
    //     hint: "You might need me to find your way to the haunted house..."
    // },
    {
        question: "Say my name, and I am no more.",
    answer: "silence",
        hint: "Think about what disappears when you speak..."
    },
    {
        question: "Walk on the living, they don't even mumble. Walk on the dead, they mutter and grumble. What are they?",
        answer: "zombies",
        hint: "Think supernatural..."
    },
    {
        question: "The person who built it sold it. The person who bought it never used it. The person who used it never saw it. What is it?",
        answer: "coffin",
        hint: "It's the last bed you'll ever need..."
    },
];

const GameScreen = () => {
  const [gameState, setGameState] = useState('password');
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (gameState === 'riddles') {
      setShowHint(false);
      const timer = setTimeout(() => {
        setShowHint(true);
      }, HINT_DELAY); // 2 minutes
      
      return () => clearTimeout(timer);
    }
  }, [currentRiddle, gameState]);

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
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center p-4 font-[Creepster] relative">
      <div className="absolute top-4 left-4 text-red-500 text-sm max-w-[200px] leading-tight">
        please don't exit out of this window or try anything funny. the spirits will hate you
      </div>

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
          {showHint && (
            <p className="text-yellow-500 text-sm mb-8 italic">
              Hint: {RIDDLES[currentRiddle].hint}
            </p>
          )}
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
          <h1 className="text-5xl animate-pulse">PUZZLE COMPLETED - NEXT CLUE:</h1>
          <h1 className="text-5xl animate-pulse">SPECIMENS</h1>
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

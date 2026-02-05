import IPACard from "./components/IPACard";
import "./App.css";
import Button from "./components/Button";
import { useState } from "react";

function App() {

  const [correctSymbol, setCorrectSymbol] = useState(null);
  const [choices, setChoices] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState([]);
  const HISTORY_SIZE = 3;

  function getRandomSymbol() {
  const symbols = Object.keys(ipasheetPhrases).filter(s => !history.includes(s));
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  return symbol;
}

function getChoices(correct, count = 4) {
  const symbols = Object.keys(ipasheetPhrases).filter(s => s !== correct);
  const shuffled = symbols.sort(() => 0.5 - Math.random());
  return [correct, ...shuffled.slice(0, count - 1)]
    .sort(() => 0.5 - Math.random());
}

function startQuiz() {
  const symbol = getRandomSymbol();
  setCorrectSymbol(symbol);
  setChoices(getChoices(symbol));
  setFeedback("");

  // Update history
  setHistory(prev => {
    const newHistory = [...prev, symbol];
    if (newHistory.length > HISTORY_SIZE) {
      newHistory.shift(); // remove oldest
    }
    return newHistory;
  });

  const newAudio = new Audio(`/audio/${ipasheetPhrases[symbol].file}`);
  newAudio.play();
}

function checkAnswer(choice) {
  if (choice === correctSymbol) {
    setFeedback("✅ Correct!");
  } else {
    setFeedback(`❌ Nope — try again!`);
  }
}

function playSound() {
  if (!correctSymbol) return;
  if (isPlaying) return;

  const audio = new Audio(`/audio/${ipasheetPhrases[correctSymbol].file}`);
  setIsPlaying(true);

  audio.play().catch(err => {
    console.error("Audio failed to play:", err);
    setIsPlaying(false); // allow retry if audio fails
  });

  audio.onended = () => setIsPlaying(false);
}

  return (
    <div>
      <p className="center-text">Click on a card to hear the pronunciation!</p>
    {/* <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",}}>
      {Object.entries(ipasheetPhrases).map(([symbol, { phrase, file }]) => (
        <IPACard
          key={symbol}           // React needs a unique key for each element in a list
          symbol={`/${symbol}/`}  // Add slashes to match IPA style
          example={phrase}       // The example phrase
          audioSrc={`/audio/${file}`} // Audio file path
        />
      ))}
    </div> */}
    <div className="ipa-grid">
      {Object.entries(ipasheetPhrases).map(([symbol, { phrase, file }]) => (
        <IPACard
        key={symbol}
        symbol={`/${symbol}/`}
        example={phrase}
        audioSrc={`/audio/${file}`}
        />
        ))}
        </div>

        <div className="quiz-section">
  <h2 className="center-text">Listening Quiz</h2>

  {/* Play → Replay */}
  {!correctSymbol ? (
    <button onClick={startQuiz} className="center-button">
      ▶ Play Sound
    </button>
  ) : (
    <button onClick={playSound} className="center-button">
      🔁 Replay Sound
    </button>
  )}

  {/* Always visible */}
  <button
    onClick={startQuiz}
    className="center-button"
    disabled={!correctSymbol}
  >
    ⏭ New Sound
  </button>

  <div className="center-text choices">
    {choices.map(symbol => (
      <button
        key={symbol}
        onClick={() => checkAnswer(symbol)}
      >
        /{symbol}/
      </button>
    ))}
  </div>

  {feedback && <p className="center-text">{feedback}</p>}
</div>

        </div>
        );
      }

const ipasheetPhrases = {
  p: { phrase: "pin, spin, map, tap, cup", file: "Voiceless_bilabial_plosive.ogg"},
  b: { phrase: "bin, cab, tab, grab, snob", file: "Voiced_bilabial_plosive.ogg"},
  t: { phrase: "ten, stand, cat, bat, hit", file: "Voiceless_alveolar_plosive.ogg"},
  d: { phrase: "den, mad, bad, sad, hid", file: "Voiced_alveolar_plosive.ogg"},
  k: { phrase: "kin, cat, back, kick, lock", file: "Voiceless_velar_plosive.ogg"},
  g: { phrase: "go, bag, dog, flag, hug", file: "Voiced_velar_plosive.ogg"},
  ʔ: { phrase: "???", file: "Glottal_stop.ogg"},
  m: { phrase: "man, ham, am, him", file: "Bilabial_nasal.ogg"},
  n: { phrase: "nap, ten, sun, ban, pin", file: "Alveolar_nasal.ogg"},
  ŋ: { phrase: "sing, long, bang, hung, ring", file: "Velar_nasal.ogg"},
  ɲ: { phrase: "canyon, onion, lasagna", file: "Palatal_nasal.ogg"},
  ɴ: { phrase: "???", file: "Uvular_nasal.ogg"},
  B: { phrase: "???", file: "Bilabial_trill.ogg"},
  r: { phrase: "red, try, very, around", file: "Alveolar_trill.ogg"},
  R: { phrase: "???", file: "Uvular_trill.ogg"},
  // ⱱ: { phrase: "???", file: "Labiodental_flap.ogg"},
  ɾ: { phrase: "butter, ladder, city", file: "Alveolar_tap.ogg"},
  ɽ	: { phrase: "???", file: "Retroflex_flap.ogg"},
  ɸ: { phrase: "???", file: "Voiceless_bilabial_fricative.ogg"},



}

export default App;

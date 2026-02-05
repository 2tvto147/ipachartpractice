import IPACard from "./components/IPACard";
import "./App.css";
import Button from "./components/Button";
import { useState } from "react";

function App() {

  const [correctSymbol, setCorrectSymbol] = useState(null);
  const [choices, setChoices] = useState([]);
  const [feedback, setFeedback] = useState("");

  function getRandomSymbol() {
  const symbols = Object.keys(ipasheetPhrases);
  return symbols[Math.floor(Math.random() * symbols.length)];
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

  new Audio(`/audio/${ipasheetPhrases[correctSymbol].file}`).play();
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
  h: { phrase: "go, bag, dog, flag, hug", file: "Voiced_velar_plosive.ogg"},
}

export default App;

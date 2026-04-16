import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator() {
  const [password, setPassword] = useState("ABCD");
  const [length, setLength] = useState(10);

  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [numberChecked, setNumberChanged] = useState(false);
  const [characterChecked, setCharacterChanged] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const passGenerator = useCallback(() => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()~`";

    let selectedSets = [];
    let passwordArray = [];

    if (lowerCase) selectedSets.push(lower);
    if (upperCase) selectedSets.push(upper);
    if (numberChecked) selectedSets.push(numbers);
    if (characterChecked) selectedSets.push(symbols);

    if (selectedSets.length === 0) {
      setPassword("Select options!");
      return;
    }

   
    if (length < selectedSets.length) {
      setPassword("Increase length!");
      return;
    }

   
    selectedSets.forEach((set) => {
      passwordArray.push(set[Math.floor(Math.random() * set.length)]);
    });

  
    let allChars = selectedSets.join("");
    for (let i = passwordArray.length; i < length; i++) {
      passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    
    for (let i = passwordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [
        passwordArray[j],
        passwordArray[i],
      ];
    }

    setPassword(passwordArray.join(""));
  }, [length, lowerCase, upperCase, numberChecked, characterChecked]);

  useEffect(() => {
    passGenerator();
  }, [passGenerator]);

  const getStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return "Weak";
    if (score === 2) return "Medium";
    return "Strong";
  };

  const downloadPassword = () => {
    const blob = new Blob([password], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "password.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <div className="password-box">
        <input type="text" value={password} readOnly />

        <button
          onClick={() => {
            navigator.clipboard.writeText(password);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
          }}
        >
          Copy
        </button>

        <button onClick={downloadPassword}>Download</button>
      </div>

      <div className="controls">
        <div className="range">
          <label>Password Length: {length}</label>
          <input
            type="range"
            min={5}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={upperCase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
            Uppercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={lowerCase}
              onChange={(e) => setLowerCase(e.target.checked)}
            />
            Lowercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={numberChecked}
              onChange={(e) => setNumberChanged(e.target.checked)}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={characterChecked}
              onChange={(e) => setCharacterChanged(e.target.checked)}
            />
            Symbols
          </label>
        </div>
      </div>

      <div className="strength-container">
  <div className="strength-header">
    <span>Password Strength</span>
    <span className={`strength-label ${getStrength(password).toLowerCase()}`}>
      {getStrength(password)}
    </span>
  </div>

  <div className="strength-bar">
    <div className={`bar ${getStrength(password).toLowerCase()}`}></div>
  </div>

  <div className="strength-labels">
    <span>Weak</span>
    <span>Medium</span>
    <span>Strong</span>
  </div>
</div>

      {showToast && <div className="toast">Copied to clipboard!</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <PasswordGenerator />,
);

import React, { useState } from 'react';
import axios from 'axios';

function Translate() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/translate', { text, target_language: targetLanguage });
    setTranslatedText(res.data.translated_text);
  };

  return (
    <div>
      <h2>Translate Text</h2>
      <form onSubmit={handleTranslate}>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter text to translate"
        />
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>
        <button type="submit">Translate</button>
      </form>
      {translatedText && <p>Translated Text: {translatedText}</p>}
    </div>
  );
}

export default Translate;

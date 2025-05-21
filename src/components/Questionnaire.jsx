import React, { useState } from 'react';

const questions = [
  { id: 'beginner', label: 'Bist du Einsteiger?', options: ['Ja', 'Nein'] },
  { id: 'beach', label: 'Magst du Strand & Baden?', options: ['Ja', 'Nein'] },
  { id: 'budget', label: 'Budget', options: ['Günstig', 'Egal'] },
];

const matrix = {
  'Ionisches Meer': { Einsteiger: 3, 'Strand & Baden': 2, 'Budget: Günstig': 3 },
  Kykladen: { Einsteiger: -2, 'Strand & Baden': 1, 'Budget: Günstig': -1 },
};

function calculateRecommendation(answers) {
  let bestRegion = null;
  let bestScore = -Infinity;
  for (const region in matrix) {
    const f = matrix[region];
    let score = 0;
    if (answers.beginner === 'Ja') score += f.Einsteiger;
    if (answers.beach === 'Ja') score += f['Strand & Baden'];
    if (answers.budget === 'Günstig') score += f['Budget: Günstig'];
    if (score > bestScore) {
      bestScore = score;
      bestRegion = region;
    }
  }
  return bestRegion;
}

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  function handleChange(event) {
    setAnswers({ ...answers, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const recommendation = calculateRecommendation(answers);
    setResult(recommendation);
  }

  return (
    <div className="questionnaire">
      <h1>Segelrevier-Finder</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} className="question">
            <label>{q.label}</label>
            <select name={q.id} onChange={handleChange} required>
              <option value="">Bitte wählen</option>
              {q.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Revier finden</button>
      </form>
      {result && <p className="result">Empfohlenes Revier: {result}</p>}
    </div>
  );
}


import { useState } from 'react';

export default function QuoteCard({ quotes }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  if (quotes.length === 0) return null;

  // Pick a different quote each time (no immediate repeats).
  function nextQuote() {
    if (quotes.length < 2) return;
    let next;
    do {
      next = Math.floor(Math.random() * quotes.length);
    } while (next === index);
    setIndex(next);
  }

  const position = String(index + 1).padStart(2, '0');
  const total = String(quotes.length).padStart(2, '0');

  return (
    <section className="quote" aria-label="Quote">
      <div className="quote-head">
        <h2 className="block-title">Note to self</h2>
        <span className="quote-count numeric">
          {position} / {total}
        </span>
      </div>
      <blockquote key={index} className="quote-text">
        {quotes[index]}
      </blockquote>
      <button type="button" className="btn" onClick={nextQuote} disabled={quotes.length < 2}>
        Another one
      </button>
    </section>
  );
}

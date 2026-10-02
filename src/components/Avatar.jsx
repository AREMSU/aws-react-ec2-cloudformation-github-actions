import { useState } from 'react';

// Shows the photo from /public; falls back to initials if the file is missing or misnamed.
export default function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <div className="avatar">
      {src && !failed ? (
        <img
          src={`${import.meta.env.BASE_URL}${src}`}
          alt={`Photo of ${name}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="avatar-initials" aria-label={name}>
          {initials}
        </span>
      )}
    </div>
  );
}

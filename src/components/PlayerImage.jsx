import React from 'react';

const PlayerImage = ({ name, title }) => {
  // Generate a consistent background color based on name
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
    return '#' + color.toString(16).padStart(6, '0');
  };

  const bgColor = stringToColor(name);
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1rem'
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
        {initials}
      </div>
      <div style={{ fontSize: '1rem' }}>
        {title}
      </div>
    </div>
  );
};

export default PlayerImage;
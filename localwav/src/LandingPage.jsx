import { useState } from 'react';

function LandingPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('fileSelected');
    }
  };

  const masterTrack = (style) => {
    setStatus('processing');

    setTimeout(() => {
      setStatus('complete');
      console.log(`Finished mastering ${file.name} in ${style} style.`);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to localWAV</h1>
      <h3>Your audio mastering solution for proprietary files.</h3>
      <p>
        Audio stays on your machine. Use our tools to master it remotely. <br></br>No
        long uploads. No clouds.
      </p>
      {status === 'idle' && (
        <div style={styles.dropZone}>
          <input type='file' accept='.wav' onChange={handleFileChange} />
          <p>Select your unmastered WAV file to begin</p>
        </div>
      )}

      {status === 'fileSelected' && (
        <div style={styles.selectionArea}>
          <h3>Pick your mastering style for: {file.name}</h3>
          <div style={styles.cardContainer}>
            <button
              onClick={() => masterTrack('Cinematic')}
              style={styles.card}
            >
              <h4>Cinematic</h4>
              <p>Epic scale & deep lows</p>
            </button>
            <button onClick={() => masterTrack('Indie')} style={styles.card}>
              <h4>Indie Artist</h4>
              <p>Warm, punchy & loud</p>
            </button>
            <button onClick={() => masterTrack('Moderate')} style={styles.card}>
              <h4>Moderate</h4>
              <p>Clean touch-ups</p>
            </button>
          </div>
        </div>
      )}

      {status === 'processing' && (
        <div style={styles.loader}>
          <div className='spinner'></div>
          <p>Mastering locally... please keep this tab open.</p>
        </div>
      )}

      {status === 'complete' && (
        <div>
          <h2>Done!</h2>
          <p>Your mastered file has been saved to your downloads.</p>
          <button onClick={() => setStatus('idle')}>
            Master another track
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' },
  dropZone: {
    border: '2px dashed #ccc',
    padding: '40px',
    margin: '20px auto',
    maxWidth: '400px',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  card: {
    padding: '20px',
    width: '150px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
};

export default LandingPage;

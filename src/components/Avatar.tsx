export default function Avatar() {
  return (
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid var(--primary)',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '10px'
    }}>
      <img 
        src="/images/lucy.png" 
        alt="Cô Lộc Lucy" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%' // Approximate position for face
        }} 
      />
    </div>
  );
}

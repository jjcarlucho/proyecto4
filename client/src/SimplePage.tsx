import React from 'react';

const SimplePage: React.FC = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        AutoDiagnose AI - Página de Prueba
      </h1>
      <p style={{ marginBottom: '20px' }}>
        Si puedes ver esta página, el cliente está funcionando correctamente.
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f4f8',
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Información de Depuración</h2>
        <p>Variable API_URL: {import.meta.env.VITE_API_URL || 'No definida'}</p>
      </div>
    </div>
  );
};

export default SimplePage;
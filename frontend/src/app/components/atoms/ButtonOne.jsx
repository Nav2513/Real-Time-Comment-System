import React from 'react';
import Button from '@mui/material/Button';

function App() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary Button
      </Button>
      <Button variant="text" color="success">
        Text Button
      </Button>
    </div>
  );
}

export default App;

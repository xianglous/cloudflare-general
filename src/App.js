import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TrafficPlot from './traffic';
import DomainList from './domains';


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <TrafficPlot type="attack-layer3"/>
        <DomainList/>
      </Container>
    </React.Fragment>
  )
}

export default App;
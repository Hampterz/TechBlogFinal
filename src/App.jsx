import React from "react";
import Routes from './Routes';
import { ContentProvider } from './contexts/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Routes />
    </ContentProvider>
  );
}

export default App;
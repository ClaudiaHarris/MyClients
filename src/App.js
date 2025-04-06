import React from "react";
import { ClientProvider } from "./contexts/ClientContext";
import ClientScreen from "./pages/ClientScreen";




function App() {
  return (
    
      <ClientProvider>
        <ClientScreen />
      </ClientProvider>
   
  );
}

export default App;
// This is a placeholder for the temporary client screen.
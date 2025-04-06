import React from "react";
import { ClientProvider } from "./contexts/ClientContext";
import ClientScreen from "./pages/ClientScreen";

const PageTitle = () => {
  return <h1 className="page-title">My Clients</h1>;
};

const TemporaryClientScreen = () => {
  return (


    <div className="placeholder-content">
      
      <div className="bento-box-demo">
        <div className="demo-box">Client List</div>
        <div className="demo-box">
          <div className="demo-box">
            <div className="demo-inner-box">Client Details</div>
            <div className="demo-inner-box">Projects</div>
          </div>
        </div>   
    </div>
    </div>
  );
};

function App() {
  return (
    
      <ClientProvider>
        <PageTitle/>
        <ClientScreen />
      </ClientProvider>
   
  );
}

export default App;
// This is a placeholder for the temporary client screen.
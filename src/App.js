import React from "react";
import './App.css';
import MainLayout from "./components/layout/MainLayout";

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
    <div className="App">
      <MainLayout>
        <PageTitle />
        <TemporaryClientScreen />
      </MainLayout>
    </div>
  );
}

export default App;
// This is a placeholder for the temporary client screen.
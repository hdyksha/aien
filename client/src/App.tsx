import React from "react";
import { Button } from "./components/common/Button";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">AIEN</h1>
        <p className="text-gray-600">AI English Learning Application</p>
      </header>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Welcome to AIEN</h2>
        <p className="text-gray-700 mb-6">
          This application is currently under development. Stay tuned for the first release!
        </p>
        
        <div className="flex space-x-4">
          <Button label="Learn More" variant="primary" />
          <Button label="Contact" variant="secondary" />
        </div>
      </div>
    </div>
  );
}

export default App;

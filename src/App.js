import React from 'react';
import Form from './components/Form';
import Bookdetails from './components/Bookdetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-4 bg-white ">
        <Form />
        
      </div>

      {/* Bookdetails Section */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-md">
        <Bookdetails />
      </div>
    </div>
  );
}

export default App;

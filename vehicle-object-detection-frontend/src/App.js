import React from 'react';
import Navbar from './components/Navbar';
import ImageForm from './components/ImageForm';
import ImageDisplay from './components/ImageDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mt-4">
        <ImageForm />
      </div>
      <ImageDisplay />
    </div>
  );
}

export default App;
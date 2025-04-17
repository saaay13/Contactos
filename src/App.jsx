// src/App.jsx
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Registro de Contactos
        </h1>
        <ContactForm />
      </div>
    </div>
  );
}

export default App;

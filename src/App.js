import logo from './logo.svg';
import './App.css';
import { DeductionProvider } from './contexts/DeductionContext';
import ProofInterface from './components/ProofInterface';

function App() {
  return (
    <div className="App">
        <p>
          hello, world.
        </p>
        <DeductionProvider>
          <ProofInterface />
        </DeductionProvider>
    </div>
  );
}

export default App;

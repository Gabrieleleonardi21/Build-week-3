import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Header from './componets/Header'
import PremiumToast from './components/PremiumToast';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Header />
      <PremiumToast />
       <div style={{ margin: '20px' }}>
        <Sidebar />
        </div>
    </div>
  );
}

export default App;
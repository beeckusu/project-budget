import { Container } from 'react-bootstrap';
import DataDisplay from './components/Display/DataDisplay';
import Footer from './components/Footer';
import Header from './components/Header';
import SideBar from './components/SideBar/Main';
import { DataProvider } from './contexts/DataContext';
import { GraphProvider } from "./contexts/GraphContext";
import './css/layouts.css';
import './css/modules.css';
import './css/themes.css';
import './css/App.css';

function App() {
  return (
    <div>
      <div className='background' />
      <Header />
      <Container className='layout-padding-top layout-padding-bottom'>
        <DataProvider>
          <GraphProvider>
            <DataDisplay />
          </GraphProvider>
          <SideBar />
        </DataProvider>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

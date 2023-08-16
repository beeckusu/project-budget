import './App.css';
import './css/layouts.css';
import './css/modules.css';
import TransactionChart from './components/Chart/TransactionChart';
import TransactionTable from './components/Chart/TransactionTable';
import SideBar from './components/SideBar/Main';
import { DataProvider } from './contexts/DataContext';
import { GraphProvider } from './contexts/GraphContext';

function App() {
  return (
    <div>
      <DataProvider>
        <GraphProvider>
          <TransactionChart />
          <TransactionTable />
        </GraphProvider>
        <SideBar />
      </DataProvider>
    </div>
  );
}

export default App;

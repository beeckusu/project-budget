import './App.css';
import './css/layouts.css';
import './css/modules.css';
import TransactionChart from './components/Chart/TransactionChart';
import TransactionTable from './components/Chart/TransactionTable';
import SideBar from './components/SideBar/Main';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
        <TransactionChart />
        <TransactionTable />
        <SideBar />
      </DataProvider>
    </div>
  );
}

export default App;

import './App.css';
import './css/layouts.css';
import './css/modules.css';
import TransactionChart from './components/Chart/TransactionChart';
import FileUploadParser from './components/FileUpload/FileUploadParser';
import SideBar from './components/SideBar/Main';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
        <FileUploadParser />
        <TransactionChart />
        <SideBar />
      </DataProvider>
    </div>
  );
}

export default App;

import './App.css';
import TransactionChart from './components/Chart/TransactionChart';
import FileUploadParser from './components/FileUpload/FileUploadParser';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
          <FileUploadParser />
          <TransactionChart />
      </DataProvider>
    </div>
  );
}

export default App;

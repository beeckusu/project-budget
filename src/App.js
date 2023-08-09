import './App.css';
import FileUploadParser from './components/FileUploadParser';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
        <header>
          <FileUploadParser />
        </header>
      </DataProvider>
    </div>
  );
}

export default App;

import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataContext } from '../contexts/DataContext';
import downloadTransactionState from '../events/PersistenceEvents';


const DownloadButton = () => {

    const { state } = useContext(DataContext);

    return (
        <Button className="circular-button" onClick={() => downloadTransactionState(state)}>
            <FontAwesomeIcon icon={faDownload} />
        </Button>
    )
}


export default DownloadButton;
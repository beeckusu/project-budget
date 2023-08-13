import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { NewFileInput } from "./FileInput";
import ColumnParser from "./ColumnParser";
import { DataContext, ACTION_SET_TRANSACTIONS, ACTION_ADD_TRANSACTIONS } from "../../contexts/DataContext";
import { TransactionParsingProvider, TransactionParsingContext } from "../../contexts/TransactionParsingContext";
import { normalizeTransactions, parseCSV, rowToTransaction } from "../../events/ParsingEvents";


const ConfirmationModal = ({ show, onHide, onConfirm, modalHeader, modalMessage, modalTheme, confirmLabel }) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{modalHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant={modalTheme} onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    )

}


const ParseButton = ({ children, file, eventType, variant, confirmHeader, confirmMessage, confirmLabel }) => {

    const { dispatch } = useContext(DataContext);
    const { state } = useContext(TransactionParsingContext);
    const { dateCol, descriptionCol, expenseCol, depositCol } = state;

    const [show, setShow] = useState(false);


    const handleOnParseClick = () => {

        const transactionFieldToColumn = {
            'date': dateCol,
            'description': descriptionCol,
            'expense': expenseCol,
            'deposit': depositCol
        }

        parseCSV(file.target.files[0], rowToTransaction, transactionFieldToColumn).then(result => {

            const transactionDescriptions = normalizeTransactions(result);

            const fileDetails = {
                transactions: result,
                transactionDescriptions: transactionDescriptions,
            }

            dispatch({
                type: eventType,
                payload: fileDetails,
            });

        });
    }

    return (<>
        <Button variant={variant} onClick={() => setShow(true)}>{children}</Button>
        <ConfirmationModal
            show={show}
            onHide={() => setShow(false)}
            onConfirm={() => {setShow(false); handleOnParseClick()}} 
            modalHeader={confirmHeader}
            modalMessage={confirmMessage}
            modalTheme={variant}
            confirmLabel={confirmLabel} />

    </>);
}


const FileUploadParser = () => {

    const [file, setFile] = useState('');

    return (
        <TransactionParsingProvider>
            <h1>File Upload Parser</h1>
            <NewFileInput onChange={setFile} />
            <ColumnParser />
            <ParseButton file={file} 
            eventType={ACTION_SET_TRANSACTIONS} 
            confirmHeader="Starting New Chart"
            confirmMessage="Are you sure you want start over with new data?"
            confirmLabel="Start Over"
            variant="warning">New</ParseButton>
            <ParseButton file={file} 
            eventType={ACTION_ADD_TRANSACTIONS} 
            confirmHeader="Adding Transactions"
            confirmMessage="Are you sure you want to add new data?"
            confirmLabel="Add"
            variant="primary">Add</ParseButton>
        </TransactionParsingProvider>
    )
}

export default FileUploadParser;
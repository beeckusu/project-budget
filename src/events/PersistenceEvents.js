const downloadTransactionState = (state) => {

    const json = JSON.stringify(state);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'transactions.json';
    anchor.click();

    URL.revokeObjectURL(url);
};


export default downloadTransactionState;

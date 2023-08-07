class Transaction {
    constructor(id, description, amount, date, transactionType){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.transactionType = transactionType;
    };
}

export default Transaction;
class Transaction {

    constructor(id, description, amount, date, transactionType, isActive=true){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.transactionType = transactionType;
        this.isActive = isActive;
    };

    setTag(tag){
        this.tag = tag;
    }

    isVisible() {
        return this.isActive && (this.description == null || this.description.isVisible());
    }
}

export default Transaction;
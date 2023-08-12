class TransactionDescription {
    constructor(id, description){
        this.id = id;
        this.name = description;
        this.isActive = true;
    }

    isVisible() {
        return this.isActive && (this.tag == null || this.tag.isActive);
    }
}

export default TransactionDescription;
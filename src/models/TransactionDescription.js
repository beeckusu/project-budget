class TransactionDescription {
    constructor(id, description, tag=null, isActive=true){
        this.id = id;
        this.name = description;
        this.tag = tag;
        this.isActive = isActive;
    }

    isVisible() {
        return this.isActive && (this.tag == null || this.tag.isActive);
    }
}

export default TransactionDescription;
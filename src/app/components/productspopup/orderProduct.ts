export class OrderProduct{
    constructor(
        public code:string,
        public name:string,
        public quantity: number,
        public price:number,
        public points:number
    ){
        this.code=code;
        this.quantity=quantity;
        this.name=name;
        this.price=price
    }
}
export class Product{
    constructor(
        public name: string,
        public code: string,
        public description: string,
        public image: string,
        public points: number,
        public price: number,
        public type: string
    ){
        this.name=name,
        this.code=code,
        this.description=description,
        this.image=image,
        this.points=points,
        this.price=price,
        this.type=type
    }

    
}
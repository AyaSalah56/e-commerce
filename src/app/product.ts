export interface product {
    title: string
    price: number
    imageCover: string
    _id:string
    category: Category
    ratingsAverage: number
    description:string
  }
  export interface Category {
    _id: string
    name: string
    slug: string
    image: string
  }
  
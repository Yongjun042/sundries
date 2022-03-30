import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import GET_CART, {ADD_CART} from "../graphql/cart";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";

const mockProducts =(()=> Array.from({ length: 20 }).map((_, i) => ({
  id: i+1+"",
  imageUrl: `https://placeimg.com/640/480/${i + 1}`,
  price: 5000,
  title: `임시상품${i + 1}`,
  description: `임시상세내용${i + 1}`,
  createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
}))
)()

const cartData =(()=>[])()

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    )
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find(item =>item.id === req.variables.id)
    if(found){
      return res(ctx.data(found))
    }
    return res()
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res()
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    
    return res(ctx.data({}));
  }),
];

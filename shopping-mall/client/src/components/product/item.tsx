import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADD_CART } from "../../graphql/cart";
import { Product } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { cartItemSelector } from "../../recoils/cart";

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: Product) => {
  const {mutate: addCart} = useMutation((id:string)=>graphqlFetcher(ADD_CART,{id}))
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <p className="product-item__description">{description}</p>
        <img className="product-item__image" src={imageUrl} />
        <span className="product-item__price">{price}</span>
      </Link>
      <button className="product-item__add-cart" onClick ={()=>addCart(id)}>장바구니 담기</button>
    </li>
  );
};

export default ProductItem;

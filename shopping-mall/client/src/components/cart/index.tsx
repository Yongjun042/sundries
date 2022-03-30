import { CartType } from "../../graphql/cart";
import CartItem from "./item";

const CartList = ({ items }: { items: CartType[] }) => {
  console.log(items)
    return (
    <ul>
      {items.map((item) => (
        <CartItem {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default CartList
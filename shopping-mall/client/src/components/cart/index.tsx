import { SyntheticEvent, useRef } from "react";
import { CartType } from "../../graphql/cart";
import CartItem from "./item";

const CartList = ({ items }: { items: CartType[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) {
      return;
    }
    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
      ".cart-item__checkbox"
    );
    const tragetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    console.log(tragetInput);

    if (tragetInput.classList.contains("select-all")) {
      const allChecked = tragetInput.checked;
      console.log(checkboxes);
      checkboxes.forEach((inputELem) => {
        if (allChecked) inputELem.checked = true;
        else inputELem.checked = false;
      });
    } else {
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
        allChecked;
    }
  };
  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className="select-all" type="checkbox" />
          전체선택
        </label>
        <ul className="cart">
          {items.map((item) => (
            <CartItem {...item} key={item.id} />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default CartList;

import { OrderItem } from "models/order";
import CartItem from "./components/CartItem/CartItem";

const Cart = (): JSX.Element => {
  const temp: OrderItem[] = [
    {
      product: {
        id: '1',
        name: 'abc'
      },
    },
    {
      product: {
        id: '2',
        name: 'def'
      }
    }
  ]
  return <>{temp.map(item => <CartItem data={item} />)}</>
  
}

export default Cart;
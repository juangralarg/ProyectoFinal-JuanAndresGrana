import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './CartWidget.css'

const CartWidget = () => {
  const { getTotalQuantity } = useCart()
  const totalQuantity = getTotalQuantity()

  return (
    <Link to="/cart" className="cart-widget">
      <img 
        src="https://api.iconify.design/mdi/cart-outline.svg?color=white&width=24"
        alt="MiCarrito"
      />
      {totalQuantity > 0 && (
        <span className="cart-badge">{totalQuantity}</span>
      )}
    </Link>
  )
}

export default CartWidget
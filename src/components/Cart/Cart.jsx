import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cart, removeItem, clear, getTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra</p>
          <Link to="/" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">
                Precio unitario: ${item.price.toFixed(2)}
              </p>
              <p className="cart-item-quantity">
                Cantidad: {item.quantity}
              </p>
              <p className="cart-item-subtotal">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button 
              className="cart-item-remove"
              onClick={() => removeItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${getTotal().toFixed(2)}</h3>
        </div>
        
        <div className="cart-actions">
          <button className="btn btn-danger" onClick={clear}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="btn btn-success">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
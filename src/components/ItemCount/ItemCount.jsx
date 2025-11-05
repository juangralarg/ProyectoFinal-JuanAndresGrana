import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial)

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button 
          className="item-count-btn" 
          onClick={decrement}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="item-count-number">{quantity}</span>
        <button 
          className="item-count-btn" 
          onClick={increment}
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>
      <button 
        className="item-count-add" 
        onClick={() => onAdd(quantity)}
        disabled={stock === 0}
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  )
}

export default ItemCount
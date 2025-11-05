import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0)
  const { addItem } = useCart()

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity)
    addItem(product, quantity)
  }

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={product.img} alt={product.name} />
      </div>
      
      <div className="item-detail-info">
        <h2>{product.name}</h2>
        <p className="item-detail-price">${product.price.toFixed(2)}</p>
        <p className="item-detail-description">{product.description}</p>
        <p className="item-detail-category">
          <strong>Categoría:</strong> {product.category}
        </p>
        <p className="item-detail-stock">
          <strong>Stock disponible:</strong> {product.stock} unidades
        </p>

        <div className="item-detail-actions">
          {quantityAdded > 0 ? (
            <div className="item-detail-checkout">
              <p className="success-message">
                ✓ Producto agregado al carrito ({quantityAdded} unidad{quantityAdded > 1 ? 'es' : ''})
              </p>
              <div className="checkout-buttons">
                <Link to="/cart" className="btn btn-primary">
                  Ir al carrito
                </Link>
                <Link to="/" className="btn btn-secondary">
                  Seguir comprando
                </Link>
              </div>
            </div>
          ) : (
            <ItemCount 
              stock={product.stock} 
              initial={1} 
              onAdd={handleOnAdd} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <img src={product.img} alt={product.name} className="item-img" />
      <div className="item-content">
        <h3 className="item-title">{product.name}</h3>
        <p className="item-price">${product.price.toFixed(2)}</p>
        <p className="item-stock">Stock: {product.stock} unidades</p>
        <Link to={`/item/${product.id}`} className="item-button">
          Ver detalle
        </Link>
      </div>
    </div>
  )
}

export default Item
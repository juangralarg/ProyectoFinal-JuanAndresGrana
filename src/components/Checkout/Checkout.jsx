import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { createOrder } from '../../data/FirestoreService'
import './Checkout.css'

const Checkout = () => {
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  
  const { cart, getTotal, clear } = useCart()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Crear objeto de orden
      const order = {
        buyer: formData,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotal()
      }
      
      // Guardar orden en Firebase
      const newOrderId = await createOrder(order)
      
      // Mostrar éxito
      setOrderId(newOrderId)
      setOrderSuccess(true)
      clear()
    } catch (err) {
      console.error('Error al crear la orden:', err)
      setError('Hubo un error al procesar tu compra. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>No hay productos en el carrito</h2>
          <Link to="/" className="btn btn-primary">
            Ir a comprar
          </Link>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h2>¡Compra realizada con éxito!</h2>
          <p className="order-id">
            Tu número de orden es: <strong>{orderId}</strong>
          </p>
          <p>Recibirás un correo con los detalles de tu compra.</p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#fed7d7', 
          color: '#c53030', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h3>Datos de contacto</h3>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Dirección *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-success btn-block"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar compra'}
            </button>
          </form>
        </div>
        
        <div className="checkout-summary-section">
          <h3>Resumen de compra</h3>
          <div className="checkout-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
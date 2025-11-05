import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../data/FirestoreService'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    const fetchProduct = async () => {
      try {
        const data = await getProductById(itemId)
        setProduct(data)
      } catch (err) {
        console.error('Error al cargar el producto:', err)
        setError('Error al cargar el producto. Por favor, intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [itemId])

  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="item-detail-container">
        <div className="loading">
          <p style={{ color: '#f56565' }}>{error}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="item-detail-container">
        <div className="loading">
          <p>Producto no encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  )
}

export default ItemDetailContainer
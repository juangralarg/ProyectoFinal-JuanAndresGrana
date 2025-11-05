import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../data/FirestoreService'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    const fetchProducts = async () => {
      try {
        const data = categoryId 
          ? await getProductsByCategory(categoryId)
          : await getProducts()
        
        setProducts(data)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        setError('Error al cargar los productos. Por favor, intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return (
      <div className="item-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="item-list-container">
        <div className="loading">
          <p style={{ color: '#f56565' }}>{error}</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="item-list-container">
        <div className="loading">
          <p>No se encontraron productos en esta categoría.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="item-list-container">
      <h2>
        {categoryId 
          ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
          : 'Todos los productos'
        }
      </h2>
      <ItemList products={products} />
    </div>
  )
}

export default ItemListContainer
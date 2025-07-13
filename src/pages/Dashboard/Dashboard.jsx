import { useState } from 'react';
import { products1 } from '../../assets/Products/products';
import { FaThLarge, FaBars } from 'react-icons/fa';
import './Dashboard.css';
import Navbar from '../../components/Navbar/Navbar'
import { useCart } from '../../Context/CartContext';

const Dashboard = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = (p) => {
    addToCart(p);
    alert('Added to cart');
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const displayedProducts = searchQuery
    ? products1.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : products1;


  return (
    <div className="d-container">
      <Navbar onSearch={handleSearch}/>
      <div className="d-header">
        <h1 className="d-heading">All Products</h1>
        <div className="view-toggle">
          <button onClick={() => setIsGridView(true)} className={isGridView ? 'active' : ''}>
            <FaThLarge />
          </button>
          <button onClick={() => setIsGridView(false)} className={!isGridView ? 'active' : ''}>
            <FaBars />
          </button>
        </div>
      </div>

      <div className={isGridView ? 'products-grid' : 'products-list'}>
        {displayedProducts.length > 0 ? (
          displayedProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <div className="p-desc">
                <h3>{p.name}</h3>
                <p className="price">₹{p.price}</p>
              </div>
              <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;

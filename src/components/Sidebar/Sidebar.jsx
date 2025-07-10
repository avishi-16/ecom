import './Sidebar.css';
import logo from '../../assets/ecom-logo.png';

const Sidebar = () => {
    return(
         <div className='sidebar'>
      <div className='s-header'>
        <img className='s-logo' src={logo} />
        <h2>ShopNShine</h2>
      </div>
      <div className='s-options'>
        <a href='/products' className='s-link'><span className='highlight'>Products</span></a>
        <a href='/cart' className='s-link'><span className='highlight'>Cart</span></a>
        <a href='/account' className='s-link'><span className='highlight'>Profile</span></a>
        <a style={{ cursor: 'pointer' }} className='s-link'><span className='highlight'>Logout</span></a>
      </div>
    </div>
    )
}

export default Sidebar
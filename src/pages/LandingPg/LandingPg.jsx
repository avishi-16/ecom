import './LandingPg.css';
import logo from "../../assets/ecom-logo.png";
import heroBg from "../../assets/ecom-bg.jpg";
import products from "../../assets/Products/products";
import Animation1 from "../../animations/about.json"
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom';

const LandingPg = () => {

    const navigate = useNavigate();

    const scrollToTrending = () =>
        document
            .getElementById("trending")
            .scrollIntoView({ behavior: "smooth" });

    const scrollToAbout = () =>
        document
            .getElementById("about")
            .scrollIntoView({ behavior: "smooth" });


    return (
        <div className='landing'>
            <section className='hero'>
                <img src={heroBg} className="hero-bg" />

                <div className='hero-head'>
                    <img src={logo} className='logo' />
                    <h1 className='app-name'>ShopNShine</h1>
                </div>

                <div className='hero-content'>
                    <h2 className='hero-text'>Shine in your own style<br />Discover fashion made for you<br />
                        Your fashion. Your shine. Delivered.</h2>
                    <button className="abt-btn" onClick={scrollToAbout}>
                        About Us
                    </button>
                </div>
            </section>

            <section id='about' className='about'>
                <h1 className='about-head'>About Us</h1>
                <div style={{
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    <Lottie animationData={Animation1} loop={true} />
                </div>
                <h2>ShopNShine is your go-to destination for stylish, high-quality
                    products - all in one place. We bring together a wide range of fashion essentials
                    for women including clothing, watches, sunglasses, accessories, and more.
                    Our platform connects you with the latest trends and great
                    deals - so you can shop confidently and effortlessly. Whether you're looking
                    for everyday wear or something special, we've got you covered.</h2>
                   <button className="trending-btn" onClick={scrollToTrending}>
                        Browse Trending Collection
                    </button>
            </section>

            <section id="trending" className="trending">
                <h2>Trending Products</h2>
                <div className='trending-prod'>
                    {products.map((p) => (
                        <div className="prod-card" key={p.id}>
                            <img src={p.image} alt={p.name} />
                            <h3>{p.name}</h3>
                            <p className="price">₹{p.price}</p>
                        </div>
                    ))}
                </div>
            <div className='reg'>
                <h3>Register to Explore More & Shop</h3>
                <button className="reg-btn" onClick={() => navigate('/register')}>
                    Sign Up
                </button>
            </div>
            </section>

        </div>
    )
}

export default LandingPg;

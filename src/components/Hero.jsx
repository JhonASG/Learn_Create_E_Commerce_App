import './css/Hero.css';

function Hero() {
    return (
        <section className='hero'>
            <div className="hero-content">
                <h1>Arte en cada <span>detalle</span></h1>
                <p>Cerámicas artesanales hechas a mano para darle vida y elegancia a tus espacios.</p>
                <button className="cta-button">Ver Colección</button>
            </div>
        </section>
    );
}

export default Hero;
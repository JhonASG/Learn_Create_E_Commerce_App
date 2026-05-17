import { useState } from "react";
import "./css/CheckoutModal.css";

function CheckoutModal({ total, closeModal, clearCart }) {
    // Estado para saber si la compra se completo
    const [isSuccess, setIsSuccess] = useState(false);

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue.

        // Aquí es donde en una app real llamaríamos a Stripe o PayPal
        // Por ahora, simulamos éxito directo:
        setIsSuccess(true);
        clearCart();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Si la compra fue un exito mostramos un mensaje. */}
                {isSuccess ? (
                    <div className="success-message">
                        <h2>¡Gracias por tu compra! 🎉</h2>
                        <p>Tu pedido está siendo procesado. Te enviaremos un correo con los detalles.</p>
                        <button className="close-btn-large" onClick={closeModal}>Volver a la tienda</button>
                    </div>
                ) : (
                    /* Si no, mostramos el formulario de pago. */
                    <>
                        <div className="modal-header">
                            <h2>Finalizar Compra</h2>
                            <button className="close-btn" onClick={closeModal}>✖</button>
                        </div>

                        <p className="modal-total">Total a pagar: <span>${total.toFixed(2)}</span></p>

                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input type="text" required placeholder="Ej. Juan Perez" />
                            </div>
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email" required placeholder="ejemplo@correo.com" />
                            </div>
                            <div className="form-group">
                                <label>Dirección de Envío</label>
                                <input type="text" required placeholder="Calle Principal 123" />
                            </div>
                            <button type="submit" className="pay-btn">Pagar</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default CheckoutModal;
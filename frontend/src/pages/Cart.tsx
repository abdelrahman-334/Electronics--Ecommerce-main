import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import axios from "axios";
import Alert from "../components/Alert";

export default function Cart() {
  let totalAmount = 0;
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, setShowLoginAlert, showLoginAlert } = useContext(AuthContext);

  const handlePayment = async () => {
    const cartItems = cart.map((product) => {
      totalAmount += product.price * product.quantity;
      console.log("total amount is: ", totalAmount)
      return {
        name: product.name,
        amount: product.price,
        quantity: product.quantity,
        description: product.description
      };
    });

    const response = await axios.post("http://localhost:3000/api-gateway/payments/pay", {
      items: cartItems,
      total: totalAmount,
    });
    const toRoute = response.data.client_secret;
    clearCart();
    // alert("Payement Successfull!")
    setShowLoginAlert(true);
      setTimeout(() => {
        setShowLoginAlert(false);
        window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_jVNAQbLbeiXrC4uV4LUCQWhhL7da2WtZ&clientSecret=${toRoute}`;
      }, 2000);
  };

  return (
    <div className="p-8">
      {showLoginAlert && <Alert message="Payement Successful!" />}

      <Carousel />

      {cart.length > 0 ? (
        <>
          <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-center mb-4">
                <ProductCard
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  showRemoveButton={true}
                  onRemove={() => removeFromCart(item.id)}
                  showQuantityControls={true}
                  quantity={item.quantity}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button
              className="btn btn-lg bg-violet-700"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

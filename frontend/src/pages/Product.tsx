import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import LoaderSpinner from "../components/LoaderSpinner";
import Alert from "../components/Alert";
import Stats from "../components/Stats";
import axios from "axios";

export default function Product() {
  const productId = location.pathname.split("/").pop();
  const { token, showLoginAlert, setShowLoginAlert, addToCart } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api-gateway/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!token) {
      // would be redirected to unauthorized page
      navigate('/cart');
    } else {
      const productToAdd = {
        id: productId || "",
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        description: product.description
      };
      addToCart(productToAdd || "");
      setShowLoginAlert(true);
      setAlertMessage("Added To Cart Successfully!");
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 2000);
    }
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      {showLoginAlert && <Alert message={alertMessage} />}

      <div className="hero bg-base-200 min-h-screen p-8">
        <div className="hero-content flex lg:flex-row justify-between gap-12">
          <div className="flex flex-col lg:flex-row gap-8 flex-1 rounded-lg shadow-lg p-8">
            <div className="flex-1">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                className="w-full h-auto rounded-lg shadow-md mt-12"
                alt={product.name}
              />
            </div>
            <div className="flex-1">
              <div className="p-6 rounded-lg">
                <h1 className="text-6xl font-bold mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                <p className="text-3xl font-bold mb-6">${product.price}</p>
                <div className="flex items-center mt-4">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="input input-bordered w-24 mr-4"
                  />
                  <button className="btn btn-wide bg-violet-700 text-lg" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="rounded-lg shadow-lg p-8 h-full">
              <Stats />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
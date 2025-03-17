import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  showRemoveButton: boolean;
  showQuantityControls?: boolean;
  onRemove: () => void;
}

export default function ProductCard({
  id,
  image,
  name,
  price,
  description,
  quantity,
  showRemoveButton,
  onRemove,
  showQuantityControls = false,
}: ProductCardProps) {
  const { addToCart, decreaseQuantity } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="card shadow-lg p-4 rounded-lg w-full">
      <img src={`data:image/jpeg;base64,${image}`} alt={name} className="rounded-lg" />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-lg font-semibold mt-2">${price.toFixed(2)}</p>
      <p className="text-sm text-gray-700 mt-1">Quantity: {quantity}</p>

      {showQuantityControls && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="btn btn-primary bg-gray-200 text-gray-700"
            onClick={() => decreaseQuantity(id)}
          >
            -
          </button>
          <button
            className="btn btn-primary bg-gray-200 text-gray-700"
            onClick={() => addToCart({ id, name, price, quantity: 1, image, description })}
          >
            +
          </button>
        </div>
      )}

      {!showRemoveButton && (
        <button className="btn btn-wide bg-violet-900 text-white mt-4 flex self-center" onClick={handleBuyNow}>
          Buy Now
        </button>
      )}

      {showRemoveButton && (
        <button className="btn btn-sm bg-red-500 text-white mt-4" onClick={onRemove}>
          Remove
        </button>
      )}
    </div>
  );
}
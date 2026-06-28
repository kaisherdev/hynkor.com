import { useState } from "preact/hooks";
import { addCartItem } from "../store/cart-store";

function AddToCartButton({ product }) {
	const [isAdded, setIsAdded] = useState(false);
	const handleAddToCart = () => {
		const success = addCartItem(product);
		if (success) {
			isAdded(true);
			setTimeout(() => setIsAdded(false), 2000);
		}
	};

	return (
		<button
			class={`w-full font-bold py-2 px-4 rounded-lg transition-colors ${isAdded ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
			onClick={handleAddToCart}
		>
			{isAdded ? "✓ Agregado" : "Añadir al carrito"}
		</button>
	);
}

export { AddToCartButton };

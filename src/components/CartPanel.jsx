import { useStore } from "@nanostores/preact";
import { cartItems, cartOpen } from "../store/cart-store";
import { CartList } from "./CartList";

function CartPanel() {
	const $cartOpen = useStore(cartOpen);
	const $cartItems = useStore(cartItems);

	const closeCart = () => {
		cartOpen.set(false);
	};

	if (!$cartOpen) return null;

	return (
		<>
			<div
				class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
				onClick={closeCart}
			/>
			<div class="fixed flex flex-col top-0 right-0 max-w-md w-full h-full bg-white shadow-2xl z-50 overflow-hidden">
				<div class="flex justify-between items-center p-6 border-b">
					<h2 class="font-bold text-2xl">Tu carrito</h2>
					<button
						onClick={closeCart}
						class="text-2xl font-bold text-gray-400 hover:text-gray-600 transition"
					>
						✕
					</button>
				</div>
				<div class="flex-1 overflow-y-auto">
					{Object.keys($cartItems).length === 0 ? (
						<div class="flex flex-col justify-center items-center h-full p-6">
							<p class="text-gray-500 text-center">El carrito está vacío</p>
						</div>
					) : (
						<div class="p-6">
							<CartList />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
export { CartPanel };

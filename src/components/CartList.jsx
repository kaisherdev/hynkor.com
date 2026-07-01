import { useStore } from "@nanostores/preact";
import {
	cartItems,
	cartOpen,
	cartTotal,
	clearCart,
	removeCartItem,
	updateCartItemQuantity,
} from "../store/cart-store";

function CartList() {
	const $cartItems = useStore(cartItems);
	const $total = useStore(cartTotal);
	const items = Object.values($cartItems);

	const enviarWhatsApp = () => {
		let mensaje = "¡Hola! Me gustaría pedir los siguientes productos:\n\n";
		const telefono = import.meta.env.PUBLIC_WHATSAPP_PHONE;
		items.forEach((item) => {
			const name = item.name ?? "Product";
			const price = item.price ?? 0;
			mensaje += `• ${name} (x${item.quantity}) - S/ ${price * item.quantity}\n`;
		});
		mensaje += `\n*Total: S/ ${$total.toFixed(2)}*`;

		const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
		window.open(url, "_blank");

		clearCart();
		cartOpen.set(false);
	};

	if (items.length === 0)
		return <p class="text-center py-10">Tu carrito está vacío.</p>;

	return (
		<div className="bg-white p-6 rounded-xl shadow-lg">
			{items.map((item) => {
				const name = item.name ?? "product";
				const price = item.price ?? 0;
				return (
					<div
						key={item.id}
						class="flex justify-between items-center border-b py-4"
					>
						<div class="flex-1">
							<h4 class="font-semibold">{name}</h4>
							<p class="text-sm text-gray-500 pb-2">
								Precio Unit.: S/ {item.price.toFixed(2)}
							</p>

							<div class="flex justify-between items-center gap-3">
								<div class="flex gap-2">
									<button
										onClick={() =>
											updateCartItemQuantity(item.id, item.quantity - 1)
										}
										class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
									>
										−
									</button>
									<span class="px-2 min-w-8 text-center">{item.quantity}</span>
									<button
										onClick={() =>
											updateCartItemQuantity(item.id, item.quantity + 1)
										}
										class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
									>
										+
									</button>
								</div>
								<span class="font-semibold min-w-20 text-right">
									S/ {(price * item.quantity).toFixed(2)}
								</span>
								<button
									onClick={() => removeCartItem(item.id)}
									class="ml-2 text-red-500 hover:text-red-700 font-bold"
								>
									✕
								</button>
							</div>
						</div>
					</div>
				);
			})}

			<div class="flex justify-between items-center text-xl font-bold mt-6">
				<span>Total:</span>
				<span class="text-blue-600">S/{$total.toFixed(2)}</span>
			</div>
			<button
				onClick={enviarWhatsApp}
				class="w-full bg-green-500 rounded-lg mt-6 px-6 py-3 hover:bg-green-600 text-white font-bold transition-colors flex justify-center items-center gap-2 "
			>
				<span>Finalizar pedido por WhatsApp</span>
			</button>
		</div>
	);
}
export { CartList };

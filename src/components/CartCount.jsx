import { useStore } from "@nanostores/preact";
import { cartCount, cartOpen } from "../store/cart-store";

function CartCount() {
	const $count = useStore(cartCount);

	const openCart = () => {
		cartOpen.set(true);
	};
	return (
		<button
			onClick={openCart}
			class="relative cursor-pointer hover:opacity-80 transition-opacity"
		>
			<span className="bg-slate-200 rounded-full p-1 text-lg">🛒</span>
			{$count > 0 && (
				<span className="absolute flex justify-center items-center w-4 h-4 bg-red-500 text-xs font-semibold rounded-full -top-2 -right-2">
					{$count}
				</span>
			)}
		</button>
	);
}

export { CartCount };

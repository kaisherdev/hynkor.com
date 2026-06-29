import { cartCount, cartOpen } from "../store/cart-store";
import { useStore } from "@nanostores/preact";

function CartCount() {
	const $count = useStore(cartCount);

	const openCart = () => {
		cartOpen.set(true);
	};
	return (
		<button
			className="relative cursor-pointer hover:opacity-80 transition-opacity"
			onClick={openCart}
		>
			<span className="bg-slate-200 rounded-full p-1 text-2xl">🛒</span>
			{$count > 0 && (
				<span className="absolute flex justify-center items-center w-5 h-5 bg-red-500 text-xs font-semibold rounded-full -top-2 -right-2">
					{$count}
				</span>
			)}
		</button>
	);
}

export { CartCount };

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
			<span className="rounded-full p-1 text-lg bg-slate-50 border border-slate-300">
				🛒
			</span>
			{$count > 0 && (
				<span className="absolute flex justify-center items-center w-5 h-5 bg-red-500 text-xs font-semibold rounded-full -top-2 -right-2">
					{$count}
				</span>
			)}
		</button>
	);
}

export { CartCount };

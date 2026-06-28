import { map, atom, computed } from 'nanostores'

export const cartItems = map({});
export const cartOpen = atom(false);

export const cartTotal = computed(cartItems, (items) => {
	return Object.values(items).reduce(
		(total, item) => total + (item.price ?? 0) * item.quantity,
		0,
	);
});

export const cartCount = computed(cartItems, (items) => {
	return Object.values(items).reduce(
		(total, item) => total + item.quantity,
		0,
	);
});

export function addCartItem(id, name, price, image_url) {
	if (!id || !name || price === undefined || price < 0) {
		console.warn("Producto inválido. No se puede agregar al carrito.", { id, name, price });
		return false;
	}
	const existingItem = cartItems.get()[id];
	if (existingItem) {
		cartItems.setKey(id, { ...existingItem, quantity: existingItem.quantity + 1 })
	}
	else {
		cartItems.setKey(id, { id, name, price, image_url, quantity: 1 });
	}
	return true;
}

export function updateCartItemQuantity(id, quantity) {
	if (quantity <= 0) {
		removeCartItem(id);
	} else {
		const item = cartItems.get()[id];
		if (item) {
			cartItems.setKey(id, { ...item, quantity });
		}
	}
}

export function removeCartItem(id) {
	const current = cartItems.get();
	const updated = { ...current };
	delete updated[id];
	cartItems.set(updated);
}

export function clearCart() {
	cartItems.set({});
}

export function persistCart() {
	const storedCart = localStorage.getItem('cart');
	if (storedCart) {
		try {
			const parsedCart = JSON.parse(storedCart);
			if (typeof parsedCart === 'object' && parsedCart !== null) {
				cartItems.set(parsedCart);
			}
		} catch (error) {
			console.error("Error al parsear el carrito almacenado:", error);
		}
	}

	cartItems.subscribe((value) => {
		localStorage.setItem('cart', JSON.stringify(value));
	});
}
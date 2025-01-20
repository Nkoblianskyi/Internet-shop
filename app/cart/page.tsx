'use client';

import { RelatedProduct } from "@/components/shared/related-product";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, clearCart } from '@/store/slices/cart-slice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div>
        <h1>Your Cart</h1>
        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.items.map((product) => (
              <div key={product.id}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <Button onClick={() => handleRemove(Number(product.id))}>Remove</Button>
              </div>
            ))}
          </div>
        )}
        <div>
          <p>Total: ${cart.totalPrice}</p>
          <Button onClick={handleClearCart}>Clear Cart</Button>
        </div>
      </div>
        <div className="related-products-list">
          <RelatedProduct count={5} />
        </div>
    </>
  );
};

export default Cart;

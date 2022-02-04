import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";
function Cart() {
    const { cart, removeFromCart, completeOrder, updateCart } = useContext(GlobalContext);

    const navigate = useNavigate();
    const onMutate = (product, value) => {
        const updatedCartObject = { ...product };
        if (product.type === "subscription") updatedCartObject.months = value;
        else if (product.type === "delivery") updatedCartObject.address = value;
        updateCart(updatedCartObject);
    };
    return (
        <div className="flex flex-col gap-2 px-8 py-4 ">
            <h2 className="font-semibold text-xl">Cart Products</h2>
            {cart.map((product) => {
                return <Product key={product._id} product={product} removeFromCart={removeFromCart} onMutate={onMutate} />;
            })}
            {cart.length > 0 ? (
                <button
                    className="bg-cyan-900 mt-4 py-2 text-sm font-semibold text-white rounded-md"
                    onClick={() => {
                        completeOrder();
                        navigate("/orders");
                    }}
                >
                    Buy
                </button>
            ) : (
                <h2 className="font-semibold text-lg">No Products in Cart</h2>
            )}
        </div>
    );
}

export default Cart;

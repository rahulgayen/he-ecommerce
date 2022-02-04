import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import Product from "../components/Product";
function Explore() {
    const { products, getProducts, addToCart } = useContext(GlobalContext);
    useEffect(() => {
        getProducts();
    }, [getProducts])
    return (
        <div className="flex flex-col gap-2 px-8 py-4">
            <h2 className="font-semibold text-xl">Explore Products</h2>
            {products.map((product) => {
                return <Product key={product._id} product={product} addToCart={addToCart} />
            })}
        </div>
    );
}

export default Explore;

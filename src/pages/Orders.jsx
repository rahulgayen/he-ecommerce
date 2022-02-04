import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Product from "../components/Product";

function Orders() {
    const { pastOrders } = useContext(GlobalContext);
    return (
        <div className="flex flex-col gap-2 px-8 py-4">
            <h2 className="font-semibold text-xl">Past Orders</h2>
            {pastOrders.length > 0 ? (
                pastOrders.map((product, index) => {
                    return <Product key={product._id + index} product={product} />;
                })
            ) : (
                <h2 className="font-semibold text-lg">No Products in Past Orders</h2>
            )}
        </div>
    );
}

export default Orders;

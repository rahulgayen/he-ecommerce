import { useLocation } from "react-router-dom";
function Product({ product, addToCart, editProduct, editProductItem, removeFromCart, onMutate }) {
    const location = useLocation();

    return (
        <div className="grid grid-cols-product bg-gray-300 bg-opacity-30 rounded-lg overflow-hidden">
            <img src={product.imageLink} alt={product.name} className="h-36 w-36 object-fit" />
            <div className=" pt-2">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <span className="text-sm font-semibold">Product Type:</span> <span className="text-sm font-semibold">{product.type}</span>
                <br />
                <span className="text-sm font-semibold">Price:</span>{" "}
                <span className="text-sm font-semibold">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: product.properties.currency }).format(product.price)}{" "}
                    {product.type === "subscription" ? <span>/Month</span> : null}
                </span>
                <br />
                <div className="flex  gap-2 mt-2 ">
                    {addToCart && (
                        <button
                            className="bg-cyan-900 w-32 px-2 py-1 text-sm font-semibold text-white rounded-md"
                            onClick={() => {
                                addToCart(product._id);
                            }}
                        >
                            Add to Cart
                        </button>
                    )}
                    {editProduct && (
                        <button
                            className="bg-cyan-900 w-32 px-2 py-1 text-sm font-semibold text-white rounded-md"
                            onClick={() => {
                                editProductItem(product._id);
                            }}
                        >
                            Edit Product
                        </button>
                    )}
                    {removeFromCart && (
                        <button
                            className="bg-red-600 w-24 px-2 py-1 text-sm font-semibold text-white rounded-md"
                            onClick={() => {
                                removeFromCart(product._id);
                            }}
                        >
                            Remove
                        </button>
                    )}
                    {removeFromCart && product.type === "subscription" ? (
                        <div>
                            <input
                                type="number"
                                className="w-36 px-2 py-1 outline-none border border-solid border-cyan-900 rounded-md"
                                onChange={(event) => {
                                    onMutate(product, event.target.value);
                                }}
                                name=""
                                id=""
                            />
                            <span> Months</span>
                        </div>
                    ) : null}
                    {removeFromCart && product.type === "delivery" ? (
                        <div>
                            <textarea
                                className="w-72 h-12 px-2 py-1 outline-none border border-solid border-cyan-900 rounded-md"
                                onChange={(event) => {
                                    onMutate(product, event.target.value);
                                }}
                                name=""
                                id=""
                                placeholder="Enter Address"
                            />
                        </div>
                    ) : null}
                    {location.pathname === "/orders" && product.type === "subscription" ? <span>Expires in {product.expiresIn}</span> : null}
                    {location.pathname === "/orders" && product.type === "delivery" ? (
                        <div>
                            <span className="bg-cyan-900 text-white font-bold text-sm p-2 rounded-md mr-2">In Transit</span>
                            <span>Address: {product.address}</span>
                        </div>
                    ) : null}
                    {location.pathname === "/orders" && product.type === "downloadable" ? (
                        <a href={product.properties.downloadLink} download={product.name}>
                            <button type="button" className="bg-cyan-900 text-white font-bold text-sm p-2 rounded-md mr-2">
                                Download
                            </button>
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Product;

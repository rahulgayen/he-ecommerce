import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import Product from "../components/Product";

function EditProducts() {
    const { products, editProduct } = useContext(GlobalContext);
    const [isEditModal, setIsEditModal] = useState(false);
    const [editProductObject, setEditProductObject] = useState({ name: "", imageLink: "", price: 0 });
    const { name, imageLink, price } = editProductObject;
    const editProductItem = (productId) => {
        setIsEditModal(true);
        setEditProductObject(() => {
            return products.filter((product) => {
                return product._id === productId;
            })[0];
        });
    };
    const onMutate = (event) => {
        setEditProductObject((prevState) => {
            return {
                ...prevState,
                [event.target.id]: event.target.value,
            };
        });
    };
    const onSubmit = () => {
        setIsEditModal(false);
        editProduct(editProductObject);
    };

    return (
        <>
            {isEditModal ? (
                <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-cyan-900 bg-opacity-40">
                    <div className="bg-white rounded-md w-1/2 md:w-1/3 lg:w-1/4  p-4">
                        <label className="text-xs">Name</label>
                        <input type="text" onChange={onMutate} value={name} id="name" className="w-full px-2 py-1 outline-none border border-solid border-cyan-900 rounded-md" />
                        <label className="text-xs mt-2">Image Link</label>
                        <textarea onChange={onMutate} value={imageLink} id="imageLink" className="w-full px-2 py-1 outline-none border border-solid border-cyan-900 rounded-md" />
                        <label className="text-xs mt-2">Price</label>
                        <input type="number" onChange={onMutate} value={price} id="price" className="w-full px-2 py-1 outline-none border border-solid border-cyan-900 rounded-md" />
                        <button className="bg-cyan-900 mt-2 px-2 py-1 w-full text-sm font-semibold text-white rounded-md" onClick={onSubmit}>
                            Edit
                        </button>
                    </div>
                </div>
            ) : null}
            <div className="flex flex-col gap-2 px-8 py-4">
                <h2 className="font-semibold text-xl">Edit Products</h2>
                {products.map((product) => {
                    return <Product key={product._id} product={product} editProduct={editProduct} editProductItem={editProductItem} />;
                })}
            </div>
        </>
    );
}
export default EditProducts;

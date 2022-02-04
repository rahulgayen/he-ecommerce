import { createContext, useState, useEffect, useCallback } from "react";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);

    useEffect(() => {
        setUser(uuidv4());
    }, []);
    const getProducts = useCallback(async () => {
        const productAPI = {
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/api/products`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const productResponse = await axios(productAPI);
            setProducts(productResponse.data);
        } catch (error) {
            alert("Error while fetching products. Please Reload the page");
        }
    }, []);
    const isExists = (prevState, productObject) => {
        const filteredList = prevState.filter((product) => {
            return productObject._id === product._id;
        });
        if (filteredList.length === 0) return false;
        return true;
    };
    const addToCart = (productId) => {
        setCart((prevState) => {
            const filteredProduct = products.filter((product) => {
                return productId === product._id;
            })[0];
            if (isExists(prevState, filteredProduct)) return [...prevState];
            return [...prevState, filteredProduct];
        });
    };
    const removeFromCart = (productId) => {
        setCart((prevState) => {
            return prevState.filter((product) => {
                return productId !== product._id;
            });
        });
    };
    const updateCart = (editCartObject) => {
        setCart((prevState) => {
            return prevState.map((product) => {
                if (product._id === editCartObject._id) {
                    return editCartObject;
                }
                return product;
            });
        });
    };
    const editProduct = async (editProductObject) => {
        setProducts((prevState) => {
            return prevState.map((product) => {
                if (product._id === editProductObject._id) {
                    return editProductObject;
                }
                return product;
            });
        });
        const productUpdateAPI = {
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}/api/products/${editProductObject._id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                name: editProductObject.name,
                imageLink: editProductObject.imageLink,
                price: parseInt(editProductObject.price),
            },
        };
        try {
            const editResponse = await axios(productUpdateAPI);
            if (editResponse) {
                getProducts();
            }
        } catch (e) {
            alert("Error while updating. Please try again");
        }
    };
    const completeOrder = () => {
        const orders = cart.map((product) => {
            if (product.months) {
                let today = new Date().toJSON();
                let todayDate = new Date(today);
                let currentMonth = parseInt(todayDate.getMonth());
                todayDate.setMonth(currentMonth + parseInt(product.months));
                let expiresIn = `${todayDate.toDateString()}`;
                return { ...product, expiresIn };
            }
            return { ...product };
        });
        setPastOrders((prevState) => {
            return [...prevState, ...orders];
        });
        setCart([]);
    };
    return (
        <GlobalContext.Provider value={{ user, products, cart, getProducts, addToCart, removeFromCart, updateCart, editProduct, completeOrder, pastOrders }}>
            {children}{" "}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;

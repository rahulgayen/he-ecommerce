import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function NavBar() {
  const { user, cart } = useContext(GlobalContext);

  return (
    <div className="sticky top-0 left-0 bg-cyan-900 flex justify-between gap-4 text-white font-semibold py-2 px-10">
      <Link to="/">Home</Link>
      <div className="flex gap-8 items-center">
        <div className="user-icon">
          <FaUser className="text-white " />
          <div className="absolute top-0 left-0 opacity-0">User</div>
          <div className="tooltip absolute top-5 -right-1/2  bg-gray-900 text-xs  text-white p-2 w-max rounded-md">
            <p className="mb-2">Hi User!</p>
            <Link to="/orders" className="text-yellow-400">
              Past Orders
            </Link>
          </div>
        </div>
        <div className="user-icon">
          <Link to="/edit-products">
            <FaEdit className="text-white " />
            <div className="tooltip absolute top-5 right-0 bg-gray-900 text-xs  text-white p-2 w-24 rounded-md">Add & Edit Products</div>
          </Link>
        </div>
        <div className="user-icon">
          <Link to="/cart">
            <FaShoppingCart className="text-white" />
            {cart.length > 0 ? <div className="absolute -top-2 -right-2 w-1.5 h-1.5 rounded-full bg-sky-200 opacity-75 animate-ping"></div> : null}
          </Link>
          <div className="tooltip absolute top-5 right-0 bg-gray-900 text-xs  text-white p-2 w-16 rounded-md">Cart</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

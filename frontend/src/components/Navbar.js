//components nay dung de chua cac thanh phan cua thanh dieu huong (navbar)
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Welcome to workout website!</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

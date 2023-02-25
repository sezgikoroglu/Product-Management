import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu/index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/features/theme/theme";

const Layout = () => {
   
const dispatch = useDispatch();
let theme=useSelector((state)=>state.theme.value);

    return (
      <div className={theme}>
        <div className="header " >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/kategoriler">Kategoriler</Link>
            </li>
            <li >
              <Link to="/urunler">Ürünler</Link>
            </li>
            {/* <li className="buttons">
              <button onClick={()=>dispatch(setTheme("dark"))}>dark mode</button>
              <button onClick={()=>dispatch(setTheme("light"))}>light mode</button>
            </li> */}
          </ul>
        </div>

        <main>
          <AsideMenu />

          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    );
}

export default Layout;




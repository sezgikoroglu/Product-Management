import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToBasket,
  setLength,
} from "../store/features/basket/basketSlice";


const Home = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const list = JSON.parse(localStorage.getItem("productList")) || [];
  const [filteredList, setFilteredList] = useState(list);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBasket, setShowBasket] = useState(false);
  const categories = JSON.parse(localStorage.getItem("catList")) || [];

    useEffect(() => {
      let __basket = JSON.parse(localStorage.getItem("basket")) || [];
      dispatch(addItemToBasket(__basket));

  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const changeAmount=(item,val,index)=>{

    let _updatedProduct = { ...item };
    _updatedProduct.amount = _updatedProduct.amount + val;
    _updatedProduct.amount === 0 ? _updatedProduct.amount=1 : _updatedProduct.amount=_updatedProduct.amount
    let _items = [...basket.items];
    _items[index] = _updatedProduct;

    dispatch(addItemToBasket(_items));
    localStorage.setItem("basket", JSON.stringify(_items));
 }

  useEffect(() => {
    selectedCategory == "all"
      ? setFilteredList(list)
      : setFilteredList(
          list.filter((item) => item.category == selectedCategory)
        );
  }, [selectedCategory]);

  return (
    <>
      <div className="home-header">
        <h2>Ürünler</h2>
        <select
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">Tüm Ürünler</option>
          {categories.map((ctg) => (
            <option key={ctg.name} value={ctg.name}>
              {ctg.name}
            </option>
          ))}
        </select>
        <div className="basket" onClick={() => setShowBasket(true)}>
          <img
            src="https://i.pinimg.com/originals/cb/c5/24/cbc52492c8a9b9e707e0bb67b6363dda.jpg"
            alt=""
          />
          <div className="counter">{basket.items.length}</div>
        </div>
      </div>
      <div className="c-wrapper">
        {filteredList.map((item, index) => (
          <div className="product-container" key={item.id}>
            <img src={item.imgs} alt="" />
            <p className="name-product">{item.name}</p>
            <p className="price">{item.price}$</p>
            <p>{item.category}</p>

            {!basket.items.some((x) => x.id === item.id) && (
              <button
                onClick={() => {
                  const newBasket = [{ ...item, amount: 1 }, ...basket.items];

                  dispatch(addItemToBasket(newBasket));
                  dispatch(setLength(newBasket.length));
                  localStorage.setItem("basket", JSON.stringify(newBasket));
                }}
              >
                Sepete ekle
              </button>
            )}
          </div>
        ))}
      </div>
      {showBasket && (
        <div
          className="card-overlay transparentBcg "
          style={{ visibility: "visible" }}
        >
          <div className="cart showCart" style={{ transform: "none" }}>
            <span className="close-cart" onClick={() => setShowBasket(false)}>
              X
            </span>
            <h2>Your Cart</h2>
            {basket.items.map((item, index) => (
              <div className="cart-content" key={item.id}>
                <div className="cart-item">
                  <img src={item.imgs} alt="product" />
                  <div className="price">
                    <h4>{item.name}</h4>
                    <h5>{item.price}$</h5>
                    <span
                      className="remove-item"
                      data-id="6"
                      onClick={() => {
                        const _newBasket = basket.items.filter(
                          (pro) => pro.id !== item.id
                        );
                        dispatch(addItemToBasket(_newBasket));
                        localStorage.setItem(
                          "basket",
                          JSON.stringify(_newBasket)
                        );
                      }}
                    >
                      remove
                    </span>
                  </div>
                  <div className="amount">
                    <svg onClick={() => {changeAmount(item,1,index) }}
                      id="add"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      ></path>
                    </svg>
                    <p className="item-amount">{item.amount}</p>
                    <svg  onClick={() => {changeAmount(item,-1,index) }}

                      id="reduce"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-footer">
              <h3>
                Your Total : <span className="cart-total">{basket.items.reduce((toplam, product) => {
                        return toplam + product.amount * Number(product.price);
                      }, 0)}</span>$
              </h3>
              <button
                className="clear-cart banner-btn"
                onClick={() => {
                  dispatch(addItemToBasket([]));
                  localStorage.setItem("basket", JSON.stringify([]));
                }}
              >
                clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

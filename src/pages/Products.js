import { useEffect, useState } from "react";
import Modal from "../components/modal";

const initialFormData = {
  id: "",
  name: "",
  imgs: [],
  description: "",
  price: "",
  category: "",
  // amount:"",
};

const Products = () => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("productList")) || []);
  const [showModal, setShowModal] = useState();
  const [formData, setFormData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [index,setIndex]=useState()
  const categories=(JSON.parse(localStorage.getItem("catList")) || [])

  useEffect(()=>{
    localStorage.setItem("productList",JSON.stringify(list))
  },[list])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formReset = () => {
    setFormSubmitted(false)
    setFormData(initialFormData)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if(formData.id===""){
      const biggestElemId =list.length > 0 ? list.sort((a, b) => b.id - a.id)[0].id : 0;
      let newList = [
        ...list,
        {
          ...formData,
          id: biggestElemId + 1,
        },
      ];
      setList(newList)
    }else{
      let _list=[...list]
      _list[index]=formData
      setList(_list)
    }
    setShowModal(false);
    formReset();
    
  };

  return (
    <>
      <div className="list-header">
        <h1>Ürün Listesi</h1>
        <div className="right-side">
         

          <a
            className="add-btn"
            href="#"
            onClick={() => {
              setShowModal(true);
              setFormData(initialFormData);
            }}
          >
            Ekle
          </a>
        </div>
      </div>
      <div className="product-list">
        <ul>
          <li>Id</li>
          <li>Name</li>
          <li>Img</li>
          <li>Description</li>
          <li>Price</li>
          <li>Category</li>
          <li>Actions</li>
        </ul>
        {list.map((item,index)=>(
          <ul key={index} className="products">
            <li>{item.id}</li>
            <li>{item.name}</li>
            <li><img src={item.imgs} alt="" /></li>
            <li>{item.description}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li className="actions-button">
                <a
                  href="#"
                  onClick={() => {
                    setShowModal(true);
                    setFormData(item);
                    setIndex(index);
                  }}
                >
                <img src="/images/edit.png" alt="" />
                </a>
                <a
                  href="#"
                  onClick={() => {
                    setList(list.filter(x=>x.id !== item.id));
                  }}
                >
                  <img src="/images/delete.png" alt="" />
                </a>
            </li>
          </ul>
        ))}
      </div>
      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
            formReset();
          }}
        >
          <form onSubmit={handleFormSubmit}>
          <div className={"form-img-container" + (formSubmitted && formData.name === 0 ? " error" : "")}>
              <label>Ürün Adı</label> <br />
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
              />
              {formSubmitted && formData.name === "" && <div>Zorunlu Alan</div>}
            </div>
            <div className={"form-img-container" + (formSubmitted && formData.imgs === "" ? " error" : "")}>
              <label>Ürün Fotoğrafı</label> <br />
              <input
                type="text"
                value={formData.imgs}
                name="imgs"
                onChange={handleInputChange}
              />
              {formSubmitted && formData.name === "" && <div>Zorunlu Alan</div>}
            </div>
            <div className={"form-img-container" + (formSubmitted && formData.description === "" ? " error" : "")}>
              <label>Ürün Açıklaması</label> <br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
              {formSubmitted && formData.description === "" && (
                <div>Zorunlu Alan</div>
              )}
            </div>
            <div className={"form-img-container" + (formSubmitted && formData.price === "" ? " error" : "")}>
              <label>Ürün Fiyatı</label> <br />
              <input
                type="text"
                value={formData.price}
                name="price"
                onChange={handleInputChange}
              />
              {formSubmitted && formData.price === "" && (
                <div>Zorunlu Alan</div>
              )}
            </div>
            <div className={"form-img-container" + (formSubmitted && formData.name === "" ? " error" : "")}>
              <label>Kategori</label> <br />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                {categories.map((ctg) => (
                  <option value={ctg.name}>{ctg.name}</option>
                ))}
              </select>
              {formSubmitted && formData.category === "" && (
                <div>Zorunlu Alan</div>
              )}
            </div>

            <hr />
            <div>
              <button type="submit">Kaydet</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Products;

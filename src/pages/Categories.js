import Modal from "../components/modal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const initialFormData = {
  id: "",
  name: "",
};

const Categories = () => {
  const [showModal, setShowModal] = useState();
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [list,setList]=useState(JSON.parse(localStorage.getItem("catList")) || [])
  const [formData,setFormData]=useState(initialFormData);
  const [index,setIndex]=useState();

  useEffect(()=>{
    localStorage.setItem("catList",JSON.stringify(list))
  },[list])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.id === "") {

      //Ekleme işlemi
      const biggestElemId =
        list.length > 0 ? list.sort((a, b) => b.id - a.id)[0].id : 0;

      let newList = [
        ...list,
        {
          ...formData,
          id: biggestElemId + 1,
        },
      ];
      setList(newList)

    } else {

      //Editleme işlemi
      let _list=[...list]
      _list[index]=formData
      setList(_list)
  };
  formReset()
  setShowModal(false)
};

  const deleteItem=()=>{
    setList([...list.slice(0,index),...list.slice(index+1)])
    setShowDeleteModal(false)
  }

  const formReset=(e)=>{
    setFormData(initialFormData)
  }

  const handleInputChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
 
  return (
    <>
      <div className="categori-container">
        <h1>Kategori Listesi</h1>
        <button className="addBtn" onClick={() => setShowModal(true)}>
          Ekle
        </button>
        <div className="list">
          <ul className="header-ul border">
            <li>Sıra</li>
            <li>Id</li>
            <li className="flex-1">Kategori Adı</li>
            <li>Aksiyonlar</li>
          </ul>

          {list.map((item, index) => (
            <ul className="header-ul" key={index}>
              <li>{index + 1}</li>
              <li>{index}</li>
              <li className="flex-1">
                <Link to={"/urunler?ctg=" + index}> {item.name}</Link>
              </li>
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
                    setShowDeleteModal(true);
                    setIndex(index);
                  }}
                >
                  <img src="/images/delete.png" alt="" />
                </a>
              </li>
            </ul>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
            formReset();
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Kategori Adı</label> <br />
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
              />
            </div>

            <hr />
            <div>
              <button type="submit">Kaydet</button>
            </div>
          </form>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          closeModal={() => {
            setShowDeleteModal(false);
          }}
        >
          <div className="delete-modal">
            <p>Are you sure you want to delete this category?</p>
            <div className="buttons">
              <button onClick={deleteItem}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );

}

export default Categories;

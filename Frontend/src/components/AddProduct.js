import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const AddProduct = () => {
  const [tweet, setTweet] = React.useState("");
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const addProduct = async () => {
    if (!tweet) {
      setError(true);
      return false;
    }

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ tweet }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/add");
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  return (
    <>
      <div className="product">
        <h1>Add Tweet</h1>
        <input
          type="text"
          placeholder="Enter your tweet"
          className="inputBox"
          value={tweet}
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        />
        {error && !tweet && (
          <span className="invalid-input">Enter valid tweet</span>
        )}

        <button onClick={addProduct} className="appButton">
          Add Tweet
        </button>
      </div>

      <div className="product-list">
        <h3>All Tweets</h3>
        <ul>
          <li>S. No.</li>
          <li>Tweet</li>
          <li>Operation</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.tweet}</li>

              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/" + item._id}>Update </Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )}
      </div>
    </>
  );
};

export default AddProduct;

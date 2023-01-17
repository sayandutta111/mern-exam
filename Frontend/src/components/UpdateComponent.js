import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [tweet, setTweet] = React.useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setTweet(result.tweet);
  };

  const updateProduct = async () => {
    console.warn(tweet);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ tweet }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Tweet</h1>
      <input
        type="text"
        placeholder="Enter your tweet"
        className="inputBox"
        value={tweet}
        onChange={(e) => {
          setTweet(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="appButton">
        Update Tweet
      </button>
    </div>
  );
};

export default UpdateProduct;

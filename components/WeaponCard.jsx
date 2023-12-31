import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MyCarousel from "./MyCarousel";
import CardCarousel from "./CardCarousel";
import { BsCheck } from "react-icons/bs";
import tickMark from "../public/icons/tickmark.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

let WeaponCard = (props) => {
  let { name, description, price, isGettingSelledByUser, imageURL } =
    props.data;

  let cartData = useSelector((state) => state.cartData);
  let userData = useSelector((state) => state.userData);
  let isExists = false;
  for (let i = 0; i < cartData.length; i++) {
    let item = cartData[i];
    if (name == item.name) {
      isExists = true;
    }
  }
  let dispatch = useDispatch();
  let handleAddToCart = () => {
    let itemInfo = props.data;
    dispatch({
      type: "ADD_TO_CART",
      payload: itemInfo,
    });
  };
  let navigate = useNavigate();
  let handleSeeProductDetails = () => {
    localStorage.setItem("WEAPONIZEAR7_SELECTED_PRODUCT", name);
    navigate("/product_details");
  };

  return (
    <Card className="weaponCard">
      <CardCarousel data={{ name, isGettingSelledByUser, imageURL }} />
      <Card.Body className="weaponCardBody">
        <Card.Title className="weaponCardTitle">{name}</Card.Title>
        <Card.Text className="weaponCardDescription">{description}</Card.Text>
        <Card.Subtitle className="weaponCardSubtitle">
          Price: {price}
        </Card.Subtitle>
        <div className="card_button_div">
          {!isExists && userData && (
            <Button
              variant="primary"
              style={{ marginTop: "1rem" }}
              onClick={handleAddToCart}
              className="weaponCardButton"
            >
              Add to Cart
            </Button>
          )}
          {isExists && userData && (
            <Button
              variant="primary"
              style={{ marginTop: "1rem" }}
              className="weaponCardButton"
            >
              Added <i className="fa-regular fa-square-check fa-bounce" />
            </Button>
          )}
          {!userData && (
            <Button
              variant="primary"
              className="weaponCardButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login to Buy <i className="fa-solid fa-right-to-bracket" />
            </Button>
          )}

          <i
            className="fa-solid fa-circle-info details_icon"
            onClick={handleSeeProductDetails}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeaponCard;

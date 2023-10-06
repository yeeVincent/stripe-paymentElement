import React, { useState } from "react";
import whiteDogImg from "./assets/white.jpg";
import yellowDogImg from "./assets/yellow.jpg";
import blackDogImg from "./assets/black.jpg";
import { Link } from "react-router-dom";

export default function GoodList() {
  const [goodsList] = useState([
    {
      price_id: "price_1NyET4KuMZn11UP4dw7XsSmb",
      img: whiteDogImg,
      name: "Get her for $200",
    },
    {
      price_id: "price_1NyESlKuMZn11UP4CrF59jB8",
      img: yellowDogImg,
      name: "Get her for $500",
    },
    {
      price_id: "price_1NyESUKuMZn11UP4UjfL0rga",
      img: blackDogImg,
      name: "Get her for $1000",
    },
  ]);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      <ul>
        {goodsList.map((item) => (
          <li
            style={{ cursor: "pointer", marginBottom: "20px" }}
            key={item.price_id}>
            <Link to={`/payment?price_id=${item.price_id}`}>
              <img
                src={item.img}
                alt=""
                style={{ width: "200px" }}
              />
              <div>{item.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

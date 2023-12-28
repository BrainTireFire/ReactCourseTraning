import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Pizza(props) {
  return (
    <li className={`pizza ${props?.pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={props?.pizzaObj.photoName} alt={props?.name} />
      <div>
        <h3>{props?.pizzaObj.name}</h3>
        <p>{props?.pizzaObj.ingredients}</p>
        <span>
          {props?.pizzaObj.soldOut ? "Sold out" : props?.pizzaObj.price}
        </span>
      </div>
    </li>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React pizza company</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;

  return (
    <div className="menu">
      <h2>Our menu</h2>

      {pizzas.length > 0 ? (
        <>
          <p>
            Lorem impusem Lorem impusem Lorem impusem Lorem impusem Lorem
            impusem Lorem impusem Lorem impusem{" "}
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => {
              return <Pizza key={pizza.name} pizzaObj={pizza} />;
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? <Order closeHour={closeHour} /> : <h2>Sorry we're closed</h2>}
    </footer>
  );
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>
        We're currently open until {closeHour}:00. Come visit us or order
        online.
      </p>
      <button title="Order" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

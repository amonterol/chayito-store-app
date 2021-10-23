import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

export default function Home() {
  const state = useContext(GlobalState);
  const [featuredWomenProducts, setfeaturedWomenProducts] =
    state.productsAPI.featuredWomenProducts;
  const [featuredMenProducts, setfeaturedMenProducts] =
    state.productsAPI.featuredMenProducts;

  return (
    <main>
      {/*  ---------------------------------- women and men clothes secction ------------------------------------ */}
      <section className="upper-container">
        <div className="fila1">
          <a href="/">
            <img
              src="https://res.cloudinary.com/abmontero/image/upload/v1632349547/fdsFolder/ujwjri1zimwbxgbtlqxp.jpg"
              alt="ropa de mujer"
            />
          </a>
          <div className="box">
            <h2>NUEVA COLECCION</h2>
            <p>ROPA DE MUJER</p>
            <p> Descúbrelo ahora</p>
          </div>
        </div>
        <div className="fila1">
          <a href="/">
            <img
              src="https://res.cloudinary.com/abmontero/image/upload/v1632349530/fdsFolder/yznvssjohkp47ecd619f.jpg"
              alt="ropa de hombre"
            />
          </a>
          <div className="box">
            <h2>NUEVA COLECCION</h2>
            <p>ROPA DE HOMBRE</p>
            <p> Descúbrelo ahora</p>
          </div>
        </div>
      </section>
      {/*  ---------------------------------- accesories, fabric and children clothes secction ------------------------------------ */}
      <section className="bottom-container">
        <div className="fila2">
          <a href="/">
            <img
              src="https://res.cloudinary.com/abmontero/image/upload/v1630708098/fdsFolder/sl9rdlzqppo4wvb4maan.png"
              alt="ropa de mujer"
            />
          </a>
          <div className="box">
            <h2>NUEVA COLECCION</h2>
            <p>ROPA DE MUJER</p>
            <p> Descúbrelo ahora</p>
          </div>
        </div>
        <div className="fila2">
          <a href="/">
            <img
              src="https://res.cloudinary.com/abmontero/image/upload/v1632360709/qb75lmm323hwopzfmtrx.png"
              alt="ropa de hombre"
            />
          </a>
          <div className="box">
            <h2>NUEVA COLECCION</h2>
            <p>ROPA DE HOMBRE</p>
            <p> Descúbrelo ahora</p>
          </div>
        </div>
        <div className="fila2">
          <a href="/">
            <img
              src="https://res.cloudinary.com/abmontero/image/upload/v1632361558/vau8opd6oqjgtsdbjbfq.png"
              alt="ropa de hombre"
            />
          </a>
          <div className="box">
            <h2>NUEVA COLECCION</h2>
            <p>ROPA DE HOMBRE</p>
            <p> Descúbrelo ahora</p>
          </div>
        </div>
      </section>

      {/*  ---------------------------------- slide show secction ------------------------------------ */}

      <section>
        {/* PRODUCTOS DESTACADOS ROPA MUJERES */}
        <h2 className="title">FEATURED PRODUCTS - WOMEN'S CLOTHING</h2>
        <div className="products">
          {featuredWomenProducts.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </section>
      <section>
        {/* PRODUCTOS DESTACADOS  HOMBRES */}
        <h2 className="title">FEATURED PRODUCTS - MEN'S CLOTHING </h2>
        <div className="products">
          {featuredMenProducts.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </section>
    </main>
  );
}

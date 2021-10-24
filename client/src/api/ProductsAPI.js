import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [featuredWomenProducts, setFeaturedWomenProducts] = useState([]);
  const [featuredMenProducts, setFeaturedMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, category, sort, search, page]);

  useEffect(() => {
    const getFeaturedWomenProducts = async () => {
      const res = await axios.get(`/api/featured_women_products`);
      console.log("Respuesta a consulta featured women products");
      console.log(res.data);
      setFeaturedWomenProducts(res.data);
    };
    getFeaturedWomenProducts();
  }, [callback, page]);

  useEffect(() => {
    const getFeaturedMenProducts = async () => {
      const res = await axios.get(`/api/featured_men_products`);
      console.log("Respuesta a consulta featured men products");
      console.log(res.data);
      setFeaturedMenProducts(res.data);
    };
    getFeaturedMenProducts();
  }, [callback, page]);

  useEffect(() => {
    const getWomenProducts = async () => {
      const res = await axios.get(`/api/products/women`);
      console.log("Respuesta a consulta women products");
      console.log(res.data);
      setWomenProducts(res.data);
    };
    getWomenProducts();
  }, [callback, page]);

  useEffect(() => {
    const getMenProducts = async () => {
      const res = await axios.get(`/api/products/men`);
      console.log("Respuesta a consulta men products");
      console.log(res.data);
      setMenProducts(res.data);
    };
    getMenProducts();
  }, [callback, page]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    featuredWomenProducts: [featuredWomenProducts, setFeaturedWomenProducts],
    featuredMenProducts: [featuredMenProducts, setFeaturedMenProducts],
    womenProducts: [womenProducts, setWomenProducts],
    menProducts: [menProducts, setMenProducts],
  };
}

export default ProductsAPI;

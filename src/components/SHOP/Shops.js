import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from './Cart';
import Shop from './Shop';

export default function Shops() {
  const [products, setProducts] = useState([]);
  const [carts, setCart] = useState([]);


  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setProducts(data)
    })
  },[])

  useEffect(()=> {
    const storedCart = getStoredCart();
    console.log(storedCart);
    const savedCart = [];
    for(const id in storedCart){
      const addedProduct = products.find(product => product.id === id);
      if(addedProduct){
        const quantity = storedCart[id];
        console.log(quantity);
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct)
      }
    }
    console.log(savedCart);
    setCart(savedCart);
  },[products])

  const dataPass = (selectedProduct) => {
    let newCart = [];
    const exists = carts.find(product => product.id === selectedProduct.id);
    if(!exists) {
      selectedProduct.quantity = 1;
      newCart = [...carts, selectedProduct];
    } else {
      const rest = carts.filter(product => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists]
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
  };
  return (
    <div className='grid grid-cols-5 pt-[80px] -z-10'>
        <div className='col-span-4 grid grid-cols-3 px-12 gap-6 pt-12'>
        {products.map(product => <Shop dataPass={dataPass} key={product.id} product={product} {...product}/>)}
        </div>
          <Cart cart={carts}/>
    </div>
  )
}

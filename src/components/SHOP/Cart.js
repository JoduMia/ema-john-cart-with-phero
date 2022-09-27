import React from 'react'

export default function Cart({cart}) {
  console.log(cart);
  let total = 0;
  let shipping = 0;
  let quantity = 0;

  for(const product of cart){
    quantity = quantity + product.quantity;
    console.log(quantity);
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping * product.quantity;
  }
  let tax = total * .01;




  return (
    <div className='bg-[#ff99004d] p-3'>
      <div className='h-screen fixed'>
        <div>
          <h1 className='text-center text-xl pb-1 border-b-2 border-black uppercase font-bold'>Order Summary</h1>
          <div className='mt-3 space-y-3'>
            <h1>Selected Items: <span className='font-semibold'>{quantity}</span></h1>

            <p>TotalPrice: ${total}</p>
            <p>Total Shipping cost: ${shipping}</p>
            <p>Added Tax: ${tax.toFixed(2)}</p>
            <p className='text-xl font-bold'>Grand Total: ${(total + shipping + tax).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

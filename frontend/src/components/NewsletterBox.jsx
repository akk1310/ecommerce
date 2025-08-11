import React from 'react';

const NewsletterBox = () => {
    const onSubmitHandler = (e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscriber now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            We love welcoming new shoppers to GrabNgo! Sign up for our newsletter today and enjoy an instant 20% discount on your first order. Plus, get updates on our latest arrivals, exclusive deals, and special offers delivered straight to your inbox.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input required type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email:' />
            <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
      
    </div>
  );
}

export default NewsletterBox;

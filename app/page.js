"use client"

import { useState } from 'react'
import axios from 'axios'
import { baseURL } from './endPoint'
export default function Home() {
  const [submiteAble, setSubmiteAble] = useState(true)
  const [result, setResult] = useState({})
  const [inputs, setInputs] = useState({
    price_before_discount: 0,
    price_after_discount: 0,
    discount: 0,
    saved: 0,
  });

  const [error, setError] = useState('');



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Parse the input value to a float
    const parsedValue = parseFloat(value);

    // Check if the parsed value is NaN (not a number)
    if (isNaN(parsedValue)) {
      setInputs({
        ...inputs,
        [name]: 0,
      });
      return;
    }
    if (parsedValue < 0) {
      setError('Value cannot be negative.');

      setSubmiteAble(false)
      setInputs({
        ...inputs,
        [name]: 0,
      });
      return;
    }
    setError('')
    setInputs({
      ...inputs,
      [name]: parsedValue,
    });
  };



  const fetchCalculation = async (body) => {
    try {
      console.log(body);
      const { data } = await axios.post(`${baseURL}api/v1/calculate`,
        { price_before_discount: parseFloat(body.price_before_discount), discount: parseFloat(body.discount), saved: body.saved ? parseFloat(body.saved) : undefined })
      return data
    } catch (err) {

    }

  }

  const clearInputs = () => {
    setInputs({
      price_before_discount: '0', // or 0 if you want to store it as a number
      price_after_discount: '0', // or 0 if you want to store it as a number
      discount: '0', // or 0 if you want to store it as a number
      saved: '0', // or 0 if you want to store it as a number
    });
    setError('');
  };




  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!submiteAble) return
      const filledFields = Object.values(inputs).filter((value) => parseFloat(value) != 0);
      if (filledFields.length < 2) {
        setError('At least two fields a mandatory');
        return
      }
      const result = await fetchCalculation(inputs)
      setResult(result)

    } catch (err) {

    }
  }


  return (
    <div style={{ display: 'flex', width: '80%', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100vh', width: '100%' }}>
        <div>
          <h1 className='text-2xl'>Discount Calculator</h1>
          <p>Please provide any 2 values below to calculate.</p>
          <br />
          <div>
            <form onSubmit={handleSubmit} style={{ border: '1px solid black', padding: '6px', borderRadius: '3px' }}>

              <div className="mt-4">
                <label htmlFor="before_discount" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price before discount	</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input type="number" id="before_discount" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price before discount	" name='price_before_discount' onChange={handleInputChange} />

                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="discount" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                <div className="relative">

                  <input type="text" id="discount" className="block w-full p-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discount" name='discount' onChange={handleInputChange} />
                  <div className="absolute inset-y-0 right-3 bg-[#f9fafb] flex items-center pl-3 pointer-events-none h-1 top-6">

                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="after_discount" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Price after discount	</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input type="number" id="fter_discount" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price after discount	" name='price_after_discount' onChange={handleInputChange} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="saved" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">You saved
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input type="number" id="saved" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="You saved  " name='saved' onChange={handleInputChange} />

                </div>
              </div>
              {error && <p className="m-1 text-red-500">{error}</p>}

              <div className='flex justify-center my-4'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={handleSubmit}>
                  Calulate
                </button>
                <button
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={clearInputs}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          {result && result.status && <div>
            <h1 style={{ backgroundColor: 'green', padding: '3px', borderRadius: '3px' }} >Results</h1>
            <p className='text-xl'>Original price: ${result.data['price_before_discount']}</p>
            <p className='text-xl'>Discount:  {result.data['discount']}%</p>
            <p className='text-xl'>Price after discount: ${result.data['price_after_discount']}</p>
            <p className='text-xl'>You Saved: ${result.data['saved']}</p>
          </div>}
        </div>
      </div >
    </div>
  )
}

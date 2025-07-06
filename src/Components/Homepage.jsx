import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { Link } from 'react-router';


//UI compos
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShimmerPostItem } from "react-shimmer-effects";


import { cryptonames } from './cryptoNames';

const Homepage = () => {
  const [coinData, setCoin] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const showCoins = async() => {
      try {
        const data = await fetch(new Request("https://api.livecoinwatch.com/coins/map"), {
            method: "POST",
            headers: new Headers({
            "content-type": "application/json",
            "x-api-key": "195f3938-efaf-4db9-b9c0-2362702c22e2",
          }),
          body: JSON.stringify({ 
            currency: "USD",
            codes: cryptonames,
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 0,
            meta: true
  
          }),
        });
    
        const resp = await data.json();
        console.log(resp);
        setCoin(resp);
        setLoading(false)
      } catch (error) {
        console.log("Error:", error)
      }
    }
    showCoins();
  
    // const intervalId = setInterval(showCoins, 10000);

    // return () => clearInterval(intervalId);
  }, [])



  const ele = coinData.map(function(item){
    return (
      <div key={item.name}>
        <Card key={item.id} >
          <CardHeader className="flex items-center gap-5">
            <img src={item.png64}/>
            <h3 className='text-3xl'>{item.code} <span> {item.symbol  }</span></h3>
          </CardHeader>
          <CardContent>
            <p>Price: ${item.rate.toFixed(3)}</p>
          </CardContent>
          <CardContent>
            <p >24H: <span className={item.delta.day > 0 ? "text-green-500": "text-red-500"}> {item.delta.day}</span></p>
          </CardContent>
          <CardContent>
            <p >Last 7 days: <span className={item.delta.day > 0 ? "text-green-500": "text-red-500"}> {item.delta.week}</span></p>
          </CardContent>

          <div className='flex  justify-center'>
            <Button variant="secondary"><Link to={`/coin/${item.code}`}>Go to details</Link></Button> 
          </div>
        </Card>
      </div>
    )
  })

  return (
    <div className='p-5'>
      <div className='flex flex-col sm:flex justify-between mb-10'>
      <Button><Link to={'/all'}>Click to see detailed table</Link></Button>
        <h3 className='text-3xl mb-10 font-semibold'>Welcome to my CRYPTO site!</h3> 

        <Button><Link to={'/crytoconverter'}>Convert Your crypto now</Link></Button>
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

      { 
        loading ?           
        <ShimmerPostItem
          card
          title
          cta
          imageType="thumbnail"
          imageWidth={80}
          imageHeight={80}
          contentCenter
        /> 
        : 
        ele
      }
      </section>
    </div>
  )
}

export default Homepage
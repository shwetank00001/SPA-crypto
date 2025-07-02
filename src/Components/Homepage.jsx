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


const Homepage = () => {
  const [coinData, setCoin] = useState([]);



  useEffect(() => {

    const showCoins = async() => {
        const data = await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
          method: "POST",
          headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "195f3938-efaf-4db9-b9c0-2362702c22e2",
        }),
        body: JSON.stringify({ 
              currency: "USD",
              sort: "rank",
              order: "ascending",
              offset: 0,
              limit: 10,
              meta: false
        }),
      });
  
      const resp = await data.json();
      console.log(resp);
      setCoin(resp)
    }
    showCoins()
  }, [])

  const ele = coinData.map(function(item){
    return (
      <Card >
        <CardHeader>
          <h3>{item.code}</h3>
        </CardHeader>
        <CardContent>
          <p>$:{item.rate}</p>
        </CardContent>
        <div className='flex  justify-center'>
          <Button variant="secondary"><Link to={`/coin/${item.code}`}>Go to details</Link></Button> 
        </div>
      </Card>
    )
  })

  return (
    <div className='p-5'>
        <h3 className='text-3xl mb-10'>Welcome to my CRYPTO site!</h3> 
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
        {ele}
      </section>
    </div>
  )
}

export default Homepage
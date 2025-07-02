import { useEffect, useState } from "react"


const AllCryptos = () => {

  const [coin, setCoins] = useState([]);

  useEffect(() => {
    const showCoins = async() => {
      try {
        const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false', {method: 'GET', headers: {accept: 'application/json'}});
        const resp = await data.json();
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    }
    showCoins()
  }, [])

  return (
    <div>

    </div>
  )
}

export default AllCryptos
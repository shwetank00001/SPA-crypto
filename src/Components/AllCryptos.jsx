import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { Button } from "@/Components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AllCryptos = () => {

  const [coin, setCoins] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const showCoins = async() => {
      try {
        const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false', {method: 'GET', headers: {accept: 'application/json'}});
        const resp = await data.json();
        console.log(resp);
        setCoins(resp)
      } catch (error) {
        console.log(error)
      }
    }
    showCoins()
  }, []);

  // function navigateToUrl(nameParam){
  //   nav(`/coin/${nameParam}`)
  // onClick={() => navigateToUrl(item.symbol)}
  // }

  const allCryptos = coin.map(function(item){
    return (
              <TableRow >
                {/* <TableCell>{item.rank}</TableCell> */}
                <TableCell className="flex items-center gap-5"><img className="w-10" src={item.image}/> {item.name}</TableCell>
                <TableCell>{item.current_price}</TableCell>
                <TableCell>$ {(item.total_volume /1000000000).toFixed(3)} B</TableCell>
                <TableCell>{item.ath}</TableCell>
                <TableCell>$ {(item.market_cap /1000000000).toFixed(3)} B</TableCell>
                <TableCell className={item.ath_change_percentage > 0 ? "text-green-400 font-semibold" :"text-red-400 font-semibold" }>{item.ath_change_percentage.toFixed(3)}</TableCell>
                <TableCell className={item.price_change_percentage_24h > 0 ? "text-green-400 font-semibold" :"text-red-400 font-semibold" } >{item.price_change_percentage_24h}</TableCell>
              </TableRow>

    )
  })

  return (
    <div>
      <Table>
        {/* <TableCaption>Every Crypto Here</TableCaption> */}
          <TableHeader>
              <TableRow>
                {/* <TableHead >ID</TableHead> */}
                <TableHead >Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>All Time High</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>ATH % change</TableHead>
                <TableHead>24h</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {allCryptos}
          </TableBody>
      </Table>

    </div>
  )
}

export default AllCryptos
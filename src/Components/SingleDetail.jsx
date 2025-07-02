import { useParams } from "react-router";
import { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const SingleDetail = () => {
    const {name} = useParams();
    console.log(name);

    const [singleCoin, setCoin] = useState();

    const [isFetching, setFetching] = useState(true)


    useEffect(() => {
        try {
            async function showSingle(){
                const data = await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
                    method: "POST",
                    headers: new Headers({
                        "content-type": "application/json",
                        "x-api-key": "195f3938-efaf-4db9-b9c0-2362702c22e2",
                    }),
                    body: JSON.stringify({
                        code : `${name}`,
                        currency: "USD",
                        meta: true,
                    }),
                });
    
                const resp = await data.json();
                console.log(resp);
                setCoin(resp);
                setFetching(false);
            }
            showSingle()
        } catch (error) {
            console.log("Error", error)
        }


        
    }, [])
    console.log("singleCoin", singleCoin)
    console.log("website", singleCoin)

    return (
        <div className="border-black p-5">
            {
                isFetching ? "Loading Data.."
            :
                <Card >
                    <CardHeader>
                        <img src={singleCoin.png64} />
                        <h1 class="text-3xl font-bold underline"> {singleCoin.symbol} {singleCoin.name} </h1>
                    </CardHeader>
                    <CardContent>
                        <h3>Alltime High: {singleCoin.allTimeHighUSD}</h3>
                        <p>Total Volume: $ {singleCoin.volume / 1000000000} B</p>
                        <p>Total Supply: {singleCoin.totalSupply}</p>
                    </CardContent>

                    <CardContent>
                        <h3>Number of exchanges: {singleCoin.exchanges}</h3>
                        <p>rate of change in the last hour: {singleCoin.delta.hour}</p>
                        <p>rate of change in the last 24 hours: {singleCoin.delta.day}</p>
                        <p>rate of change in the last 1 week: {singleCoin.delta.week}</p>
                        <p>rate of change in the last month: {singleCoin.delta.month}</p>
                    </CardContent>

                    <CardFooter className="flex gap-2 text-blue-600">
                        <a target="_blank" href={singleCoin.links.website}>Official Website</a>
                        <a target="_blank" href={singleCoin.links.reddit}>Reddit</a>
                    </CardFooter>
                    
                </Card>
            }
        </div>
    )
}

export default SingleDetail
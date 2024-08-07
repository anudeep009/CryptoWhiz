"use client";

import { useSelector, useDispatch } from "react-redux";
import { addCoin, removeCoin } from "../Store/watchlistslice";
import { Button } from "../Components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../Components/ui/Card";
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../card.css';

export default function Watchlist() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.coins);

  const handleAddCoin = () => {
    dispatch(addCoin({
      id: "sol",
      coin: "Solana",
      current_price: 100.25,
      low_24h: 95.00,
      high_24h: 105.00,
      image: "https://example.com/solana.png"
    }));
  };

  const handleRemoveCoin = (id) => {
    dispatch(removeCoin(id));
  };

  return (
    <section className="w-full py-12">
      <Toaster />
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
            <p className="text-gray-500">Track your favorite cryptocurrencies.</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleAddCoin}>
            Add Coin
          </Button>
          <Link to={'/Market'}>
            <Button variant="outline" size="sm">
              Go to Market
            </Button>
          </Link>
        </div>
        <div className="grid gap-4">
          {watchlist.map((coin) => (
            <Card
              key={coin.id}
              className="p-4 flex items-center justify-between bg-white shadow-md rounded-lg"
            >
              <CardHeader className="w-full">
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="font-medium text-lg">{coin.coin}</CardTitle>
                      <div className="text-gray-500 text-sm">({coin.id.toUpperCase()})</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="font-medium text-xl">${coin.current_price.toFixed(2)}</div>
                      <div
                        className={`px-2 py-0.5 rounded-md text-xs ${
                          coin.current_price >= coin.low_24h ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                        }`}
                      >
                        ${coin.current_price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCoin(coin.id)}
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Remove {coin.coin}</span>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

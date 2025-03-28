
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MoreVertical, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock watchlist data
const watchlistData = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 26735.59,
    change24h: -5.12,
    marketCap: 520.5,
    volume24h: 32.1,
    isFavorite: true,
  },
  {
    id: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: 1830.25,
    change24h: -3.25,
    marketCap: 220.1,
    volume24h: 18.7,
    isFavorite: true,
  },
  {
    id: 3,
    symbol: "USDT",
    name: "Tether",
    price: 1.00,
    change24h: 0.22,
    marketCap: 83.2,
    volume24h: 45.3,
    isFavorite: false,
  },
  {
    id: 4,
    symbol: "SUSHI",
    name: "SushiSwap",
    price: 0.8802,
    change24h: 0.60,
    marketCap: 2.5,
    volume24h: 1.2,
    isFavorite: true,
  },
  {
    id: 5,
    symbol: "SOL",
    name: "Solana",
    price: 38.52,
    change24h: 2.18,
    marketCap: 16.4,
    volume24h: 2.8,
    isFavorite: false,
  },
  {
    id: 6,
    symbol: "XRP",
    name: "Ripple",
    price: 0.53,
    change24h: -1.35,
    marketCap: 28.7,
    volume24h: 1.6,
    isFavorite: false,
  },
  {
    id: 7,
    symbol: "ADA",
    name: "Cardano",
    price: 0.38,
    change24h: -2.41,
    marketCap: 13.5,
    volume24h: 0.9,
    isFavorite: false,
  },
];

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter the watchlist based on search term and active tab
  const filteredWatchlist = watchlistData.filter(
    (coin) => {
      const matchesSearch = coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           coin.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === "favorites") {
        return matchesSearch && coin.isFavorite;
      }
      
      return matchesSearch;
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
        <p className="text-muted-foreground">
          Track your favorite assets
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Assets</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead className="text-right">Volume (24h)</TableHead>
                      <TableHead className="text-right w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWatchlist.map((coin) => (
                      <TableRow key={coin.id} className="hover:bg-muted/30">
                        <TableCell className="py-3">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 ${coin.isFavorite ? 'text-yellow-400' : 'text-muted-foreground'}`}
                          >
                            <Star className="h-4 w-4 fill-current" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-semibold ${
                              coin.symbol === 'BTC' ? 'bg-crypto-bitcoin' : 
                              coin.symbol === 'USDT' ? 'bg-crypto-tether' : 
                              coin.symbol === 'SUSHI' ? 'bg-crypto-sushi' : 'bg-primary'
                            }`}>
                              {coin.symbol.substring(0, 1)}
                            </div>
                            <div>
                              <div className="font-medium">{coin.symbol}</div>
                              <div className="text-xs text-muted-foreground">{coin.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {coin.change24h >= 0 ? (
                              <ArrowUpRight className="h-3 w-3 text-gain" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 text-loss" />
                            )}
                            <span className={coin.change24h >= 0 ? 'text-gain' : 'text-loss'}>
                              {Math.abs(coin.change24h).toFixed(2)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${coin.marketCap.toLocaleString('en-US', { minimumFractionDigits: 1 })}B
                        </TableCell>
                        <TableCell className="text-right">
                          ${coin.volume24h.toLocaleString('en-US', { minimumFractionDigits: 1 })}B
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Buy</DropdownMenuItem>
                              <DropdownMenuItem>Set Alert</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="m-0">
              {/* Same table structure as "all" but filtered for favorites */}
            </TabsContent>
            
            <TabsContent value="gainers" className="m-0">
              {/* Same table structure as "all" but filtered for gainers */}
            </TabsContent>
            
            <TabsContent value="losers" className="m-0">
              {/* Same table structure as "all" but filtered for losers */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Watchlist;

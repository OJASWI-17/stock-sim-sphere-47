
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  Search,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for chart
const generateChartData = () => {
  const data = [];
  const now = new Date();
  now.setHours(16, 0, 0, 0); // Market close at 4PM
  
  // Generate data for the last 5 days
  for (let i = 0; i < 5; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate hourly data for this day
    for (let hour = 9; hour <= 16; hour++) {
      const time = new Date(date);
      time.setHours(hour, 0, 0, 0);
      
      const previousDay = i > 0 ? data[data.length - 8] : null;
      const previousDayClose = previousDay ? previousDay.close : 150;
      
      // Generate OHLC based on previous close with some randomness
      const volatility = 5;
      const randomChange = () => (Math.random() * 2 - 1) * volatility;
      
      const open = i === 0 && hour === 9
        ? 152.75
        : hour === 9
        ? previousDayClose + randomChange()
        : data[data.length - 1].close;
        
      const high = open + Math.abs(randomChange());
      const low = open - Math.abs(randomChange());
      const close = (high + low) / 2 + randomChange();
      
      data.push({
        timestamp: time.toISOString(),
        time: `${hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}`,
        day: time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 1000000) + 500000,
      });
    }
  }
  
  // Reverse data to get chronological order
  return data.reverse();
};

const chartData = generateChartData();

// Mock stock data
const stockData = {
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 152.75,
  change: 2.35,
  changePercent: 1.56,
  open: 150.40,
  high: 153.10,
  low: 149.85,
  volume: 78543210,
  marketCap: "2.45T",
  pe: 25.8,
  dividend: 0.92,
  yield: 0.6,
};

// Additional stocks for search
const stocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "V", name: "Visa Inc." },
  { symbol: "JNJ", name: "Johnson & Johnson" },
  { symbol: "PG", name: "Procter & Gamble Co." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
];

// Custom tooltip type
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const Chart = () => {
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStockSearch, setShowStockSearch] = useState(false);
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [orderSide, setOrderSide] = useState("buy");
  const { toast } = useToast();

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setShowStockSearch(false);
    setSearchQuery("");
  };

  const handlePlaceOrder = () => {
    toast({
      title: `Order Placed Successfully`,
      description: `Your ${orderSide.toUpperCase()} order for ${quantity} shares of ${selectedStock.symbol} has been placed.`,
    });
  };

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-md shadow-md">
          <p className="text-xs font-medium">{payload[0].payload.day} - {label}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Open: <span className="text-foreground">${payload[0].payload.open.toFixed(2)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            High: <span className="text-foreground">${payload[0].payload.high.toFixed(2)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Low: <span className="text-foreground">${payload[0].payload.low.toFixed(2)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Close: <span className="text-foreground">${payload[0].payload.close.toFixed(2)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Volume: <span className="text-foreground">{payload[0].payload.volume.toLocaleString()}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Chart</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={() => setShowStockSearch(!showStockSearch)}
              >
                <span>{selectedStock.symbol}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showStockSearch && (
                <div className="absolute z-10 top-full mt-1 right-0 w-64 bg-card border border-border rounded-md shadow-lg">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search stocks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="px-3 py-2 hover:bg-primary/10 cursor-pointer"
                        onClick={() => handleStockSelect(stock)}
                      >
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          {stock.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <TabsList>
              <TabsTrigger
                value="1D"
                onClick={() => setSelectedTimeframe("1D")}
                className={selectedTimeframe === "1D" ? "bg-primary text-primary-foreground" : ""}
              >
                1D
              </TabsTrigger>
              <TabsTrigger
                value="1W"
                onClick={() => setSelectedTimeframe("1W")}
                className={selectedTimeframe === "1W" ? "bg-primary text-primary-foreground" : ""}
              >
                1W
              </TabsTrigger>
              <TabsTrigger
                value="1M"
                onClick={() => setSelectedTimeframe("1M")}
                className={selectedTimeframe === "1M" ? "bg-primary text-primary-foreground" : ""}
              >
                1M
              </TabsTrigger>
              <TabsTrigger
                value="3M"
                onClick={() => setSelectedTimeframe("3M")}
                className={selectedTimeframe === "3M" ? "bg-primary text-primary-foreground" : ""}
              >
                3M
              </TabsTrigger>
              <TabsTrigger
                value="1Y"
                onClick={() => setSelectedTimeframe("1Y")}
                className={selectedTimeframe === "1Y" ? "bg-primary text-primary-foreground" : ""}
              >
                1Y
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Chart Section */}
        <Card className="xl:col-span-3">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3">
                  <CardTitle>{selectedStock.name} ({selectedStock.symbol})</CardTitle>
                  <div className={stockData.change > 0 ? "text-gain" : "text-loss"}>
                    <div className="flex items-center">
                      {stockData.change > 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {stockData.change > 0 ? "+" : ""}
                        {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  ${stockData.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Buy</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Buy {selectedStock.symbol}</DialogTitle>
                      <DialogDescription>
                        Place an order to buy {selectedStock.symbol} shares.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Order Type</span>
                        <Select
                          value={orderType}
                          onValueChange={setOrderType}
                        >
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market Order</SelectItem>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="stop">Stop Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Quantity</span>
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="w-[160px]"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Estimated Total</span>
                        <span className="font-medium">
                          ${(stockData.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handlePlaceOrder}>Place Order</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Sell</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Sell {selectedStock.symbol}</DialogTitle>
                      <DialogDescription>
                        Place an order to sell {selectedStock.symbol} shares.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Order Type</span>
                        <Select
                          value={orderType}
                          onValueChange={setOrderType}
                        >
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market Order</SelectItem>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="stop">Stop Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Quantity</span>
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="w-[160px]"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Estimated Total</span>
                        <span className="font-medium">
                          ${(stockData.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handlePlaceOrder} variant="outline">Place Order</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="chart-container h-96 mt-6">
              <Tabs defaultValue="line">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="line">Line</TabsTrigger>
                    <TabsTrigger value="area">Area</TabsTrigger>
                    <TabsTrigger value="candle">Candle</TabsTrigger>
                  </TabsList>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Indicators
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="line" className="mt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis 
                        dataKey="time" 
                        stroke="#64748b" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        orientation="right"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                      />
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="close" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#1e3a8a" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="area" className="mt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <XAxis 
                        dataKey="time" 
                        stroke="#64748b" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        orientation="right"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                      />
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="close" 
                        stroke="#3b82f6" 
                        fill="url(#colorClose)" 
                        strokeWidth={2} 
                      />
                      <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="candle" className="mt-0">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Candlestick chart would be implemented here with a dedicated library.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Stock Info Sidebar */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Stock Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Open</div>
                  <div className="text-right">${stockData.open.toFixed(2)}</div>
                  <div className="text-muted-foreground">High</div>
                  <div className="text-right">${stockData.high.toFixed(2)}</div>
                  <div className="text-muted-foreground">Low</div>
                  <div className="text-right">${stockData.low.toFixed(2)}</div>
                  <div className="text-muted-foreground">Volume</div>
                  <div className="text-right">{stockData.volume.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Company Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Market Cap</div>
                  <div className="text-right">${stockData.marketCap}</div>
                  <div className="text-muted-foreground">P/E Ratio</div>
                  <div className="text-right">{stockData.pe.toFixed(2)}</div>
                  <div className="text-muted-foreground">Dividend</div>
                  <div className="text-right">${stockData.dividend}</div>
                  <div className="text-muted-foreground">Yield</div>
                  <div className="text-right">{stockData.yield}%</div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Add to Watchlist</Button>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Similar Stocks</h3>
                <div className="space-y-2">
                  {stocks.slice(0, 3).map((stock) => (
                    <div 
                      key={stock.symbol}
                      className="flex justify-between items-center p-2 hover:bg-primary/10 rounded-md cursor-pointer"
                      onClick={() => handleStockSelect(stock)}
                    >
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          {stock.name}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chart;

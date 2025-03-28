
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  SortAsc,
  SortDesc,
  DollarSign,
  MoreVertical,
  Star,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock portfolio data
const portfolioData = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 15,
    avgPrice: 150.25,
    currentPrice: 187.82,
    value: 2817.3,
    pnl: 563.55,
    pnlPercentage: 25.01,
    sector: "Technology",
  },
  {
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    quantity: 10,
    avgPrice: 290.12,
    currentPrice: 378.85,
    value: 3788.5,
    pnl: 887.3,
    pnlPercentage: 30.58,
    sector: "Technology",
  },
  {
    id: 3,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 8,
    avgPrice: 135.75,
    currentPrice: 142.5,
    value: 1140,
    pnl: 54,
    pnlPercentage: 4.97,
    sector: "Technology",
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    quantity: 5,
    avgPrice: 175.35,
    currentPrice: 169.95,
    value: 849.75,
    pnl: -27,
    pnlPercentage: -3.08,
    sector: "Consumer Cyclical",
  },
  {
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    quantity: 12,
    avgPrice: 900.5,
    currentPrice: 879.89,
    value: 10558.68,
    pnl: -247.32,
    pnlPercentage: -2.29,
    sector: "Automotive",
  },
  {
    id: 6,
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    quantity: 20,
    avgPrice: 145.8,
    currentPrice: 153.15,
    value: 3063,
    pnl: 147,
    pnlPercentage: 5.04,
    sector: "Financial Services",
  },
  {
    id: 7,
    symbol: "V",
    name: "Visa Inc.",
    quantity: 25,
    avgPrice: 210.9,
    currentPrice: 258.35,
    value: 6458.75,
    pnl: 1186.25,
    pnlPercentage: 22.5,
    sector: "Financial Services",
  },
];

// Portfolio summary calculations
const calculateSummary = (data) => {
  return data.reduce(
    (acc, stock) => {
      acc.totalValue += stock.value;
      acc.totalPnl += stock.pnl;
      return acc;
    },
    { totalValue: 0, totalPnl: 0 }
  );
};

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("symbol");
  const [sortDirection, setSortDirection] = useState("asc");
  const { toast } = useToast();

  // Filter the portfolio based on search term
  const filteredPortfolio = portfolioData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered portfolio
  const sortedPortfolio = [...filteredPortfolio].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Calculate summary
  const summary = calculateSummary(portfolioData);
  const pnlPercentage = (summary.totalPnl / (summary.totalValue - summary.totalPnl)) * 100;

  // Handle sort change
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleBuySell = (action, symbol) => {
    toast({
      title: `${action} order placed`,
      description: `Your ${action.toLowerCase()} order for ${symbol} has been placed successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground">
          Manage and track your investments
        </p>
      </div>

      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-3xl font-bold">
                ${summary.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total P&L</p>
              <div className="flex items-center gap-2">
                <p className={`text-2xl font-bold ${summary.totalPnl >= 0 ? "text-gain" : "text-loss"}`}>
                  {summary.totalPnl >= 0 ? "+" : "-"}$
                  {Math.abs(summary.totalPnl).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <Badge
                  variant="outline"
                  className={`${
                    summary.totalPnl >= 0
                      ? "bg-gain/10 text-gain border-gain"
                      : "bg-loss/10 text-loss border-loss"
                  }`}
                >
                  {summary.totalPnl >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(pnlPercentage).toFixed(2)}%
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button className="flex-1">Deposit</Button>
              <Button variant="outline" className="flex-1">Withdraw</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Holdings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Holdings</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="etfs">ETFs</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Input
                  placeholder="Search symbols..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-[200px]"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSort("symbol")}>
                      Sort by Symbol
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("value")}>
                      Sort by Value
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("pnlPercentage")}>
                      Sort by P&L %
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                >
                  {sortDirection === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium">Symbol</th>
                        <th className="py-3 px-4 text-left font-medium">Qty</th>
                        <th className="py-3 px-4 text-left font-medium">Avg Price</th>
                        <th className="py-3 px-4 text-left font-medium">Current Price</th>
                        <th className="py-3 px-4 text-left font-medium">Value</th>
                        <th className="py-3 px-4 text-left font-medium">P&L</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sortedPortfolio.map((stock) => (
                        <tr key={stock.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{stock.symbol}</div>
                                <div className="text-xs text-muted-foreground">
                                  {stock.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{stock.quantity}</td>
                          <td className="py-3 px-4">
                            ${stock.avgPrice.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            ${stock.currentPrice.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            ${stock.value.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span
                                className={
                                  stock.pnl >= 0 ? "text-gain" : "text-loss"
                                }
                              >
                                {stock.pnl >= 0 ? "+" : ""}$
                                {stock.pnl.toFixed(2)}
                              </span>
                              <span
                                className={`text-xs ${
                                  stock.pnlPercentage >= 0
                                    ? "text-gain"
                                    : "text-loss"
                                }`}
                              >
                                {stock.pnlPercentage >= 0 ? "+" : ""}
                                {stock.pnlPercentage.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleBuySell("Buy", stock.symbol)}
                              >
                                Buy
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBuySell("Sell", stock.symbol)}
                              >
                                Sell
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Star className="h-4 w-4 mr-2" />
                                    Add to Watchlist
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Set Alert</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stocks" className="m-0">
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">
                  Filtered view for stocks (same table format)
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="etfs" className="m-0">
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">
                  Filtered view for ETFs (same table format)
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;

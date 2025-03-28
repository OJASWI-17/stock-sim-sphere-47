
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, BarChart2, PieChart, History, Trophy, DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Mock data
const portfolioSummary = {
  totalValue: 28456.72,
  totalGain: 2134.52,
  totalGainPercentage: 8.12,
  dailyChange: 456.72,
  dailyChangePercentage: 1.63,
};

const recentAlerts = [
  {
    id: 1,
    title: "AAPL up by 2.5%",
    description: "Apple Inc. shares rose by 2.5% in the last hour",
    time: "1 hour ago",
  },
  {
    id: 2,
    title: "TSLA hit target price",
    description: "Tesla Inc. reached your target price of $900",
    time: "3 hours ago",
  },
  {
    id: 3,
    title: "Market opening soon",
    description: "US markets will open in 30 minutes",
    time: "5 hours ago",
  },
];

const topPerformers = [
  { symbol: "AAPL", name: "Apple Inc.", change: 2.5, price: 187.82 },
  { symbol: "MSFT", name: "Microsoft Corp.", change: 1.8, price: 378.85 },
  { symbol: "TSLA", name: "Tesla Inc.", change: -1.2, price: 879.89 },
];

const marketIndices = [
  { name: "S&P 500", value: 4587.25, change: 0.82 },
  { name: "NASDAQ", value: 14242.56, change: 1.13 },
  { name: "DOW JONES", value: 34986.45, change: 0.57 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Portfolio Summary</CardTitle>
            <CardDescription>Your current investment overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <h2 className="text-3xl font-bold">
                  ${portfolioSummary.totalValue.toLocaleString()}
                </h2>
                <div className="flex items-center gap-2">
                  {portfolioSummary.totalGain > 0 ? (
                    <>
                      <Badge variant="outline" className="bg-gain/10 text-gain border-gain">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        {portfolioSummary.totalGainPercentage}%
                      </Badge>
                      <span className="text-sm text-gain">
                        +${portfolioSummary.totalGain.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="bg-loss/10 text-loss border-loss">
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                        {Math.abs(portfolioSummary.totalGainPercentage)}%
                      </Badge>
                      <span className="text-sm text-loss">
                        -${Math.abs(portfolioSummary.totalGain).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Today's Change</p>
                <h2 className="text-2xl font-bold">
                  {portfolioSummary.dailyChange > 0 ? "+" : ""}$
                  {portfolioSummary.dailyChange.toLocaleString()}
                </h2>
                <div className="flex items-center gap-2">
                  {portfolioSummary.dailyChange > 0 ? (
                    <Badge variant="outline" className="bg-gain/10 text-gain border-gain">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      {portfolioSummary.dailyChangePercentage}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-loss/10 text-loss border-loss">
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                      {Math.abs(portfolioSummary.dailyChangePercentage)}%
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Asset Allocation</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Stocks (68%)</span>
                    <span>$19,350.57</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  
                  <div className="flex justify-between text-xs">
                    <span>ETFs (22%)</span>
                    <span>$6,260.48</span>
                  </div>
                  <Progress value={22} className="h-2" />
                  
                  <div className="flex justify-between text-xs">
                    <span>Cash (10%)</span>
                    <span>$2,845.67</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recent Alerts</CardTitle>
            <CardDescription>Important updates from your watchlist</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex gap-3 items-start">
                <div className="rounded-full p-1.5 bg-card border border-border">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/portfolio" className="block">
          <div className="stock-card h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="rounded-full p-2 bg-primary/10">
                <PieChart className="w-5 h-5 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Manage your investments
            </p>
          </div>
        </Link>

        <Link to="/chart" className="block">
          <div className="stock-card h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="rounded-full p-2 bg-primary/10">
                <BarChart2 className="w-5 h-5 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Stock Charts</h3>
            <p className="text-sm text-muted-foreground">
              Analyze market trends
            </p>
          </div>
        </Link>

        <Link to="/history" className="block">
          <div className="stock-card h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="rounded-full p-2 bg-primary/10">
                <History className="w-5 h-5 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Order History</h3>
            <p className="text-sm text-muted-foreground">
              View your past transactions
            </p>
          </div>
        </Link>

        <Link to="/leaderboard" className="block">
          <div className="stock-card h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="rounded-full p-2 bg-primary/10">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">
              See top performing traders
            </p>
          </div>
        </Link>
      </div>

      {/* Market Overview & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Market Indices</CardTitle>
            <CardDescription>Current market performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketIndices.map((index) => (
                <div key={index.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-muted">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{index.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {index.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {index.change > 0 ? (
                      <div className="flex items-center gap-1 text-gain">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">+{index.change}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-loss">
                        <TrendingDown className="w-4 h-4" />
                        <span className="font-medium">
                          {index.change}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Top Performers</CardTitle>
            <CardDescription>Best performing stocks today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      {stock.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${stock.price}</p>
                    <p
                      className={
                        stock.change > 0 ? "text-xs text-gain" : "text-xs text-loss"
                      }
                    >
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  View More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

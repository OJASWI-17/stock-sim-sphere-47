
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUp,
  ArrowDown,
  Trophy,
  Medal,
  Award,
  Search,
  ChevronDown,
  ChevronUp,
  UserCircle2 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

// Generate mock leaderboard data
const generateLeaderboardData = () => {
  const usernames = [
    "TradeKing", "StockWhisperer", "InvestorPro", "MarketGuru", 
    "WallStreetWizard", "BullMarket", "AssetAllocator", "TrendTrader", 
    "DividendHunter", "SwingTrader", "GrowthInvestor", "ValueSeeker",
    "TechTrader", "ForexMaster", "CryptoKing", "DayTraderPro",
    "AlgoTrader", "FundManager", "RetailInvestor", "BogleHead"
  ];
  
  const users = [];
  
  for (let i = 0; i < 20; i++) {
    const initialBalance = 100000;
    const gainPercentage = Math.random() * 30 - 5; // -5% to +25%
    const gainValue = initialBalance * (gainPercentage / 100);
    const currentBalance = initialBalance + gainValue;
    
    users.push({
      id: i + 1,
      username: usernames[i],
      portfolioValue: currentBalance,
      gain: gainValue,
      gainPercentage: gainPercentage,
      trades: Math.floor(Math.random() * 50) + 10,
      winRate: Math.floor(Math.random() * 30) + 50, // 50% - 80%
      avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    });
  }
  
  // Sort by portfolio value (descending)
  return users.sort((a, b) => b.portfolioValue - a.portfolioValue);
};

const leaderboardData = generateLeaderboardData();

// Daily and weekly leaderboards will be a subset with different rankings
const dailyLeaderboard = [...leaderboardData]
  .sort((a, b) => b.gainPercentage - a.gainPercentage)
  .map((user, index) => ({ ...user, dailyRank: index + 1 }));

const weeklyLeaderboard = [...leaderboardData]
  .sort((a, b) => (b.trades * b.winRate) - (a.trades * a.winRate))
  .map((user, index) => ({ ...user, weeklyRank: index + 1 }));

const monthlyLeaderboard = [...leaderboardData]
  .sort((a, b) => b.portfolioValue - a.portfolioValue)
  .map((user, index) => ({ ...user, monthlyRank: index + 1 }));

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPeriod, setCurrentPeriod] = useState("overall");

  // Get current leaderboard based on selected period
  const getCurrentLeaderboard = () => {
    switch (currentPeriod) {
      case "daily":
        return dailyLeaderboard;
      case "weekly":
        return weeklyLeaderboard;
      case "monthly":
        return monthlyLeaderboard;
      default:
        return leaderboardData;
    }
  };

  const currentLeaderboard = getCurrentLeaderboard();

  // Filter users based on search
  const filteredUsers = currentLeaderboard.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users based on selected criteria
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "rank":
        aValue = currentPeriod === "daily" ? a.dailyRank : currentPeriod === "weekly" ? a.weeklyRank : currentPeriod === "monthly" ? a.monthlyRank : a.id;
        bValue = currentPeriod === "daily" ? b.dailyRank : currentPeriod === "weekly" ? b.weeklyRank : currentPeriod === "monthly" ? b.monthlyRank : b.id;
        break;
      case "username":
        aValue = a.username;
        bValue = b.username;
        break;
      case "portfolio":
        aValue = a.portfolioValue;
        bValue = b.portfolioValue;
        break;
      case "gain":
        aValue = a.gainPercentage;
        bValue = b.gainPercentage;
        break;
      case "trades":
        aValue = a.trades;
        bValue = b.trades;
        break;
      default:
        aValue = a.id;
        bValue = b.id;
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle sort change
  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Top 3 traders component
  const TopTraders = ({ traders }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Second Place */}
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              <Medal className="h-3 w-3 mr-1" />
              2nd
            </Badge>
          </div>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">{traders[1].username}</h3>
            <p className="text-2xl font-bold">
              ${traders[1].portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </p>
            <div className="mt-2">
              <Badge
                variant="outline"
                className={
                  traders[1].gainPercentage >= 0
                    ? "bg-gain/10 text-gain border-gain"
                    : "bg-loss/10 text-loss border-loss"
                }
              >
                {traders[1].gainPercentage >= 0 ? "+" : ""}
                {traders[1].gainPercentage.toFixed(2)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* First Place */}
        <Card className="relative border-primary shadow-md">
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              1st
            </Badge>
          </div>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                <UserCircle2 className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">{traders[0].username}</h3>
            <p className="text-3xl font-bold">
              ${traders[0].portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </p>
            <div className="mt-2">
              <Badge
                variant="outline"
                className={
                  traders[0].gainPercentage >= 0
                    ? "bg-gain/10 text-gain border-gain"
                    : "bg-loss/10 text-loss border-loss"
                }
              >
                {traders[0].gainPercentage >= 0 ? "+" : ""}
                {traders[0].gainPercentage.toFixed(2)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Third Place */}
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              <Award className="h-3 w-3 mr-1" />
              3rd
            </Badge>
          </div>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">{traders[2].username}</h3>
            <p className="text-2xl font-bold">
              ${traders[2].portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </p>
            <div className="mt-2">
              <Badge
                variant="outline"
                className={
                  traders[2].gainPercentage >= 0
                    ? "bg-gain/10 text-gain border-gain"
                    : "bg-loss/10 text-loss border-loss"
                }
              >
                {traders[2].gainPercentage >= 0 ? "+" : ""}
                {traders[2].gainPercentage.toFixed(2)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank against other traders
        </p>
      </div>

      <Tabs defaultValue="overall" onValueChange={setCurrentPeriod}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search traders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
        </div>

        <TabsContent value="overall" className="space-y-6">
          <TopTraders traders={leaderboardData.slice(0, 3)} />
          <LeaderboardTable
            users={sortedUsers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
            period="overall"
          />
        </TabsContent>

        <TabsContent value="daily" className="space-y-6">
          <TopTraders traders={dailyLeaderboard.slice(0, 3)} />
          <LeaderboardTable
            users={sortedUsers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
            period="daily"
          />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <TopTraders traders={weeklyLeaderboard.slice(0, 3)} />
          <LeaderboardTable
            users={sortedUsers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
            period="weekly"
          />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <TopTraders traders={monthlyLeaderboard.slice(0, 3)} />
          <LeaderboardTable
            users={sortedUsers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
            period="monthly"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Leaderboard table component
const LeaderboardTable = ({ users, sortBy, sortDirection, handleSort, period }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Traders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th
                    className="py-3 px-4 text-left font-medium cursor-pointer"
                    onClick={() => handleSort("rank")}
                  >
                    <div className="flex items-center">
                      Rank
                      {sortBy === "rank" && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-left font-medium cursor-pointer"
                    onClick={() => handleSort("username")}
                  >
                    <div className="flex items-center">
                      Trader
                      {sortBy === "username" && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-left font-medium cursor-pointer"
                    onClick={() => handleSort("portfolio")}
                  >
                    <div className="flex items-center">
                      Portfolio Value
                      {sortBy === "portfolio" && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-left font-medium cursor-pointer"
                    onClick={() => handleSort("gain")}
                  >
                    <div className="flex items-center">
                      Gain %
                      {sortBy === "gain" && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-left font-medium cursor-pointer"
                    onClick={() => handleSort("trades")}
                  >
                    <div className="flex items-center">
                      Trades
                      {sortBy === "trades" && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left font-medium">Win Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          {index + 1 <= 3 ? (
                            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                              {index + 1}
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                              {index + 1}
                            </div>
                          )}
                          <div>
                            {user.id < 5 ? (
                              <ArrowUp className="w-3 h-3 text-gain" />
                            ) : user.id > 15 ? (
                              <ArrowDown className="w-3 h-3 text-loss" />
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <UserCircle2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>{user.username}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        ${user.portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            user.gainPercentage >= 0
                              ? "bg-gain/10 text-gain border-gain"
                              : "bg-loss/10 text-loss border-loss"
                          }
                        >
                          {user.gainPercentage >= 0 ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          {user.gainPercentage >= 0 ? "+" : ""}
                          {user.gainPercentage.toFixed(2)}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.trades}</td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{user.winRate}%</span>
                          </div>
                          <Progress
                            value={user.winRate}
                            className="h-2"
                            indicatorClassName={
                              user.winRate >= 70
                                ? "bg-gain"
                                : user.winRate >= 60
                                ? "bg-primary"
                                : user.winRate >= 50
                                ? "bg-muted-foreground"
                                : "bg-loss"
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No traders found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;

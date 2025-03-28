
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownRight, ArrowUpRight, Search, CalendarRange } from "lucide-react";

// Mock order history data
const generateOrderHistory = () => {
  const types = ["buy", "sell"];
  const symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "V", "JNJ", "PG", "NVDA",
  ];
  const statuses = ["completed", "processing", "canceled"];
  const statusWeights = [0.8, 0.15, 0.05]; // 80% completed, 15% processing, 5% canceled
  
  const orders = [];
  
  // Generate orders for the past 30 days
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 8) + 9); // Market hours 9 AM - 4 PM
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(Math.floor(Math.random() * 60));
    
    const type = types[Math.floor(Math.random() * types.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const quantity = Math.floor(Math.random() * 20) + 1;
    const price = Math.floor(Math.random() * 900) + 100;
    
    // Determine status based on weights
    let status;
    const rand = Math.random();
    let cumulativeWeight = 0;
    for (let j = 0; j < statuses.length; j++) {
      cumulativeWeight += statusWeights[j];
      if (rand <= cumulativeWeight) {
        status = statuses[j];
        break;
      }
    }
    
    orders.push({
      id: `ORD-${1000 + i}`,
      type,
      symbol,
      quantity,
      price,
      total: quantity * price,
      status,
      date: date,
      timestamp: date.toISOString(),
    });
  }
  
  // Sort by date (newest first)
  return orders.sort((a, b) => b.date - a.date);
};

const orderHistory = generateOrderHistory();

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Apply filters
  const filteredOrders = orderHistory.filter((order) => {
    const matchesSearch = 
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.type === typeFilter;
    
    let matchesDate = true;
    if (dateFilter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      matchesDate = order.date >= today;
    } else if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = order.date >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = order.date >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  
  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Handle filters
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  
  const handleTypeFilter = (value) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };
  
  const handleDateFilter = (value) => {
    setDateFilter(value);
    setCurrentPage(1);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground">
          Track all your trading activity
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Tabs defaultValue="all" className="w-auto">
                <TabsList>
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setTypeFilter("all")}
                    className={typeFilter === "all" ? "bg-primary text-primary-foreground" : ""}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="buy" 
                    onClick={() => setTypeFilter("buy")}
                    className={typeFilter === "buy" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Buy
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sell" 
                    onClick={() => setTypeFilter("sell")}
                    className={typeFilter === "sell" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Sell
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by symbol or order ID..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateFilter} onValueChange={handleDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium">Order ID</th>
                    <th className="py-3 px-4 text-left font-medium">Date & Time</th>
                    <th className="py-3 px-4 text-left font-medium">Symbol</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-left font-medium">Quantity</th>
                    <th className="py-3 px-4 text-left font-medium">Price</th>
                    <th className="py-3 px-4 text-left font-medium">Total</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formatDate(order.date)}
                          </div>
                        </td>
                        <td className="py-3 px-4">{order.symbol}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              order.type === "buy"
                                ? "bg-gain/10 text-gain border-gain"
                                : "bg-loss/10 text-loss border-loss"
                            }
                          >
                            {order.type === "buy" ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {order.type.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{order.quantity}</td>
                        <td className="py-3 px-4">${order.price.toFixed(2)}</td>
                        <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              order.status === "completed"
                                ? "bg-gain/10 text-gain border-gain"
                                : order.status === "processing"
                                ? "bg-primary/10 text-primary border-primary"
                                : "bg-loss/10 text-loss border-loss"
                            }
                          >
                            {order.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-muted-foreground">
                        No orders found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;

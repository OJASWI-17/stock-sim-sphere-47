
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <div className="h-8 w-8 rounded-full bg-primary animate-pulse-glow flex items-center justify-center">
            <span className="text-primary-foreground font-bold">SS</span>
          </div>
          <span className="text-xl font-bold tracking-tight">StockSim</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/dashboard"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/dashboard") ? "text-primary font-medium" : "text-foreground/70"
            )}
          >
            Dashboard
          </Link>
          <Link
            to="/portfolio"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/portfolio") ? "text-primary font-medium" : "text-foreground/70"
            )}
          >
            Portfolio
          </Link>
          <Link
            to="/chart"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/chart") ? "text-primary font-medium" : "text-foreground/70"
            )}
          >
            Chart
          </Link>
          <Link
            to="/history"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/history") ? "text-primary font-medium" : "text-foreground/70"
            )}
          >
            History
          </Link>
          <Link
            to="/leaderboard"
            className={cn(
              "transition-colors hover:text-primary",
              isActive("/leaderboard") ? "text-primary font-medium" : "text-foreground/70"
            )}
          >
            Leaderboard
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="rounded-full pl-8 bg-background w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-foreground/70">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-foreground/70">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></span>
          </Button>
          
          <Button className="rounded-full h-8 w-8 p-0" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

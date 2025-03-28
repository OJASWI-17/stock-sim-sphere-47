
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, PieChart, History, Trophy, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border md:hidden">
      <div className="grid h-full grid-cols-5">
        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center"
        >
          <Home
            className={`h-6 w-6 ${
              isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </span>
        </Link>
        
        <Link
          to="/portfolio"
          className="flex flex-col items-center justify-center"
        >
          <PieChart
            className={`h-6 w-6 ${
              isActive("/portfolio") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              isActive("/portfolio") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Portfolio
          </span>
        </Link>
        
        <Link
          to="/chart"
          className="flex flex-col items-center justify-center"
        >
          <BarChart2
            className={`h-6 w-6 ${
              isActive("/chart") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              isActive("/chart") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Chart
          </span>
        </Link>
        
        <Link
          to="/history"
          className="flex flex-col items-center justify-center"
        >
          <History
            className={`h-6 w-6 ${
              isActive("/history") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              isActive("/history") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            History
          </span>
        </Link>
        
        <Link
          to="/leaderboard"
          className="flex flex-col items-center justify-center"
        >
          <Trophy
            className={`h-6 w-6 ${
              isActive("/leaderboard") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              isActive("/leaderboard") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Leaders
          </span>
        </Link>
      </div>
    </div>
  );
}

export function MobileMenuButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary animate-pulse-glow flex items-center justify-center">
              <span className="text-primary-foreground font-bold">SS</span>
            </div>
            <span>StockSim</span>
          </SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/portfolio"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent"
            >
              <PieChart className="h-4 w-4" />
              Portfolio
            </Link>
            <Link
              to="/chart"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent"
            >
              <BarChart2 className="h-4 w-4" />
              Chart
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent"
            >
              <History className="h-4 w-4" />
              History
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

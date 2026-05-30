import React from "react";
import { Button } from "./button";
import { Plus } from "lucide-react";

const UserDashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-serif font-bold text-slate-900">
        User Management
      </h1>
      <Button className="bg-[#0B4632] hover:bg-[#083525] text-white font-medium rounded-md px-4 py-2 gap-1">
        <Plus className="h-4 w-4" /> Add User
      </Button>
    </div>
  );
};

export default UserDashboardHeader;

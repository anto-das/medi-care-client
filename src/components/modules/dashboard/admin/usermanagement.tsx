"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  getTotalUsers,
  updateUserRole,
  updateUserStatus,
} from "@/app/actions/admin.action";
import { Roles } from "@/constants/Roles";
import UserNotFound from "@/components/ui/UserNotFound";
import UserDashboardHeader from "@/components/ui/UserDashboardHeader";
import { toast } from "sonner";
import { UserStatus } from "@/types";

type FilterTab = "All" | "Customers" | "Sellers" | "Banned";

export default function UserManagement() {
  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const fetchData = async () => {
    const { data } = await getTotalUsers();
    return data;
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setData(data);
    })();
  }, []);

  // অ্যাকশন হ্যান্ডলার (Status পরিবর্তনের জন্য)
  const filteredUsers = data?.filter(
    (user: any) => user.role === Roles.CUSTOMER || user.role === Roles.SELLER,
  );
  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    const toastId = toast.loading("changing the user status....");
    try {
      const updatedData = await updateUserStatus(newStatus, userId);
      // console.log("updated: ", updatedData.data.success);
      if (updatedData.data.success) {
        toast.success("Changed successfully..", { id: toastId });
        const users = await fetchData();
        setData(users);
        return;
      }
      toast.error("something went wrong updating user status ", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error("changing user status was wrong", { id: toastId });
    }
  };

  // কাস্টম ফিল্টার এবং সার্চ লজিক (TanStack ছাড়া)
  const filteredData = useMemo(() => {
    return filteredUsers?.filter((user: any) => {
      // ১. ট্যাব ফিল্টারিং
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Customers" && user.role === Roles.CUSTOMER) ||
        (activeTab === "Sellers" && user.role === Roles.SELLER) ||
        (activeTab === "Banned" && user.status === "BANNED");

      // ২. সার্চবার ফিল্টারিং
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [data, activeTab, searchQuery]);

  const handleRoleChange = async (newRole: string, email: string) => {
    const toastId = toast.loading("changing the user role....");
    try {
      const { data: user } = await updateUserRole(newRole, email);
      if (user.success) {
        toast.success(user?.message, { id: toastId });
        const data = await fetchData();
        // console.log(data);
        setData(data);
      } else {
        toast.error(data.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error("changing user role was wrong", { id: toastId });
    }
  };
  return (
    <div className="w-full mx-auto p-6 bg-[#FAFAF9] min-h-screen">
      {/* হেডার সেকশন */}
      <UserDashboardHeader />

      {/* ফিল্টার এবং সার্চ বার */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* ট্যাব বাটন সমূহ */}
          <div className="flex flex-wrap gap-2">
            {(["All", "Customers", "Sellers", "Banned"] as FilterTab[]).map(
              (tab) => (
                <Button
                  key={tab}
                  variant="ghost"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-[#0B4632] text-white hover:bg-[#0B4632] hover:text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </Button>
              ),
            )}
          </div>

          {/* সার্চ ইনপুট */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-md focus-visible:ring-[#0B4632]"
            />
          </div>
        </div>

        {/* ডাটা টেবিল */}
        <div className="mt-6 overflow-hidden rounded-md border border-slate-100">
          <Table>
            <TableHeader className="bg-slate-50/70">
              <TableRow className="hover:bg-transparent border-b border-slate-100">
                <TableHead className="text-xs font-bold tracking-wider text-slate-400 h-11">
                  USER
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-slate-400 h-11">
                  ROLE
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-slate-400 h-11">
                  STATUS
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider text-slate-400 h-11">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((user: any) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-slate-50/50 border-b border-slate-100/80"
                  >
                    {/* User Column */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3 py-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border text-xs font-semibold text-slate-600 uppercase">
                          {user.avatarInitials || user.name.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-400 font-medium">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role Column */}
                    <TableCell className="py-3">
                      {user.role === Roles.CUSTOMER ? (
                        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none rounded-full px-3 py-1 font-medium text-xs">
                          {user.role}
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-50 border-none rounded-full px-3 py-1 font-medium text-xs">
                          {user.role}
                        </Badge>
                      )}
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="py-3">
                      {user.status === "ACTIVE" ? (
                        <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none rounded-full px-3 py-1 font-medium text-xs">
                          {user.status.toUpperCase()}
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-50 border-none rounded-full px-3 py-1 font-medium text-xs">
                          {user.status}
                        </Badge>
                      )}
                    </TableCell>

                    {/* Actions Column */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        {user.role === Roles.CUSTOMER ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 border-slate-200 text-slate-700 font-medium"
                            onClick={() =>
                              handleRoleChange(Roles.SELLER, user.email)
                            }
                          >
                            Switch to Seller
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 border-slate-200 text-slate-700 font-medium"
                            onClick={() =>
                              handleRoleChange(Roles.CUSTOMER, user.email)
                            }
                          >
                            Switch to Customer
                          </Button>
                        )}

                        {user.status === "SUSPENDED" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 bg-[#188662] hover:text-white hover:bg-[#1d9e73] text-white font-medium"
                            onClick={() =>
                              handleStatusChange(user.id, "ACTIVE")
                            }
                          >
                            Resume
                          </Button>
                        ) : user.status === "BANNED" ? (
                          <Button
                            size="sm"
                            className="h-9 px-4 bg-[#0B4632] hover:bg-[#083525] text-white font-medium"
                            onClick={() =>
                              handleStatusChange(user.id, "ACTIVE")
                            }
                          >
                            Unban
                          </Button>
                        ) : user.role === Roles.SELLER ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 font-medium"
                            onClick={() =>
                              handleStatusChange(user.id, "SUSPENDED")
                            }
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 font-medium"
                            onClick={() =>
                              handleStatusChange(user.id, "BANNED")
                            }
                          >
                            Ban
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <UserNotFound />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

//   {user.status === "SUSPENDED" ? (
//   <Button
//     variant="outline"
//     size="sm"
//     className="h-9 px-4 bg-[#188662] hover:text-white hover:bg-[#1d9e73] text-white font-medium"
//     onClick={() =>
//       handleStatusChange(user.id, "ACTIVE")
//     }
//   >
//     Resume
//   </Button>
// ) : (
//   <Button
//     size="sm"
//     className="h-9 px-4 bg-[#188662] hover:text-white hover:bg-[#1d9e73] text-white font-medium"
//     onClick={() =>
//       handleStatusChange(user.id, "ACTIVE")
//     }
//   >
//     Unban
//   </Button>
// )}

// user.status === "BANNED" ? (
//                           <Button
//                             size="sm"
//                             className="h-9 px-4 bg-[#0B4632] hover:bg-[#083525] text-white font-medium"
//                             onClick={() =>
//                               handleStatusChange(user.id, "ACTIVE")
//                             }
//                           >
//                             Unban
//                           </Button>
//                         ) : user.role === Roles.SELLER ? (
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="h-9 px-4 border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 font-medium"
//                             onClick={() =>
//                               handleStatusChange(user.id, "SUSPENDED")
//                             }
//                           >
//                             Suspend
//                           </Button>
//                         )

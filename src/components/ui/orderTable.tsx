import React from "react";
import { Card, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Badge } from "./badge";

const OrderTable = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
        <Button variant="ghost" className="font-semibold text-slate-500">
          View All
        </Button>
      </CardHeader>
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Order ID
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Customer
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Total
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Status
            </TableHead>
            <TableHead className="text-right font-bold text-slate-400 uppercase text-xs tracking-widest">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">#ORD-8821</TableCell>
            <TableCell className="font-semibold text-slate-600">
              Rahim Ahmed
            </TableCell>
            <TableCell className="font-bold">৳1,240</TableCell>
            <TableCell>
              <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-none px-3 py-1 font-bold">
                Processing
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                className="bg-[#0b5e4e] hover:bg-[#084a3d] px-6 font-bold shadow-md"
              >
                Confirm
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default OrderTable;

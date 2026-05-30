import React from "react";
import { TableCell, TableRow } from "./table";

const UserNotFound = () => {
  return (
    <TableRow>
      <TableCell colSpan={4} className="h-24 text-center text-slate-400">
        No users found.
      </TableCell>
    </TableRow>
  );
};

export default UserNotFound;

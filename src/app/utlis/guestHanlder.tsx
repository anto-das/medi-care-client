"use client";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
export function guestHandler() {
  useEffect(() => {
    const existingId = localStorage.getItem("guest_id");
    if (!existingId) {
      localStorage.setItem("guest_id", uuid());
    }
  }, []);
  return null;
}

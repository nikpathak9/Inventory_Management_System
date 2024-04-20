import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryTable from "./InventoryTable";
import InventoryStats from "./InventoryStats";
import { InventoryItem } from "../types/index";

const UserInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const response = await axios.get<InventoryItem[]>(
          "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
        );
        setInventory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{ display: "grid", rowGap: "3rem", gridTemplateRows: "1fr 3fr" }}
    >
      <InventoryStats inventory={inventory} />
      <InventoryTable inventory={inventory} />
    </div>
  );
};

export default UserInventory;

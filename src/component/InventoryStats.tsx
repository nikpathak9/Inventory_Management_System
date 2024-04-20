import { InventoryItem } from "../types/index";
import classes from "./Admin.module.css";

interface InventoryStatsProps {
  inventory: InventoryItem[];
}

const InventoryStats = ({ inventory }: InventoryStatsProps) => {
  const totalItems: number = inventory.length;
  const totalPrice: number = inventory.reduce((acc, item) => {
    const itemPrice =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("$", ""))
        : item.price;
    const itemQuantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + itemPrice * itemQuantity;
  }, 0);
  const outOfStockItems: number = inventory.filter(
    (item) => item.quantity === 0
  ).length;
  const numCategories: number = [
    ...new Set(inventory.map((item) => item.category)),
  ].length;

  return (
    <div className={classes.inventoryStats}>
      <p style={{ textAlign: "left", padding: "3rem " }}>
        Total Items <div>{totalItems}</div>
      </p>
      <p style={{ textAlign: "left", padding: "3rem " }}>
        Total Price <div>{totalPrice}</div>
      </p>
      <p style={{ textAlign: "left", padding: "3rem " }}>
        Out of Stock Items <div>{outOfStockItems}</div>
      </p>
      <p style={{ textAlign: "left", padding: "3rem " }}>
        Number of Categories <div>{numCategories}</div>
      </p>
    </div>
  );
};

export default InventoryStats;

import { InventoryItem } from "../types/index";
import classes from "./Admin.module.css";

interface InventoryTableProps {
  inventory: InventoryItem[];
  disabledItems: string[];
  isAdmin: boolean;
  onEdit: (item: InventoryItem) => void;
  onDelete: (itemName: string) => void;
  onDisable: (itemName: string) => void;
}

const InventoryTable = ({
  inventory,
  isAdmin,
  disabledItems,
  onEdit,
  onDelete,
  onDisable,
}: InventoryTableProps) => {
  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%" }}>
        <thead style={{ width: "100%" }}>
          <tr className={classes.inventoryTableHeader}>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Value</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.name} className={classes.inventoryTableHeader}>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.value}</td>
              {isAdmin && (
                <td>
                  <button
                    onClick={() => onEdit(item)}
                    disabled={disabledItems.includes(item.name)}
                  >
                    Edit
                  </button>
                  <button onClick={() => onDelete(item.name)}>Delete</button>
                  <button
                    disabled={item.isDisabled}
                    onClick={() => onDisable(item.name)}
                  >
                    Disable
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

import { useState, useEffect } from "react";
import axios from "axios";
import InventoryTable from "./InventoryTable";
import InventoryStats from "./InventoryStats";
import EditForm from "./EditForm";
import { InventoryItem } from "../types";

const API_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

const AdminInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isEditFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [disabledItems, setDisabledItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get<InventoryItem[]>(API_URL);
        setInventory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleEditItem = (item: InventoryItem) => {
    console.log("Editing item:", item); // Log to check if item is passed correctly
    setSelectedItem(item);
    setEditFormVisible(true);
  };

  const handleDeleteItem = async (itemName: string) => {
    try {
      await axios.delete(`${API_URL}/${itemName}`);
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.name !== itemName)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCloseEditForm = () => {
    setEditFormVisible(false);
  };

  const handleDisableItem = (itemName: string) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.name === itemName ? { ...item, isDisabled: true } : item
      )
    );
    setDisabledItems((prevDisabledItems) =>
      prevDisabledItems.includes(itemName)
        ? prevDisabledItems
        : [...prevDisabledItems, itemName]
    );
  };

  const handleSaveEditForm = async (editedItem: InventoryItem) => {
    try {
      await axios.put(`${API_URL}/${selectedItem?.name}`, editedItem);
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.name === editedItem.name ? editedItem : item
        )
      );
      handleCloseEditForm();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{ display: "grid", rowGap: "3rem", gridTemplateRows: "1fr 3fr" }}
    >
      <InventoryStats inventory={inventory} />
      <InventoryTable
        inventory={inventory}
        isAdmin
        disabledItems={disabledItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        onDisable={handleDisableItem}
      />
      {isEditFormVisible && (
        <EditForm
          item={selectedItem}
          onSave={handleSaveEditForm}
          onClose={handleCloseEditForm}
        />
      )}
    </div>
  );
};

export default AdminInventory;

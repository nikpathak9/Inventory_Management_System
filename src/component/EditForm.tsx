import React, { useState } from "react";
import { InventoryItem } from "../types";
import "./EditForm.css";

interface EditFormProps {
  item: InventoryItem;
  onSave: (editedItem: InventoryItem) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState<InventoryItem>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editedItem);
  };

  return (
    <div className="edit-form-container">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={editedItem.category}
          onChange={handleChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={editedItem.price}
          onChange={handleChange}
        />
        <label htmlFor="value">Value:</label>
        <input
          type="text"
          id="value"
          name="value"
          value={editedItem.value}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={editedItem.quantity}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;

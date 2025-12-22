// src/components/GenericTable.jsx
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from 'react-icons/fi';
import { useToast } from '../../components/ToastManager/ToastManager'
import './Table.css';


const Table = ({
  columns, // Array of column definitions: { key: 'name', title: 'Name', render: (value, row) => ..., minWidth: '200px' }
  data, // Array of data objects
  showCheckbox = true, // Optional: Show checkbox column
  showActions = true, // Optional: Show actions column with ...
  titleView,
  titleUpdate,
  titleDelete,
  onView, // Optional: (row) => ... handler for View
  viewPath,
  updatePath,
  onDelete, // Optional: (row) => ... handler for Delete
  idField = 'id' // FIX: Cho phép custom ID field (mặc định 'id')
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const { showToast } = useToast();


  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="generic-list">
      {/* Header */}
      <div className="generic-row header">
        {showCheckbox && <div className="cell checkbox"><input type="checkbox" /></div>}
        {columns.map((col, index) => (
          <div key={index} className={`cell ${col.key}`} style={{ minWidth: col.minWidth || '120px', flex: col.flex || 1 }}>
            {col.title} {col.sortable && <span className="sort-icon">↑</span>}
          </div>
        ))}
        {showActions && <div className="cell actions"></div>}
      </div>

      {/* Rows */}
      {data.map((row, rowIndex) => (
        <div className="generic-row" key={rowIndex}>
          {showCheckbox && <div className="cell checkbox"><input type="checkbox" /></div>}
          {columns.map((col, colIndex) => (
            <div key={colIndex} className={`cell ${col.key}`} style={{ minWidth: col.minWidth || '120px', flex: col.flex || 1 }}>
              {col.render ? col.render(row[col.key], row) : row[col.key]}
            </div>
          ))}
          {showActions && (
            <div className="cell actions">
              <div className="actions-menu-container">
                <FiMoreHorizontal className="more-icon" onClick={() => toggleMenu(rowIndex)} />
                {openMenuIndex === rowIndex && (
                  <div className="actions-dropdown">
                   {viewPath && (
                      <Link 
                        to={viewPath.replace(':id', row[idField])}
                        className="dropdown-item"
                        onClick={() => {
                          onView?.(row);
                          toggleMenu(rowIndex);
                        }}
                      >
                        {titleView}
                      </Link>
                    )}
                    
                    {updatePath && (
                      <Link
                        to={updatePath.replace(':id', row[idField])}
                        className="dropdown-item update"
                        onClick={() => toggleMenu(rowIndex)}
                      >
                        {titleUpdate}
                      </Link>
                    )}
                    {onDelete && (
                      <p className="dropdown-item delete" onClick={() => { 
                        onDelete(row); 
                        showToast("Xóa thành công!", "success"); 
                        toggleMenu(rowIndex); 
                      }}>
                        {titleDelete}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Table;
// src/components/GenericDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSliders } from 'react-icons/fi';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Button/Button';
import SearchBar from '../../components/SearchBar/SearchBar'
import './GenericDashboard.css';

const GenericDashboard = ({
  title = "Products List",
  subtitle = "Track your store's progress to boost your sales.",
  breadcrumbs = [{ label: "Home", path: "/" }, { label: "Product List" }],
  
  // Table props
  columns,
  data,
  showCheckbox = true,
  idField = 'product_id',
  
  // Actions
  onView,
  onDelete,
  addButtonPath = '/addproductpage', // Path để navigate khi click Add
  
  // Pagination
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 5,
  onPageChange,
  
  // Search & Filter
  onFilter,
}) => {
  const navigate = useNavigate();
 
  const handleAddClick = () => {
    navigate(addButtonPath);
  };

  return (
    <div className="generic-dashboard">
      {/* Page Header */}
      <div className="dashboard-page-header">
        <h1 className="page-title">{title}</h1>
        <div className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.path ? (
                <a href={crumb.path}>{crumb.label}</a>
              ) : (
                crumb.label
              )}
              {index < breadcrumbs.length - 1 && ' > '}
            </span>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="dashboard-card">
        {/* Card Header */}
        <div className="card-header">
          <div className="card-header-left">
            <h2 className="card-title">{title}</h2>
            <p className="card-subtitle">{subtitle}</p>
          </div>
          <div className="card-header-right">
            <Button 
              text="Add Product" 
              type="primary" 
              icon={<FiPlus />}
              onClick={handleAddClick}
            />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="search-filter-bar">
          <SearchBar />
          <Button 
            text="Filter" 
            type="secondary" 
            icon={<FiSliders />}
            onClick={onFilter}
            stye={{textAlign:'right'}}
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={data}
          showCheckbox={showCheckbox}
          showActions={true}
          onView={onView}
          onDelete={onDelete}
          idField={idField}
        />

        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            showInfo={true}
            pageRange={3}
          />
        )}
      </div>
    </div>
  );
};

export default GenericDashboard;
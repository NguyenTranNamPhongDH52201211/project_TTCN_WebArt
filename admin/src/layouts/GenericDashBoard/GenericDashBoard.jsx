// src/components/GenericDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSliders } from 'react-icons/fi';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Button/Button';
import SearchBar from '../../components/SearchBar/SearchBar';
import './GenericDashboard.css';

const GenericDashboard = ({
  /* ===== Page info ===== */
  title,
  subtitle,
  breadcrumbs = [],

  /* ===== Table ===== */
  columns,
  data = [],
  idField,
  
  showCheckbox = false,
  actions = {}, // { view, edit, delete, deactivate }
  titleView,
  titleUpdate,
  titleDelete,
  viewPath,
  updatePath,

  /* ===== Add button ===== */
  showAddButton = false,
  addButtonText = 'Add',
  addButtonPath,

  /* ===== Pagination ===== */
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,

  /* ===== Search & Filter ===== */
  searchPlaceholder = 'Search...',
  onSearch,
  onFilter,
}) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (addButtonPath) navigate(addButtonPath);
  };

  return (
    <div className="generic-dashboard">
      {/* ===== Page Header ===== */}
      <div className="dashboard-page-header">
        <h1 className="page-title">{title}</h1>

        {breadcrumbs.length > 0 && (
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
        )}
      </div>

      {/* ===== Content Card ===== */}
      <div className="dashboard-card">
        {/* ===== Card Header ===== */}
        <div className="card-header">
          <div className="card-header-left">
            <h2 className="card-title">{title}</h2>
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>

          {showAddButton && (
            <div className="card-header-right">
              <Button
                text={addButtonText}
                type="primary"
                icon={<FiPlus />}
                onClick={handleAddClick}
              />
            </div>
          )}
        </div>

        {/* ===== Search & Filter ===== */}
        {(onSearch || onFilter) && (
          <div className="search-filter-bar">
            {onSearch && (
              <SearchBar
                placeholder={searchPlaceholder}
                onSearch={onSearch}
              />
            )}

            {onFilter && (
              <Button
                text="Filter"
                type="secondary"
                icon={<FiSliders />}
                onClick={onFilter}
              />
            )}
          </div>
        )}

        {/* ===== Table ===== */}
        <Table
          columns={columns}
          data={data}
          idField={idField}
          showCheckbox={showCheckbox}
          actions={actions}
          titleView={titleView}
          titleUpdate={titleUpdate}
          titleDelete={titleDelete}
          viewPath={viewPath}
          updatePath={updatePath}
          onView={actions?.view}
          onDelete={actions?.delete || actions?.deactivate}
        />

        {/* ===== Pagination ===== */}
        {totalItems > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            showInfo
            pageRange={3}
          />
        )}
      </div>
    </div>
  );
};

export default GenericDashboard;

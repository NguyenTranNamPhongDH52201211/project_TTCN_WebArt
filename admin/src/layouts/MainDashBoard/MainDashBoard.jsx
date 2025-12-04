import React from 'react';
import './MainDashBoard.css'; 
import { FiUsers, FiPackage, FiChevronUp, FiChevronDown, FiBarChart2 } from 'react-icons/fi';

const MainDashBoard = ({
  stats = {
    customers: { number: '3,782', change: '11.01%', direction: 'up' },
    orders: { number: '5,359', change: '9.05%', direction: 'down' },
    target: { percentage: '75.55%', change: '+10%' },
  },
  sales = {
    title: 'Monthly Sales',
    bars: ['20%', '80%', '40%', '60%', '50%', '70%', '30%', '55%', '45%', '25%', '65%', '35%'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    message1: 'You sold $5287 today, it\'s higher than last month.',
    message2: 'Keep up your good work!',
    quickStats: [
      { title: 'Target', value: '$20', direction: 'down' },
      { title: 'Revenue', value: '$20', direction: 'up' },
      { title: 'Today', value: '$20', direction: 'up' },
    ],
  },
  statistics = {
    title: 'Statistics',
    description: 'Target you\'ve set for each month',
    tabs: ['Monthly', 'Quarterly', 'Annually'],
    activeTab: 'Monthly',
  },
}) => {
  return (
    <div className="dashboard">
      {/* Top stats row */}
      <div className="stats-row">
        {/* Customers card */}
        <div className="stat-card">
          <div className="icon-wrapper">
            <FiUsers className="stat-icon" />
          </div>
          <h4>Customers</h4>
          <div className="stat-value">
            <span className="number">{stats.customers.number}</span>
            <span className={`change ${stats.customers.direction}`}>
              {stats.customers.direction === 'up' ? <FiChevronUp /> : <FiChevronDown />}
              {stats.customers.change}
            </span>
          </div>
        </div>

        {/* Orders card */}
        <div className="stat-card">
          <div className="icon-wrapper">
            <FiPackage className="stat-icon" />
          </div>
          <h4>Orders</h4>
          <div className="stat-value">
            <span className="number">{stats.orders.number}</span>
            <span className={`change ${stats.orders.direction}`}>
              {stats.orders.direction === 'up' ? <FiChevronUp /> : <FiChevronDown />}
              {stats.orders.change}
            </span>
          </div>
        </div>

        {/* Monthly Target card */}
        <div className="target-card">
          <div className="target-header">
            <h4>Monthly Target</h4>
            <p>Target you've set for each month</p>
          </div>
          <div className="progress-circle">
            <div className="circle">
              <span className="percentage">{stats.target.percentage}</span>
              <span className="change up">{stats.target.change}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales section */}
      <div className="sales-section">
        {/* Monthly Sales chart */}
        <div className="sales-chart-card">
          <h4>{sales.title}</h4>
          <div className="bar-chart">
            {sales.bars.map((height, index) => (
              <div key={index} className="bar" style={{ height }}></div>
            ))}
          </div>
          <div className="chart-labels">
            {sales.labels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>

        {/* Sales message and quick stats */}
        <div className="sales-message-card">
          <p>{sales.message1}</p>
          <p>{sales.message2}</p>
          <div className="quick-stats">
            {sales.quickStats.map((stat, index) => (
              <div key={index} className="quick-stat">
                <h5>{stat.title}</h5>
                <span className={`value ${stat.direction}`}>
                  {stat.value} {stat.direction === 'up' ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics section */}
      <div className="statistics-card">
        <div className="statistics-header">
          <h4>{statistics.title}</h4>
          <p>{statistics.description}</p>
          <div className="tabs">
            {statistics.tabs.map((tab, index) => (
              <button key={index} className={`tab ${tab === statistics.activeTab ? 'active' : ''}`}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="line-chart">
          {/* Placeholder for line chart */}
          <FiBarChart2 className="chart-placeholder" />
        </div>
      </div>
    </div>
  );
};

export default MainDashBoard;
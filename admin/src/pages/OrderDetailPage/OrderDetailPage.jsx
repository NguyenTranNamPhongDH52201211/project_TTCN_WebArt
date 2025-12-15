import { useParams } from "react-router-dom";
import "./OrderDetailPage.css";

const MOCK_ORDER = {
  id: "34834",
  status: "Completed",
  dueDate: "25 August 2025",
  items: [
    { name: "Macbook Pro 13”", qty: 1, unit: 1200, discount: 0 },
    { name: "Apple Watch Ultra", qty: 1, unit: 300, discount: 50 },
    { name: "iPhone 15 Pro Max", qty: 2, unit: 800, discount: 0 },
    { name: "iPad Pro 3rd Gen", qty: 1, unit: 900, discount: 0 },
  ],
  customer: {
    name: "Mushafrof Chowdhury",
    email: "name@example.com",
    phone: "+123 456 7890",
    country: "United States",
    address: "62 Miles Drive St, Newark, NJ 07103, California",
  },
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  if (!orderId) return null;

  const order = MOCK_ORDER;

  const subTotal = order.items.reduce(
    (sum, i) => sum + i.qty * i.unit * (1 - i.discount / 100),
    0
  );
  const vat = subTotal * 0.1;
  const total = subTotal + vat;

  return (
    <div className="order-detail">
      {/* Header */}
      <div className="order-header">
        <div>
          <h1>Single Transaction</h1>
          <p className="breadcrumb">Home / Single Transaction</p>
        </div>
        <div className="actions">
          <button className="btn primary">View Receipt</button>
          <button className="btn">Refund</button>
        </div>
      </div>

      {/* Order info */}
      <div className="order-info">
        <span>Order ID: #{order.id}</span>
        <span className="status completed">{order.status}</span>
        <span className="due-date">Due date: {order.dueDate}</span>
      </div>

      {/* Content */}
      <div className="order-content">
        {/* Left */}
        <div className="order-table">
          <h2>Order Details</h2>
          <table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Qty</th>
                <th>Unit Cost</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.name}</td>
                  <td>{i.qty}</td>
                  <td>${i.unit}</td>
                  <td>{i.discount}%</td>
                  <td>${i.qty * i.unit * (1 - i.discount / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary">
            <p>Sub Total: <strong>${subTotal}</strong></p>
            <p>VAT (10%): <strong>${vat}</strong></p>
            <p className="total">Total: <strong>${total}</strong></p>
          </div>
        </div>

        {/* Right */}
        <div className="customer-box">
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Country:</strong> {order.customer.country}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

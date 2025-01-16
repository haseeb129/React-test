import { useEffect, useState } from "react";
import subdomainConfig from "./config/subdomainConfig";
import { getSubdomain } from "./utils/subdomain";

const App = () => {
  const subdomain = getSubdomain();

  useEffect(() => {
    const config = subdomainConfig[subdomain] || subdomainConfig.default;
    console.log("config", config);
    // Set favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = config.favicon || "/favicons/default-favicon.ico";
    }

    // Optional: Set the document title
    document.title = config.companyName || "OrderMade";
  }, [subdomain]);

  const config = subdomainConfig[subdomain] || subdomainConfig.default;

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Sort orders
  const sortedOrders = [...config.orders].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Paginate orders
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = sortedOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <header>
        <img
          src={config.logo}
          alt={`${config.companyName} logo`}
          style={{ maxWidth: "200px" }}
        />
        <h1>Welcome to {config.companyName}</h1>
      </header>
      <main>
        <table
          border="1"
          style={{
            margin: "20px auto",
            width: "80%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th onClick={() => handleSort("orderId")}>Order Id</th>
              <th onClick={() => handleSort("customerName")}>Customer Name</th>
              <th onClick={() => handleSort("amount")}>Amount</th>
              <th onClick={() => handleSort("status")}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {Array.from({
            length: Math.ceil(config.orders.length / ordersPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;

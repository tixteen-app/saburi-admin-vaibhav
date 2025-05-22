import React, { useEffect, useState } from "react";
import "../../adminCss/dashboard/adminDashboard.css";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Pie, Doughnut } from "react-chartjs-2";
import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";

Chart.register(Tooltip, Title, ArcElement, Legend);

function Admindasboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState({});

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-dashboard", "GET");
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch revenue details
  const getRevenueDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/revenu-info", "GET");
      setTotalRevenue(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Revenue chart data
  const revenueChartData = {
    labels: [
      "Total Orders",
      "Pending Revenue",
      "Delivered Revenue",
      "Canceled Revenue",
    ],
    datasets: [{
      data: [
        totalRevenue?.totalOrders || 0,
        totalRevenue?.totalPendingRevenue || 0,
        totalRevenue?.totalDeliveredRevenue || 0,
        totalRevenue?.totalCanceledRevenue || 0,
      ],
      backgroundColor: [
        "#FFD700", // Gold
        "#3A5F0B", // Dark tea green
        "#6B8E23", // Olive green
        "#C8A97E", // Tea brown
      ],
      borderColor: "#F5F5DC", // Beige
      borderWidth: 2,
    }]
  };

  // Order chart data
  const orderChartData = {
    labels: [
      "Pending",
      "Shipped",
      "Delivered",
      "Canceled",
      "Returned",
    ],
    datasets: [{
      data: [
        dashboardData?.totalPandingOrders || 0,
        dashboardData?.totalShippedOrders || 0,
        dashboardData?.totalDeliveredOrders || 0,
        dashboardData?.totalCanceledOrders || 0,
        dashboardData?.totalReturnedOrders || 0,
      ],
      backgroundColor: [
        "#FFD700", // Gold
        "#3A5F0B", // Dark tea green
        "#6B8E23", // Olive green
        "#C8A97E", // Tea brown
        "#2C3E1A", // Dark forest green
      ],
      borderColor: "#F5F5DC", // Beige
      borderWidth: 2,
    }]
  };

  useEffect(() => {
    getDashboardData();
    getRevenueDetails();
  }, []);

  return (
    <div className="dashboard-page">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="dashboard-title">Dashboard</h1>
          
          <div className="dashboard-container">
            {[
              { title: "Total Users", value: dashboardData?.totalUsers },
              { title: "Total Products", value: dashboardData?.totalProducts },
              { title: "Total Orders", value: dashboardData?.totalOrders },
              { title: "Pending Orders", value: dashboardData?.totalPandingOrders },
              { title: "Shipped Orders", value: dashboardData?.totalShippedOrders },
              { title: "Delivered Orders", value: dashboardData?.totalDeliveredOrders },
              { title: "Canceled Orders", value: dashboardData?.totalCanceledOrders },
              { title: "Returned Orders", value: dashboardData?.totalReturnedOrders },
            ].map((item, index) => (
              <div key={index} className="dashboard-card">
                <h2>{item.title}</h2>
                <p>{item.value || 0}</p>
              </div>
            ))}
          </div>

          {/* <div className="main_admin_all_graph_div">
            <div className="main_order_pie_chart_graph">
              <h2>Order Distribution</h2>
              <Pie 
                data={orderChartData} 
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: var(--dark-color),
                        font: {
                          family: var(--font-primary),
                        }
                      }
                    }
                  }
                }}
              />
            </div>

            <div className="main_order_pie_chart_graph">
              <h2>Revenue Breakdown</h2>
              <Doughnut 
                data={revenueChartData}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: var(--dark-color),
                        font: {
                          family: var(--font-primary),
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default Admindasboard;
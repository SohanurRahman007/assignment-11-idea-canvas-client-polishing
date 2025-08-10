import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import Loading from "../components/Loading/Loading";

// This is the main component for the All Subscribers dashboard page.
const AllSubscribe = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to safely extract a date from a subscriber object, handling different formats.
  const getDateFromSubscriber = (subscriber) => {
    // Check for the old nested format
    if (subscriber?.subscribedAt?.$date?.$numberLong) {
      return parseInt(subscriber.subscribedAt.$date.$numberLong, 10);
    }
    // Check for a simple date string or a number
    if (subscriber?.subscribedAt) {
      // Return the value directly if it's a number or a date string
      return subscriber.subscribedAt;
    }
    // If no valid date is found, return null
    return null;
  };

  // Fetch subscriber data from the backend when the component mounts.
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        // Assuming your backend has an endpoint to fetch all subscribers.
        const response = await axios.get(
          "https://b11a11-server-side-sohanpk24.vercel.app/newsletter_subscribers"
        );
        // Filter out any subscribers that don't have a valid date to prevent errors.
        const validSubscribers = response.data.filter(
          (subscriber) => getDateFromSubscriber(subscriber) !== null
        );
        setSubscribers(validSubscribers);
      } catch (err) {
        console.error("Failed to fetch subscribers:", err);
        setError(
          "Failed to load subscribers. Please check the network connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Process data for the bar chart.
  const chartData = subscribers.reduce((acc, subscriber) => {
    const country = subscriber.country || "Unknown";
    const existingCountry = acc.find((item) => item.country === country);
    if (existingCountry) {
      existingCountry.subscribers += 1;
    } else {
      acc.push({ country, subscribers: 1 });
    }
    return acc;
  }, []);

  // Conditional rendering for different states.
  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-center text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>All Subscribe | Idea Canvas</title>
      </Helmet>
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-orange-500" size={32} /> All Subscribers
        </h1>
        <p className="text-gray-600 max-w-2xl">
          A detailed overview of your newsletter audience, including subscriber
          information and a geographical distribution chart.
        </p>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">Subscribers by Country</h2>
        <p className="text-gray-500 text-sm mb-4">
          A breakdown of your newsletter audience by country.
        </p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="subscribers" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subscribers Table Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">Subscriber List</h2>
        <p className="text-gray-500 text-sm mb-4">
          All users who have subscribed to your newsletter.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Country
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subscribed At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map((subscriber) => {
                const dateValue = getDateFromSubscriber(subscriber);
                return (
                  <tr key={subscriber._id.$oid || subscriber._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscriber.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscriber.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscriber.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dateValue
                        ? format(new Date(dateValue), "MMMM dd, yyyy")
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSubscribe;

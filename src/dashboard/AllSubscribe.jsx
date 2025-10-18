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
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AllSubscribe = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDateFromSubscriber = (subscriber) => {
    if (subscriber?.subscribedAt?.$date?.$numberLong) {
      return parseInt(subscriber.subscribedAt.$date.$numberLong, 10);
    }
    if (subscriber?.subscribedAt) {
      return subscriber.subscribedAt;
    }
    return null;
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://b11a11-server-side-sohanpk24.vercel.app/newsletter_subscribers"
        );
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

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-center text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-base-100 min-h-screen">
      <Helmet>
        <title>All Subscribe | Idea Canvas</title>
      </Helmet>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500 flex items-center justify-center gap-3">
          <Users className="text-orange-500" size={32} />
          All Subscribers
        </h1>
        <p className="text-base-content mt-1.5 max-w-2xl mx-auto">
          A detailed overview of your newsletter audience, including subscriber
          information and a geographical distribution chart.
        </p>
      </motion.div>

      {/* Bar Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="card bg-base-100 shadow-sm border border-orange-200 p-6 transition-all duration-300 hover:shadow-sm"
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold text-orange-500">
            Subscribers by Country
          </h2>
          <p className="text-base-content text-sm mt-1">
            A breakdown of your newsletter audience by country.
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="country"
                className="text-sm"
                tick={{ fill: "currentColor" }}
              />
              <YAxis className="text-sm" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  border: "1px solid oklch(var(--b3))",
                  borderRadius: "8px",
                  color: "oklch(var(--bc))",
                }}
              />
              <Bar
                dataKey="subscribers"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Subscribers Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="card bg-base-100 shadow-sm border border-orange-200 p-6 transition-all duration-300 hover:shadow-sm"
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold text-orange-500">Subscriber List</h2>
          <p className="text-base-content text-sm mt-1">
            All users who have subscribed to your newsletter.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-orange-200">
            <thead className="bg-orange-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider"
                >
                  Country
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider"
                >
                  Subscribed At
                </th>
              </tr>
            </thead>
            <tbody className="bg-base-100 divide-y divide-orange-200">
              {subscribers.map((subscriber, index) => {
                const dateValue = getDateFromSubscriber(subscriber);
                return (
                  <motion.tr
                    key={subscriber._id.$oid || subscriber._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className=" transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content">
                      {subscriber.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content">
                      {subscriber.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content">
                      {subscriber.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content">
                      {dateValue
                        ? format(new Date(dateValue), "MMMM dd, yyyy")
                        : "N/A"}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4  rounded-lg border border-orange-200"
        >
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-orange-700">
                Total Subscribers:
              </span>
              <span className="text-base-content">{subscribers.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-orange-700">Countries:</span>
              <span className="text-base-content">{chartData.length}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllSubscribe;

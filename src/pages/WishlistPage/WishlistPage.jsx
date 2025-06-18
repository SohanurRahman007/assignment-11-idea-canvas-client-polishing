import axios from "axios";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Loading from "../../components/Loading/Loading";

const WishlistPage = () => {
  const { user, loading } = useContext(AuthContext);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://idea-canvas-server.vercel.app/wishlist?email=${user.email}`
        )
        .then((res) => setWishlist(res.data))
        .catch((err) => {
          console.log(err);
          toast.error("Failed to load wishlist");
        });
    }
  }, [user]);

  const handleRemove = useCallback(async (id) => {
    try {
      await axios.delete(
        `https://idea-canvas-server.vercel.app/wishlist/${id}`
      );
      toast.success("Removed from wishlist");
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove");
    }
  }, []);

  // Table columns configuration
  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "image",
        cell: (info) => (
          <img
            src={info.row.original.image}
            alt={info.row.original.title}
            className="w-20 h-16 object-cover rounded"
          />
        ),
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2">
            <Link
              to={`/blog/${info.row.original.blogId}`}
              className="px-3 py-1 bg-orange-500 text-white rounded"
            >
              Details
            </Link>
            <button
              onClick={() => handleRemove(info.row.original._id)}
              className="px-3 py-1 border border-orange-500 hover:bg-red-500 hover:text-white text-orange-500 rounded cursor-pointer"
            >
              Remove
            </button>
          </div>
        ),
      },
    ],
    [handleRemove]
  );

  const table = useReactTable({
    data: wishlist,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No wishlisted blogs yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-100 text-left">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

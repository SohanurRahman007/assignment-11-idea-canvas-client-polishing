import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Loading from "../../components/Loading/Loading";

const WishlistPage = () => {
  const { user, loading } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Fetch wishlist
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/wishlist?email=${user.email}`)
        .then((res) => {
          console.log("Wishlist response:", res.data); // 🔍 check structure
          setWishlist(res.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load wishlist");
        });
    }
  }, [user]);

  // ✅ Remove item with confirmation
  const handleRemove = useCallback(async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this blog from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/wishlist/${id}`);
        toast.success("Removed from wishlist");
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to remove");
      }
    }
  }, []);

  // ✅ Table Columns
  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "image",
        cell: (info) => (
          <img
            src={info.row.original.image}
            alt={info.row.original.title}
            className="w-24 h-16 object-cover rounded shadow-sm"
          />
        ),
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => (
          <p className="font-medium text-base-content">
            {info.row.original.title}
          </p>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => (
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
            {info.row.original.category}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: (info) => (
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/blog/${info.row.original.blogId}`}
              className="px-3 py-1 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md"
            >
              View
            </Link>
            <button
              onClick={() => handleRemove(info.row.original._id)}
              className="px-3 py-1 text-sm font-semibold border border-orange-500 text-orange-500 hover:bg-red-500 hover:text-white rounded-md transition"
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

  if (loading) return <Loading />;

  return (
    <div className="mx-auto  py-10">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-2">
        Your Wishlist
      </h2>
      <p className="text-center text-md max-w-3xl mx-auto text-base-content mb-6">
        This is your personalized list of saved blog posts. Easily revisit,
        manage, and explore your favorite content.
      </p>

      {wishlist.length === 0 ? (
        <p className="text-center text-base-content">
          No wishlisted blogs yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow-sm border border-orange-100 bg-base-100">
          <table className="min-w-full divide-y divide-orange-200 text-sm">
            <thead className="bg-base-100 text-orange-500 text-left">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3 text-sm font-semibold"
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
            <tbody className="divide-y divide-orange-100 text-base-content">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-orange-300 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
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

import React from "react";

const BlogsFilter = ({
  categories,
  category,
  setCategory,
  search,
  setSearch,
  setCurrentPage,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-end items-center mb-10 gap-6">
      <div className="w-full md:w-1/3">
        <label className="block mb-1 text-base font-medium text-base-content">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // Reset to page 1 on filter change
          }}
          className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-2/3">
        <label className="block mb-1 text-base font-medium text-base-content">
          Search by Title
        </label>
        <input
          type="text"
          placeholder="Search blog by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search change
          }}
          className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
        />
      </div>
    </div>
  );
};

export default BlogsFilter;

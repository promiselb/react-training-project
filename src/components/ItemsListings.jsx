import { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { selectItems, setPerPage } from '../features/items/itemsSlice'
import useItems from '../hooks/useItems'
import { fetchItems } from '../features/items/itemsThunks';
import { setPage } from "../features/items/itemsSlice"; 

import ItemListing from './ItemListing'
import Reloading from './Reloading'
import SearchBar from './SearchBar'

const ItemsListings = () => {
  // >> Items to be loaded
  // TODO: Use Redux state
  const dispatch = useDispatch();
  const { itemsArray, page, perPage, totalPages, loading,error } = useSelector(
    selectItems
  );
  console.log(itemsArray , page, perPage, totalPages, loading, error);

  // Fetch new data when page changes
  useEffect(() => {
    dispatch(fetchItems({ page, perPage }));
  }, [page, perPage, dispatch]);

  // $ Filter items based on search term
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange  = (term) => {
    console.log("Search Term:", term);
  }

  const handleDebouncedChange = (term) => {
    console.log("Debounced Search Term:", term);
    setSearchTerm(term);
  }

  if (loading) return <Reloading />
  if (error) return (<p>{error  }</p>)

  const filteredItems = searchTerm.length > 0 
  ? itemsArray.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) 
  : itemsArray;

  return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Available Gear</h1>
          <SearchBar 
          value={searchTerm} 
          delay={400} 
          placeholder={"Search gear..."}
          
          onChange={handleInputChange}
          onDebounce={handleDebouncedChange} 
          
          divStyle={"relative"}
          inputStyle={"w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"}
          spanStyle={"absolute right-3 top-2.5 text-gray-200"}
          spanText={"🔍"}
          />
          
        </div>
        

        {/* Items Grid */}
        { loading ? (
          <Reloading loading={loading} />
        ) : (
          <div className="flex flex-wrap -m-4">
            {filteredItems?.map((item) => (
              <ItemListing key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className={`px-4 py-2 rounded-lg shadow 
            ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
            className={`px-4 py-2 rounded-lg shadow 
            ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            Next
          </button>

          {/* <label className="ml-6 text-gray-700 font-medium">Items per page:</label>
          <input
            type="number"
            min="1"
            max={totalPages}
            // value={perPage}
            onChange={(e) => {setLimit(Number(e.target.value))}}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input> */}
      </div>
      </div>
    </div>
  )
}

export default ItemsListings
import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePaginatedQuery from '../hooks/usePaginatedQuery'
import ItemListing from '../components/ItemListing'
import Reloading from '../components/Reloading'
import SearchBar from '../components/SearchBar'


const PaginatedPage = () => {
    const dispatch = useDispatch();
    const {
        paginatedItemsArray,
        page,
        perPage,
        totalPages,
        loading,
        error,
        setPage,
        setPerPage
    } = usePaginatedQuery();
  
    // $ Filter items based on search term
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleInputChange  = (term) => {
      console.log("Search Term:", term);
    }
  
    const handleDebouncedChange = (term) => {
      console.log("Debounced Search Term:", term);
      setSearchTerm(term);
    }

    if (loading) return <Reloading loading={loading}/>
    if (error) return (<p>{error  }</p>)

    const filteredItems = searchTerm.length > 0 
    ? paginatedItemsArray.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) 
    : paginatedItemsArray;

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
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

          {/* I want to setPerPage with an input and a button */}
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min="1"
                    value={perPage}
                    onChange={(e) => dispatch(setPerPage(Number(e.target.value)))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">Items per page</span>
            </div>
        </div>

      </div>
    )
}

export default PaginatedPage
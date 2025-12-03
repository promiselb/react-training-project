import { useState, useEffect} from 'react'
import ItemListing from './ItemListing'
import Reloading from './Reloading'
import { fetchItems } from '../utils/fetchFunctions'
import SearchBar from './SearchBar'

const ItemsListings = () => {
  // >> Items to be loaded
  // TODO: Use Redux state
  const [items, setItems] = useState([])

  // $ Loading state
  const [loading, setLoading] = useState(true)

  // $ Filter items based on search term
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange  = (term) => {
    console.log("Search Term:", term);
  }

  const handleDebouncedChange = (term) => {
    console.log("Debounced Search Term:", term);
    setSearchTerm(term);
  }
  
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []); // 👈 Run once on mount

  const filteredItems = searchTerm.length > 0 
  ? items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) 
  : items;

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
          style={"border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"} />
        </div>
        

        {/* Items Grid */}
        { loading ? (
          <Reloading loading={loading} />
        ) : (
          <div className="flex flex-wrap -m-4">
            {filteredItems.map((item) => (
              <ItemListing key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemsListings


// const fetchItems = async() => {
    //   try {
    //     const res = await fetch('/api/items')
    //     const data = await res.json()
    //     setItems(data)
    //   } catch (err) {
    //     console.error('Error fetching items:', err)
    //   } finally {
    //     setLoading(false);
    //   } 
    // }
    // fetchItems();
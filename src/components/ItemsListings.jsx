import { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { selectItems } from '../features/items/itemsSlice'
import useItems from '../hooks/useItems'
import { fetchItems } from '../features/items/itemsThunks';

import ItemListing from './ItemListing'
import Reloading from './Reloading'
import Searchbar from './Searchbar'

const ItemsListings = () => {
  // >> Items to be loaded
  // TODO: Use Redux state
  const dispatch = useDispatch();
  const { itemsArray, loading, error } = useItems();

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
          <Searchbar 
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
      </div>
    </div>
  )
}

export default ItemsListings
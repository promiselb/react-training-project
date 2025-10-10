import React from 'react'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Reloading from '../components/Reloading'
import { useChangeTitle } from '../hooks/useChangeTitle'
import ItemListing from '../components/ItemListing'

const ItemPage = () => {
  const { id } = useParams();
  

  // >> Item to be loaded
  // TODO: Use Redux state
  const [item, setItem] = useState({})

  useChangeTitle(`Gear Rental - Item #${id} ${item.name}`);

  // $ Loading state
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const fetchItem = async() => {
      try {
        const res = await fetch(`/api/items/${id}`)
        const data = await res.json()
        setItem(data)
      } catch (err) {
        console.error(`Error fetching items id=${id}`, err)
      } finally {
        setLoading(false);
      } 
    }

    fetchItem();
  })

  return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Items Grid */}
        { loading ? (
          <Reloading loading={loading} />
        ) : (
          <div className="flex flex-wrap -m-4">
            <ItemListing key={item.id} item={item} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemPage

// // $ Filter items based on search term
// // const [searchTerm, setSearchTerm] = useState("");
// // {/* Search bar */}
// // <div className="flex justify-between items-center mb-6">
// //   <h1 className="text-3xl font-semibold text-gray-800">Available Gear</h1>
// //   <input
// //     type="text"
// //     placeholder="Search gear..."
// //     value={searchTerm}
// //     onChange={(e) => setSearchTerm(e.target.value)}
// //     className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //   />
// // </div>
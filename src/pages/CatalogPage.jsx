import React from 'react'
import { useState, useEffect} from 'react'
import { useChangeTitle } from '../hooks/useChangeTitle'
import ItemsListings from '../components/ItemsListings'

const CatalogPage = () => {
  useChangeTitle("Public - Catalog - Gear Rental");
  return (
    <ItemsListings />
  )
}

export default CatalogPage
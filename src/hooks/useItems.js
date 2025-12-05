import { selectItems } from '../features/items/itemsSlice';
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemsThunks";
import { useEffect } from "react";

const useItems = () => {
    const dispatch = useDispatch();
    const { itemsArray, loading, error } = useSelector(selectItems);
    console.log(itemsArray, loading, error);
  
    useEffect( () => {
        if (
            itemsArray.length === 0 && 
            !loading) {
            dispatch( fetchItems() );
        }
    }, [dispatch, itemsArray, loading])

    return { itemsArray, loading, error };
}

export default useItems
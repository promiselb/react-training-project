import { selectItems } from '../features/items/itemsSlice';
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemsThunks";
import { useEffect } from "react";

const useItems = () => {
    const dispatch = useDispatch();
    const { itemsArray , page, limit, totalPages, loading, error } = useSelector(selectItems);
    console.log(itemsArray , page, limit, totalPages, loading, error);
  
    useEffect( () => {
        if (
            itemsArray.length === 0 && 
            !loading) {
            dispatch( fetchItems({ page, limit }) );
        }
    }, [dispatch, itemsArray, loading, page, limit])

    return { itemsArray , page, limit, totalPages, loading, error };
}

export default useItems
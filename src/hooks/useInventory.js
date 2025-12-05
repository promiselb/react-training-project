import { useDispatch, useSelector } from "react-redux";
import { selectInventory } from "../features/inventory/inventorySlice";
import { fetchItems } from "../features/inventory/inventoryThunks";
import { useEffect } from "react";

export const useInventory = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(selectInventory);

   useEffect(() => {
        if (items.length === 0 && !loading) {
            dispatch(fetchItems());
        }
    }, [dispatch, items.length, loading]);

    return { items, loading, error };
}

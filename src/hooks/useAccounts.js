import { useDispatch, useSelector } from "react-redux";
import { selectAccounts } from "../features/accounts/accountsSlice";
import { fetchAccounts } from "../features/accounts/accountsThunks";
import { useEffect } from "react"; 

export const useAccounts = () => {
    const dispatch = useDispatch();
    const { accountsArray, loading, error } = useSelector(selectAccounts) || {};
    
    useEffect(() => {
        if (accountsArray.length === 0 && !loading) {
            dispatch(fetchAccounts());
        }
    }, [dispatch, accountsArray.length, loading]);
    return { accountsArray, loading, error };
}
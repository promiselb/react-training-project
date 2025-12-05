import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setPerPage,
  selectPaginatedItems,
} from "../features/paginatedItems/paginatedItemsSlice";

import { fetchPaginatedItems } from "../features/paginatedItems/paginatedItemsThunks";

export default function usePaginatedQuery() {
  const dispatch = useDispatch();
  const state = useSelector(selectPaginatedItems);

  // fetch whenever page or limit changes
  useEffect(() => {
    dispatch(fetchPaginatedItems({ page: state.page, perPage: state.perPage }));
  }, [state.page, state.limit, dispatch]);

  return {
    ...state,
    setPage: (p) => dispatch(setPage(p)),
    setPerPage: (l) => dispatch(setPerPage(l)),
  };
}

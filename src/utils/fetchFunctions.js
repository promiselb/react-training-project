const fetchItems = async () => {
  try {
    const res = await fetch('/api/items');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching items:', err);
    throw err;
  } 
};

const fetchAccounts = async () => {
  try {
    const res = await fetch('/api/accounts');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching accounts:', err);
    throw err;
  } 
};

const fetchBookings = async () => {
  try {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching bookings:', err);
    throw err;
  } 
};

export { fetchItems, fetchBookings };
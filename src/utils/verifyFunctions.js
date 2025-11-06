function verifyBookingsInput(formData) {
  // Basic verification: check required fields are present and valid
  //   if (
  //   !formData.accountId ||
  //   !formData.array_itemsIds ||
  //   !formData.payment_method ||
  //   !formData.start_date ||
  //   !formData.end_date ||
  //   !formData.status ||
  //   !formData.total
  // ) {
  //   return false;
  // }
  return true;
}

function verifyItemsInput(formData) { 
    return true;
}


export { verifyBookingsInput, verifyItemsInput };
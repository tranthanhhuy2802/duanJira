export const luuXuongLocal = (ten, data) => {
  const newData = JSON.stringify(data);
  localStorage.setItem(ten, newData);
};
export const getDuLieuLocal = (ten) => {
  const value = localStorage.getItem(ten);
  // khi parse xong có 2 th xảy ra một là có dữ liêu, hai là null không có dữ liêu
  if (JSON.parse(value)) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
export const deleteLocal = (ten) => {
  localStorage.removeItem(ten);
};

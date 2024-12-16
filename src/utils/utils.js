export const formatDate = (date) => {
  const newDate = new Date(date);
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

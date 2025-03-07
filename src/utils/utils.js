export const formatDate = (date) => {
  const newDate = new Date(date);
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const postedYear = newDate.getFullYear();
  const formattedDate = `${day}/${month}/${postedYear}`;

  return formattedDate;
};

export const formatCardDate = (date) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const newDate = new Date(date);
  const day = newDate.getDate();
  const postedMonth = newDate.getMonth() + 1;
  const postedYear = newDate.getFullYear();

  if (currentYear - postedYear > 0) {
    return `${currentYear - postedYear} yr. ago`;
  }

  if (currentYear === postedYear) {
    if (currentMonth - postedMonth > 0) {
      return `${currentMonth - postedMonth} mo. ago`;
    }
    if (currentMonth === postedMonth && currentDay > day) {
      if (currentDay - day > 1) {
        return `${currentDay - day} days ago`;
      } else {
        return `${currentDay - day} day ago`;
      }
    } else {
      return "posted today";
    }
  }
};

export const capitaliseTitle = (title) => {
  return title[0].toUpperCase() + title.slice(1);
};

export const validTopicList = ["coding", "football", "cooking"];
export const isValidTopic = (topicValue) => {
  return validTopicList.includes(topicValue);
};

export const isImgUrl = (url) => {
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      url
    )
  ) {
    return true;
  } else {
    return false;
  }
};

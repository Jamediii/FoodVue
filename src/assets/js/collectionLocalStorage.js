//将数据保存到本地
export const collectionLS = {
  collection(detailsId) {
    if (localStorage) {
      var detailsIds = "";
      var len = localStorage.getItem("detailsIds");
      if (!len) {
        localStorage.setItem('detailsIds', detailsId);
      } else {
        detailsIds += localStorage.getItem("detailsIds") + "," + detailsId;
        localStorage.setItem('detailsIds', detailsIds);
      }

    }
  }
};

//将数据保存到本地
export const collectionLS = {
  collection(detailsId) {
    if (localStorage) {
      let detailsIds = [];
      let userId = localStorage.getItem('userId');
      let len = JSON.parse(localStorage.getItem("detailsIds")); // 数组
      if (len.length === 0) {
        detailsIds.push({userId,collect:[detailsId]});
        localStorage.setItem('detailsIds', JSON.stringify(detailsIds));
      } else {
        for(let i = 0; i < len.length; i++) {
          if (len[i].userId === userId) {
            len[i].collect.push(detailsId);
          }else {
            detailsIds.push({userId,collect:[detailsId]});
          }
        }
        localStorage.setItem('detailsIds', JSON.stringify(detailsIds));
      }
    }
  }
};

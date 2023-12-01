const {default: FeedItem } = require("./FeedItem");

const FeedContent = (props) => {
  /* TODO : 아이템 가져오는 부분은 계속 추가로*/
    const item = [{sqno : 1,
      title : "test",
      cont : "content",
      like : 11231231230
    },
    {sqno : 2,
      title : "test2",
      cont : "content",
      like : 140
    },
    {sqno : 3,
      title : "test3",
      cont : "content",
      like : 11110
    },
  ];
    let size =  item.length;
    let elements = [];
    if (size > 0) {
      for (let i = 0; i <size; i++) {
          elements.push(
              <FeedItem content={item[i]} key={item[i].sqno}/>
          )
      }
      return elements;
    }
  };
  
  export default FeedContent;
  
const {default: Postitem } = require("./PostItem");

const PostContent = (props) => {
    let size =  props.content.length;
    let elements = [];
    if (size > 0) {
      for (let i = 0; i <size; i++) {
          const item = props.content[i];
          elements.push(
              <Postitem content={item} key={item.sqno}/>
          )
      }
      return elements;
    }
  };
  
  export default PostContent;
  
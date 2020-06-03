function computeId(props: IIterable<any>) {
  const _id = 
    (props && props._id ? props._id : '') + 
    (props && props.key ? props.key : '');
  
  return _id;
}

export default computeId;
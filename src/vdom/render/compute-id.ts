function computeId(props: IIterable<any>) {
  const id = 
    (props && props.id ? props.id : '') + 
    (props && props.key ? props.key : '');
  
  return id;
}

export default computeId;
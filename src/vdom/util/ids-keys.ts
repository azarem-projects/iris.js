function extractKeyIdPair(props: IIterable<any> | undefined | null) {
  const _id = props && props._id ? props._id.toString() : '0';
  const key = props && props.key ? props.key.toString() : '0';
  const parent = props && props.parent ? props.parent : { _id: '0', key: '0' };

  return { _id, key, parent }
}

export default extractKeyIdPair;

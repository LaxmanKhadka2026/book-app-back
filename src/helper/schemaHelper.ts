// map _id to id
export function mapToId(doc, ret, _options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

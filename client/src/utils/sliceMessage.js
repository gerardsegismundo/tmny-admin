const sliceMessage = body => {
  return body.length > 50 ? body.slice(0, 50) + '...' : body
}

export default sliceMessage

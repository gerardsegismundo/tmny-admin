//  Get post details
//  Remove push to hashtags and imagefile
//  Convert to json
const getPostDetailsJSON = postData => {
  let postDetails = { ...postData }
  delete postDetails.pushtoHashtags
  delete postDetails.imgFile
  delete postDetails.imgURL

  return JSON.stringify(postDetails)
}

export default getPostDetailsJSON

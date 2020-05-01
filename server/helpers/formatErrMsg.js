const formatErrMsg = errorMsg => {
  const noQuoteMsg = errorMsg.replace(/"/gi, '')

  return noQuoteMsg.charAt(0).toUpperCase() + noQuoteMsg.substring(1) + '.'
}

module.exports = formatErrMsg

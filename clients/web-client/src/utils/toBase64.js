const _toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export async function toBase64(file) {
  const result = await _toBase64(file).catch((e) => Error(e))
  if (result instanceof Error) {
    console.log('Error: ', result.message)
    return
  }
  return result
}

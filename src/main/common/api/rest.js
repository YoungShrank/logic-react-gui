// rest api, 使用fetch

const get = (url) => {
  return fetch(url).then(res => res.json())
}

const post = async (url, data) => {
  const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}
export { get, post }
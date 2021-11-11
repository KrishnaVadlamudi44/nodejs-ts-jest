import fetch from 'node-fetch'
import AbortController from 'abort-controller'

export const GetData = async (): Promise<{ [key: string]: string | number } | undefined> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, 1000)

  try {
    const response = await fetch('https://api.spacexdata.com/v4/launches/latest', {
      signal: controller.signal,
    })
    return response.json()
  } catch (error) {
    return {
      status: 500,
      message: 'request was aborted',
    }
  } finally {
    clearTimeout(timeout)
  }
}

// GetData()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))

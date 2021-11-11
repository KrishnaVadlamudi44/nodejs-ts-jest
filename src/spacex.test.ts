import fetch from 'node-fetch'
import { GetData } from './spacex'

jest.mock('node-fetch')

const mockedResponse: any = {
  name: 'Inspiration4',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const mockedFetch: jest.Mock = fetch as any

describe('spacex tests', () => {
  beforeAll(() => {
    mockedFetch.mockResolvedValue({
      json: () => {
        return mockedResponse
      },
    })
  })

  it('returns name succesfully', async () => {
    const actual: any = await GetData()
    expect(actual.name).toBe('Inspiration4')
  })

  it('returns status success', async () => {
    const actual: any = await GetData()
    expect(actual.status).toBe(200)
  })

  it('returns statustext ok', async () => {
    const actual: any = await GetData()
    expect(actual.statusText).toBe('OK')
  })
})

describe('Fail on timout', () => {
  beforeAll(() => {
    mockedFetch.mockRejectedValue(new Error('time out error'))
  })

  it('return status 500 on error', async () => {
    const actual: any = await GetData()
    expect(actual.status).toBe(500)
    expect(actual.message).toBe('request was aborte')
  })
})

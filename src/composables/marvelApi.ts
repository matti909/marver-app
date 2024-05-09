import md5 from 'md5'
import type { Comics } from '@/types'

export const useComics = async (): Promise<Comics> => {
  const publicKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC
  const privateKey = import.meta.env.VITE_APP_MARVEL_API_SECRET
  const ts = new Date().getTime().toString()
  const hash = md5(ts + privateKey + publicKey)

  const MARVEL_API = 'http://gateway.marvel.com/v1/public'
  const queryParams = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: hash
  })

  const requestURI = `${MARVEL_API}/comics?${queryParams.toString()}`

  const res = await fetch(requestURI)
  const jsonRes = await res.json()

  return jsonRes.data
}

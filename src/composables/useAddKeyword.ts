import { storageDemo } from '~/logic/storage'

export const useAddKeyword = () => {
  const addKeyword = (keyword: string) => {
    const _keyword = keyword.trim()
    if (!_keyword)
      return

    const keywords = _keyword.split('\n').filter(k => !storageDemo.value.keywords.includes(k.trim()))
    storageDemo.value.keywords.push(...keywords)
  }

  return { addKeyword }
}

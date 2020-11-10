export default interface Category {
  id: number
  name: string
  items: Array<{
    id: number
    name: string
    description: string
    imgUrl: string
    thumbnailUrl: string
  }>
}

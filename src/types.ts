export interface Genre {
  id: string | number
  name: string
}

export interface Book {
  id: string | number
  title: string
  author: string
  genre?: Genre | null
  publishedAt?: string | null
  description?: string | null
  isbn?: string | null
  totalCopies?: number | null
  sourceUrl?: string | null
}

export type BookSortField = 'title' | 'author'

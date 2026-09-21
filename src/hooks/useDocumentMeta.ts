import { useEffect } from 'react'
import { site } from '../data/site'

/**
 * Keeps the document title and description in sync with the current route.
 * Static metadata for crawlers is generated at build time; this covers in-app navigation.
 */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousTitle = document.title
    const previousDescription = descriptionTag?.content

    document.title = title ?? site.title
    if (descriptionTag) descriptionTag.content = description ?? site.description

    return () => {
      document.title = previousTitle
      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.content = previousDescription
      }
    }
  }, [title, description])
}

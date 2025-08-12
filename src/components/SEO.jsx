import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData = null 
}) => {
  const defaultTitle = 'Dubai Golden Residency - Expert UAE Visa Services | Apply Online'
  const defaultDescription = 'Get your Dubai Golden Residency visa with expert guidance. 10-year residency, retirement visa, property evaluation & dependent visas. Apply online today!'
  const defaultKeywords = 'Dubai Golden Residency, UAE Golden Visa, Dubai visa services, UAE residency, Dubai immigration, Golden Visa Dubai, UAE visa application, Dubai long-term residency, UAE investment visa, Dubai property visa'
  const defaultImage = 'https://uaegoldenvisa.com/og-image.jpg'
  const defaultUrl = 'https://uaegoldenvisa.com'

  const finalTitle = title ? `${title} | Dubai Golden Residency` : defaultTitle
  const finalDescription = description || defaultDescription
  const finalKeywords = keywords || defaultKeywords
  const finalImage = image || defaultImage
  const finalUrl = url || defaultUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Dubai Golden Residency Services" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO 
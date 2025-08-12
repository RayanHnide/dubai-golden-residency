/**
 * SEO Validation Utility
 * Helps validate SEO implementation and check for common issues
 */

export const validateSEO = () => {
  const issues = []
  const warnings = []
  const recommendations = []

  // Check for essential meta tags
  const title = document.title
  const description = document.querySelector('meta[name="description"]')?.content
  const keywords = document.querySelector('meta[name="keywords"]')?.content
  const canonical = document.querySelector('link[rel="canonical"]')?.href

  // Title validation
  if (!title) {
    issues.push('Missing page title')
  } else if (title.length > 60) {
    warnings.push('Title is too long (should be under 60 characters)')
  } else if (title.length < 30) {
    warnings.push('Title is too short (should be at least 30 characters)')
  }

  // Description validation
  if (!description) {
    issues.push('Missing meta description')
  } else if (description.length > 160) {
    warnings.push('Meta description is too long (should be under 160 characters)')
  } else if (description.length < 50) {
    warnings.push('Meta description is too short (should be at least 50 characters)')
  }

  // Keywords validation
  if (!keywords) {
    warnings.push('Missing meta keywords (optional but recommended)')
  }

  // Canonical URL validation
  if (!canonical) {
    warnings.push('Missing canonical URL')
  }

  // Check for Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')?.content
  const ogDescription = document.querySelector('meta[property="og:description"]')?.content
  const ogImage = document.querySelector('meta[property="og:image"]')?.content

  if (!ogTitle) warnings.push('Missing Open Graph title')
  if (!ogDescription) warnings.push('Missing Open Graph description')
  if (!ogImage) warnings.push('Missing Open Graph image')

  // Check for Twitter Card tags
  const twitterCard = document.querySelector('meta[property="twitter:card"]')?.content
  const twitterTitle = document.querySelector('meta[property="twitter:title"]')?.content

  if (!twitterCard) warnings.push('Missing Twitter Card type')
  if (!twitterTitle) warnings.push('Missing Twitter Card title')

  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]')
  if (structuredData.length === 0) {
    warnings.push('No structured data found')
  } else {
    recommendations.push(`Found ${structuredData.length} structured data script(s)`)
  }

  // Check for heading hierarchy
  const h1s = document.querySelectorAll('h1')
  const h2s = document.querySelectorAll('h2')
  const h3s = document.querySelectorAll('h3')

  if (h1s.length === 0) {
    issues.push('Missing H1 heading')
  } else if (h1s.length > 1) {
    warnings.push('Multiple H1 headings found (should have only one)')
  }

  if (h2s.length === 0) {
    recommendations.push('Consider adding H2 headings for better structure')
  }

  // Check for images without alt text
  const images = document.querySelectorAll('img')
  const imagesWithoutAlt = Array.from(images).filter(img => !img.alt)
  
  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} image(s) missing alt text`)
  }

  // Check for internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="http"]')
  if (internalLinks.length === 0) {
    recommendations.push('Consider adding internal links for better SEO')
  }

  // Check for mobile responsiveness
  const viewport = document.querySelector('meta[name="viewport"]')
  if (!viewport) {
    issues.push('Missing viewport meta tag')
  }

  // Performance recommendations
  recommendations.push('Consider implementing lazy loading for images')
  recommendations.push('Consider adding preload for critical resources')
  recommendations.push('Monitor Core Web Vitals in Google Search Console')

  return {
    issues,
    warnings,
    recommendations,
    summary: {
      totalIssues: issues.length,
      totalWarnings: warnings.length,
      totalRecommendations: recommendations.length,
      score: Math.max(0, 100 - (issues.length * 20) - (warnings.length * 5))
    }
  }
}

export const logSEOReport = () => {
  const report = validateSEO()
  
  console.log('🔍 SEO Validation Report')
  console.log('========================')
  
  if (report.issues.length > 0) {
    console.log('\n❌ Issues (Fix these first):')
    report.issues.forEach(issue => console.log(`  - ${issue}`))
  }
  
  if (report.warnings.length > 0) {
    console.log('\n⚠️  Warnings:')
    report.warnings.forEach(warning => console.log(`  - ${warning}`))
  }
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    report.recommendations.forEach(rec => console.log(`  - ${rec}`))
  }
  
  console.log(`\n📊 SEO Score: ${report.summary.score}/100`)
  console.log(`   Issues: ${report.summary.totalIssues}`)
  console.log(`   Warnings: ${report.summary.totalWarnings}`)
  console.log(`   Recommendations: ${report.summary.totalRecommendations}`)
  
  return report
}

// Auto-run validation in development
if (import.meta.env.DEV) {
  // Wait for DOM to be ready
  setTimeout(() => {
    logSEOReport()
  }, 1000)
} 
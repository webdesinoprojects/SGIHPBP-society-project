import React from 'react'
import ComingSoon from '../components/common/ComingSoon'
import SEO from '../components/SEO'

const CaseOfTheMonth = () => {
  const caseIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-16 h-16 text-primary dark:text-gold"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );

  return (
    <>
      <SEO 
        title="Case of the Month" 
        description="Explore our monthly featured clinical cases with detailed analysis and discussion."
        keywords="pathology cases, clinical case study, medical education, SGIHPBP cases"
      />
      <ComingSoon 
        title="Case of the Month" 
        description="We are curating a selection of exceptional clinical cases for educational purposes. Each month, we will feature a new case with detailed analysis and discussion."
        icon={caseIcon}
        status="Coming Soon"
      />
    </>
  )
}

export default CaseOfTheMonth
-- Seed Publications

INSERT INTO public.publications (slug, title, author, category, description, document_url, is_published, sort_order) VALUES
(
  'celiac-disease-guidelines', 
  'Best practices of handling, processing, and interpretation of small intestinal biopsies for the diagnosis and management of celiac disease: A joint consensus of Indian Association of Pathologists and Microbiologists and Indian Society of Gastroenterology', 
  'A joint consensus of IAPM and ISG', 
  'GUIDELINE PAPER', 
  'A joint consensus guideline paper on the standards for handling, processing, and interpreting small intestinal biopsies for celiac disease.', 
  'https://drive.google.com/uc?export=download&id=1sXib1uaDlf0dZIQKKm_oBk0D1Fo89mCU', 
  true, 
  1
),
(
  'crohns-tb-differentiation', 
  'Histological approach and differentiation of Crohn''s disease and gastrointestinal tuberculosis: Recommendations from the joint IAPM-ISG-CCFI Working Group', 
  'A joint consensus of IAPM-ISG-CCFI', 
  'GUIDELINE PAPER', 
  'A joint consensus guideline paper on histological differentiation of CD and GITB', 
  'https://rdcu.be/fcXUs', 
  true, 
  2
),
(
  'psvd-ncpf-consensus', 
  'A multisociety consensus statement on a new common definition and diagnostic criteria for PSVD or NCPF', 
  'Virginia Hernández-Gea1,2,3,*, Valerie Paradis4,5, Maha Guindi6, Venancio A.F. Alves7, Amal Aquil8, Fira Cerda9', 
  'POSITION PAPER', 
  'Position Paper', 
  'https://www.sciencedirect.com/science/article/pii/S0168827826002643', 
  true, 
  3
);

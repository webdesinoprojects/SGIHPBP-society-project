-- Migration to add advisor sections
ALTER TABLE public.governing_body_members DROP CONSTRAINT IF EXISTS governing_body_members_section_check;
ALTER TABLE public.governing_body_members ADD CONSTRAINT governing_body_members_section_check CHECK (section in ('office_bearer', 'governing_member', 'national_advisor', 'international_advisor'));

-- Seed Advisors
INSERT INTO public.governing_body_members (section, name, sort_order) VALUES
-- National Advisors
('national_advisor', 'Prof. Siddhartha Datta Gupta', 1),
('national_advisor', 'Prof. Asim Das', 2),
('national_advisor', 'Prof. Rachana Chaturvedi', 3),
('national_advisor', 'Prof. Nuzhat Hussain', 4),
('national_advisor', 'Prof. Ritambhra Nada', 5),
('national_advisor', 'Prof. Anna Pulimood', 6),

-- International Advisors
('international_advisor', 'Prof. Vikram Deshpande', 1),
('international_advisor', 'Prof. Dhanpat Jain', 2),
('international_advisor', 'Prof. Sanjay Kakkar', 3),
('international_advisor', 'Prof. Amitabh Srivatava', 4),
('international_advisor', 'Prof. Deepti Dhall', 5);

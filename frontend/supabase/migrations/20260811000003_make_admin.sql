-- Make the user an admin
UPDATE public.profiles 
SET role = 'admin', is_active = true 
WHERE id = 'af86af25-7b00-439f-9308-62b68b957899';

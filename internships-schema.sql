-- Create internships table
CREATE TABLE IF NOT EXISTS public.internships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_email TEXT NOT NULL,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    location TEXT NOT NULL,
    stipend INTEGER,
    duration TEXT,
    type TEXT, -- 'Remote', 'In-Office', 'Hybrid'
    category TEXT, -- 'Engineering', 'Design', 'Marketing', etc.
    description TEXT,
    requirements TEXT[],
    responsibilities TEXT[],
    status TEXT DEFAULT 'active', -- 'active', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active internships
CREATE POLICY "Anyone can view active internships"
ON public.internships
FOR SELECT
USING (status = 'active');

-- Policy: Companies can insert their own internships
CREATE POLICY "Companies can insert their own internships"
ON public.internships
FOR INSERT
WITH CHECK (auth.jwt() ->> 'email' = company_email);

-- Policy: Companies can update their own internships
CREATE POLICY "Companies can update their own internships"
ON public.internships
FOR UPDATE
USING (auth.jwt() ->> 'email' = company_email);

-- Policy: Companies can delete their own internships
CREATE POLICY "Companies can delete their own internships"
ON public.internships
FOR DELETE
USING (auth.jwt() ->> 'email' = company_email);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS internships_company_email_idx ON public.internships(company_email);
CREATE INDEX IF NOT EXISTS internships_category_idx ON public.internships(category);
CREATE INDEX IF NOT EXISTS internships_location_idx ON public.internships(location);

CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  message text,
  assessment_summary text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact request" ON public.contact_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.assessment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  score integer NOT NULL,
  stage text NOT NULL,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.assessment_submissions TO anon, authenticated;
GRANT ALL ON public.assessment_submissions TO service_role;
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an assessment" ON public.assessment_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
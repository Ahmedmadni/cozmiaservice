ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS service_slug text,
  ADD COLUMN IF NOT EXISTS project_stage text,
  ADD COLUMN IF NOT EXISTS need_details text,
  ADD COLUMN IF NOT EXISTS preferred_start text;

CREATE TABLE public.ai_brief_controls (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 control_key text UNIQUE NOT NULL,
 request_count integer NOT NULL DEFAULT 0,
 window_start timestamptz NOT NULL DEFAULT now(),
 blocked_status integer,
 blocked_message text
);
GRANT ALL ON public.ai_brief_controls TO service_role;
ALTER TABLE public.ai_brief_controls ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ai_brief_controls IS 'Operational rate limits and AI availability only; never store construction briefs or raw IP addresses.';
CREATE OR REPLACE FUNCTION public.claim_ai_brief_request(bucket_key text) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE allowed boolean;
BEGIN
 INSERT INTO public.ai_brief_controls(control_key,request_count) VALUES(bucket_key,1)
 ON CONFLICT (control_key) DO UPDATE SET
 request_count = CASE WHEN ai_brief_controls.window_start < now() - interval '1 hour' THEN 1 ELSE ai_brief_controls.request_count + 1 END,
 window_start = CASE WHEN ai_brief_controls.window_start < now() - interval '1 hour' THEN now() ELSE ai_brief_controls.window_start END
 RETURNING request_count <= 5 INTO allowed;
 RETURN allowed;
END; $$;
REVOKE ALL ON FUNCTION public.claim_ai_brief_request(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_ai_brief_request(text) TO service_role;
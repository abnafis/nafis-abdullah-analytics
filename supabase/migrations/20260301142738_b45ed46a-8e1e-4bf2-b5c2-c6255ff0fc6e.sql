
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. user_roles RLS: only admins can read, no public write
CREATE POLICY "Admins can read user_roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. site_content table
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page, section)
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admin insert site_content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update site_content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete site_content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 6. services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'BarChart3',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete services" ON public.services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 7. testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 8. case_studies table
CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  goal TEXT NOT NULL,
  issues JSONB NOT NULL DEFAULT '[]',
  solutions JSONB NOT NULL DEFAULT '[]',
  result TEXT NOT NULL,
  badge TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read case_studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Admin insert case_studies" ON public.case_studies FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update case_studies" ON public.case_studies FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete case_studies" ON public.case_studies FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 9. Seed site_content
INSERT INTO public.site_content (page, section, content) VALUES
-- Home page
('home', 'hero_badge', '"Web Analytics Expert"'),
('home', 'hero_headline', '"Get Accurate Tracking.\nGrow With Confidence."'),
('home', 'hero_subheadline', '"I help businesses fix broken analytics, measure conversions properly, and make smarter marketing decisions."'),
('home', 'value_bullets', '["Clear and trusted data for better decisions", "Accurate revenue & lead tracking", "Improved ads performance and ROI"]'),
('home', 'platforms', '["GA4", "Google Ads", "Meta Pixel & CAPI", "GTM", "Shopify", "WooCommerce"]'),
('home', 'credibility_line', '"Trusted by 100+ eCommerce brands, agencies & local businesses."'),
('home', 'cta_primary', '"Let''s Fix Your Tracking Today"'),
('home', 'cta_secondary', '"View Services"'),
('home', 'services_badge', '"What I Do"'),
('home', 'services_title', '"Analytics & Tracking Expertise"'),
('home', 'services_description', '"From GA4 setup to advanced conversion tracking, I help businesses measure what matters and optimize for growth."'),
('home', 'cta_section_title', '"Ready for Accurate Data?"'),
('home', 'cta_section_description', '"Let''s build a tracking system that boosts your conversions and helps you make smarter marketing decisions."'),
-- About page
('about', 'badge', '"About Me"'),
('about', 'title', '"Hi, I''m Nafis Abdullah"'),
('about', 'intro', '"A Web Analytics Expert helping businesses access trustworthy data to grow smarter. I believe every marketing decision should be backed by accurate data."'),
('about', 'body', '"Whether your tracking is broken or you''re ready to scale, I''m here to make sure every conversion is counted — and every dollar is optimized. My approach combines technical expertise with a deep understanding of business goals."'),
('about', 'highlights', '["4+ Years of Professional Experience", "Helped 100+ Businesses Track & Scale Their Revenue", "Expert in eCommerce & Lead-Gen Attribution", "Fast Communication & Friendly Support"]'),
('about', 'quote', '"If you can measure it, you can improve it."'),
('about', 'values_badge', '"My Approach"'),
('about', 'values_title', '"Why Work With Me?"'),
('about', 'values_description', '"I combine technical excellence with clear communication to deliver results that matter."'),
('about', 'values', '[{"title": "Accuracy First", "desc": "Every tag, every trigger, every variable is meticulously validated to ensure your data is 100% reliable."}, {"title": "Fast Turnaround", "desc": "Most projects are completed within days, not weeks. I respect your time and deadlines."}, {"title": "Clear Communication", "desc": "No jargon, no confusion. I explain everything in plain language and keep you updated every step of the way."}]'),
-- Services page
('services', 'badge', '"Services"'),
('services', 'title', '"Analytics & Tracking Services That Drive Profit"'),
('services', 'description', '"From setup to optimization, I provide end-to-end analytics solutions that help you understand your customers and grow your revenue."'),
('services', 'cta_title', '"Let''s Build a Tracking System That Boosts Conversions"'),
('services', 'cta_description', '"Ready to stop guessing and start growing? Let''s talk about your analytics needs and create a custom solution for your business."'),
-- Portfolio page
('portfolio', 'badge', '"Portfolio"'),
('portfolio', 'title', '"Tracking Success Stories"'),
('portfolio', 'description', '"Real results from real businesses. See how accurate tracking has transformed marketing performance for my clients."'),
('portfolio', 'cta_title', '"Ready to Be the Next Success Story?"'),
('portfolio', 'cta_description', '"Let''s discuss your tracking challenges and create a roadmap to accurate, actionable data."'),
-- Testimonials page
('testimonials', 'badge', '"Testimonials"'),
('testimonials', 'title', '"What Clients Say"'),
('testimonials', 'description', '"Don''t just take my word for it. Here''s what business owners and marketing professionals say about working with me."'),
('testimonials', 'cta_title', '"Ready to Join the Happy Clients?"'),
('testimonials', 'cta_description', '"Let''s fix your tracking and help you make data-driven decisions with confidence."'),
-- Contact page
('contact', 'badge', '"Contact"'),
('contact', 'title', '"Let''s Connect"'),
('contact', 'description', '"Have a project or tracking issue? Tell me what you''re working on — I''ll get back to you quickly."'),
('contact', 'whatsapp_url', '"https://wa.me/1234567890"'),
('contact', 'email', '"hello@nafisabdullah.com"'),
('contact', 'phone', '"+1234567890"'),
('contact', 'cta_title', '"Ready for Accurate Data and Better Results?"'),
('contact', 'cta_description', '"Let''s talk and build a tracking system that works for your business."');

-- 10. Seed services
INSERT INTO public.services (title, description, icon_name, sort_order) VALUES
('GA4 Setup & Audit', 'Get clean, accurate insights with a fully validated GA4 setup. I ensure your analytics foundation is rock-solid.', 'BarChart3', 1),
('Google Ads Conversion Tracking', 'Track what truly converts so you can scale winning campaigns. No more guessing which ads drive revenue.', 'Target', 2),
('Meta Pixel & CAPI Setup', 'Boost attribution accuracy and reduce data loss with proper Meta Pixel and Conversions API implementation.', 'Share2', 3),
('Server-Side Tracking', 'Future-proof your analytics with more reliable, consent-friendly data collection that bypasses browser limitations.', 'Server', 4),
('GTM Implementation & Tag Fixing', 'Custom tagging tailored to your website and marketing needs. Clean, organized, and properly documented.', 'Code2', 5),
('eCommerce Tracking (Shopify & WooCommerce)', 'Accurate purchase, add-to-cart, and checkout tracking across your entire funnel for complete visibility.', 'ShoppingCart', 6),
('Performance Reporting & Dashboards', 'Visual dashboards that show what''s working — and what''s not. Data you can actually use to make decisions.', 'LineChart', 7),
('Conversion Optimization Consulting', 'Turn insights into action to increase revenue and leads. Strategic recommendations based on your data.', 'TrendingUp', 8),
('Lead Conversion Tracking', 'Track form submissions, calls, and CRM success clearly. Know exactly where your leads come from.', 'PhoneCall', 9);

-- 11. Seed testimonials
INSERT INTO public.testimonials (quote, author, role, sort_order) VALUES
('Our tracking was a complete mess before Nafis fixed everything. Now we know exactly which campaigns are driving revenue. Highly recommended!', 'Sarah Mitchell', 'Agency Founder', 1),
('Revenue tracking is now 100% accurate. We''re scaling our ad spend confidently because we trust the data. Nafis is incredibly thorough.', 'David Chen', 'E-commerce CEO', 2),
('Fast, professional, and explains everything clearly. Nafis helped us understand our analytics in a way that actually makes sense for our business.', 'Michael Rodriguez', 'Local Business Owner', 3),
('We were losing money on ads because our tracking was broken. After working with Nafis, our ROAS improved by 40%. Worth every penny.', 'Emma Johnson', 'Marketing Director', 4),
('The server-side tracking setup was exactly what we needed. Privacy-compliant and more accurate than ever. Nafis really knows his stuff.', 'James Wilson', 'Shopify Store Owner', 5),
('Finally, a tracking expert who communicates clearly and delivers on time. Our GA4 setup is now clean, organized, and actually useful.', 'Lisa Thompson', 'Digital Marketing Manager', 6);

-- 12. Seed case_studies
INSERT INTO public.case_studies (title, goal, issues, solutions, result, badge, sort_order) VALUES
('E-commerce Brand Revenue Tracking', 'Track all revenue sources accurately across multiple platforms', '["Missing purchase events", "Duplicate transactions", "Incorrect revenue values"]', '["Complete GA4 & GTM overhaul", "Server-side tracking implementation", "Cross-platform attribution setup"]', '+42% conversion attribution accuracy', 'eCommerce', 1),
('Lead Generation Agency', 'Track form submissions and phone calls to optimize ad spend', '["No form tracking in place", "Missing call tracking", "Poor Google Ads data"]', '["Form submission tracking", "Call tracking integration", "Enhanced conversions setup"]', '+85% lead attribution improvement', 'Lead Gen', 2),
('Shopify Store Scaling', 'Fix broken tracking before scaling ad spend', '["Meta Pixel firing incorrectly", "No CAPI setup", "Missing checkout events"]', '["Complete Meta Pixel audit", "CAPI implementation", "Full funnel tracking"]', '30% reduction in CPA', 'Shopify', 3);

-- 13. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

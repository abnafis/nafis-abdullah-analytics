

# Admin Panel with Dynamic Content Management

## Overview
Build a full admin panel at `/admin` with Supabase authentication and database-backed content management for all pages. The admin can edit all page content from a dashboard, and the public-facing pages will dynamically load content from Supabase.

## Step 1: Connect Supabase
Enable Lovable Cloud (or connect an external Supabase project) to get authentication and database capabilities.

## Step 2: Database Schema
Create tables to store editable content for each page section:

- **site_content** -- A flexible key-value table for all page content
  - `id` (uuid, PK)
  - `page` (text) -- e.g. "home", "about", "services", "portfolio", "testimonials", "contact"
  - `section` (text) -- e.g. "hero_headline", "hero_subheadline", "cta_text"
  - `content` (jsonb) -- stores text, arrays, or structured objects
  - `updated_at` (timestamptz)

- **services** -- Individual service entries
  - `id` (uuid, PK), `title`, `description`, `icon_name`, `sort_order`, `is_active`

- **testimonials** -- Testimonial entries
  - `id` (uuid, PK), `quote`, `author`, `role`, `sort_order`, `is_active`

- **case_studies** -- Portfolio case studies
  - `id` (uuid, PK), `title`, `goal`, `issues` (jsonb), `solutions` (jsonb), `result`, `badge`, `sort_order`, `is_active`

- **user_roles** -- For admin role management (security definer pattern)
  - `id` (uuid, PK), `user_id` (references auth.users), `role` (app_role enum)

## Step 3: RLS Policies
- Public read access on all content tables (portfolio is a public site)
- Write/update/delete restricted to users with the `admin` role via `has_role()` security definer function
- user_roles table: only admins can read, no public write

## Step 4: Seed Default Data
Insert current hardcoded content as initial rows in the database so the site works immediately after migration.

## Step 5: Auth & Admin Layout
- Create `/auth` page with email/password login (Supabase Auth)
- Create `/admin` layout with sidebar navigation:
  - Dashboard (overview)
  - Home Page content editor
  - Services editor (add/edit/delete/reorder)
  - About Page content editor
  - Portfolio editor (add/edit/delete case studies)
  - Testimonials editor (add/edit/delete)
  - Contact Page content editor
- Protected route wrapper that checks auth + admin role

## Step 6: Admin Editor Pages
Each admin section will have forms to edit the corresponding content:
- **Text fields** for headlines, descriptions, quotes
- **Rich list editors** for services, testimonials, case studies (add/remove/reorder)
- **Toggle switches** for is_active (show/hide items)
- Save buttons that update Supabase in real-time

## Step 7: Update Public Pages
Replace all hardcoded content in Index, Services, About, Portfolio, Testimonials, and Contact pages with React Query hooks that fetch from Supabase. Show loading skeletons while data loads.

## Step 8: Custom Hooks
- `useSiteContent(page, section)` -- fetch specific content
- `useServices()` -- fetch active services
- `useTestimonials()` -- fetch active testimonials
- `useCaseStudies()` -- fetch active case studies
- `useIsAdmin()` -- check if current user has admin role

## Technical Details

**New files to create:**
- `src/pages/Auth.tsx` -- Login page
- `src/pages/admin/AdminLayout.tsx` -- Sidebar layout for admin
- `src/pages/admin/AdminDashboard.tsx` -- Overview
- `src/pages/admin/AdminHome.tsx` -- Home page editor
- `src/pages/admin/AdminServices.tsx` -- Services CRUD
- `src/pages/admin/AdminAbout.tsx` -- About page editor
- `src/pages/admin/AdminPortfolio.tsx` -- Case studies CRUD
- `src/pages/admin/AdminTestimonials.tsx` -- Testimonials CRUD
- `src/pages/admin/AdminContact.tsx` -- Contact page editor
- `src/components/ProtectedRoute.tsx` -- Auth + role guard
- `src/hooks/useContent.ts` -- Content fetching hooks
- `src/hooks/useIsAdmin.ts` -- Admin role check
- `src/integrations/supabase/` -- Client setup (auto-generated)

**Files to modify:**
- `src/App.tsx` -- Add admin routes and auth route
- `src/pages/Index.tsx` -- Fetch content from Supabase
- `src/pages/Services.tsx` -- Fetch services from Supabase
- `src/pages/About.tsx` -- Fetch content from Supabase
- `src/pages/Portfolio.tsx` -- Fetch case studies from Supabase
- `src/pages/Testimonials.tsx` -- Fetch testimonials from Supabase
- `src/pages/Contact.tsx` -- Fetch content from Supabase
- `src/components/Navbar.tsx` -- Add admin link when logged in

**Database migrations:**
- Create enum, tables, RLS policies, security definer function, and seed data


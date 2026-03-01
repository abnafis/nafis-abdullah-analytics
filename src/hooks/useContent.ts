import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  sort_order: number;
  is_active: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  goal: string;
  issues: string[];
  solutions: string[];
  result: string;
  badge: string;
  sort_order: number;
  is_active: boolean;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  content: any;
  updated_at: string;
}

export function useSiteContent(page: string) {
  return useQuery({
    queryKey: ["site_content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content" as any)
        .select("*")
        .eq("page", page);
      if (error) throw error;
      const map: Record<string, any> = {};
      (data as any[])?.forEach((row: SiteContent) => {
        map[row.section] = row.content;
      });
      return map;
    },
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services" as any)
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as unknown as Service[];
    },
  });
}

export function useAllServices() {
  return useQuery({
    queryKey: ["services", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services" as any)
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as unknown as Service[];
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials" as any)
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as unknown as Testimonial[];
    },
  });
}

export function useAllTestimonials() {
  return useQuery({
    queryKey: ["testimonials", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials" as any)
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as unknown as Testimonial[];
    },
  });
}

export function useCaseStudies() {
  return useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies" as any)
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as unknown as CaseStudy[];
    },
  });
}

export function useAllCaseStudies() {
  return useQuery({
    queryKey: ["case_studies", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies" as any)
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as unknown as CaseStudy[];
    },
  });
}

export function useAllSiteContent() {
  return useQuery({
    queryKey: ["site_content", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content" as any)
        .select("*")
        .order("page")
        .order("section");
      if (error) throw error;
      return data as unknown as SiteContent[];
    },
  });
}

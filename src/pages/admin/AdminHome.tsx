import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminHome = () => {
  const { data: content, isLoading } = useSiteContent("home");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      const flat: Record<string, string> = {};
      Object.entries(content).forEach(([key, val]) => {
        flat[key] = typeof val === "string" ? val : JSON.stringify(val);
      });
      setForm(flat);
    }
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [section, value] of Object.entries(form)) {
        let jsonValue: any;
        try {
          jsonValue = JSON.parse(value);
        } catch {
          jsonValue = value;
        }
        await supabase
          .from("site_content" as any)
          .update({ content: jsonValue })
          .eq("page", "home")
          .eq("section", section);
      }
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast({ title: "Saved!", description: "Home page content updated." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  const fields = [
    { key: "hero_badge", label: "Hero Badge" },
    { key: "hero_headline", label: "Hero Headline", multiline: true },
    { key: "hero_subheadline", label: "Hero Subheadline", multiline: true },
    { key: "value_bullets", label: "Value Bullets (JSON array)", multiline: true },
    { key: "platforms", label: "Platforms (JSON array)", multiline: true },
    { key: "credibility_line", label: "Credibility Line" },
    { key: "cta_primary", label: "Primary CTA Text" },
    { key: "cta_secondary", label: "Secondary CTA Text" },
    { key: "services_badge", label: "Services Section Badge" },
    { key: "services_title", label: "Services Section Title" },
    { key: "services_description", label: "Services Section Description", multiline: true },
    { key: "cta_section_title", label: "CTA Section Title" },
    { key: "cta_section_description", label: "CTA Section Description", multiline: true },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Home Page</h1>
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-foreground mb-2">
              {field.label}
            </label>
            {field.multiline ? (
              <Textarea
                value={form[field.key] || ""}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                rows={3}
              />
            ) : (
              <Input
                value={form[field.key] || ""}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;

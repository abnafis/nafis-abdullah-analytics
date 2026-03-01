import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminAbout = () => {
  const { data: content, isLoading } = useSiteContent("about");
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
        try { jsonValue = JSON.parse(value); } catch { jsonValue = value; }
        await supabase
          .from("site_content" as any)
          .update({ content: jsonValue })
          .eq("page", "about")
          .eq("section", section);
      }
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast({ title: "Saved!", description: "About page content updated." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  const fields = [
    { key: "badge", label: "Badge Text" },
    { key: "title", label: "Title" },
    { key: "intro", label: "Intro Text", multiline: true },
    { key: "body", label: "Body Text", multiline: true },
    { key: "highlights", label: "Highlights (JSON array)", multiline: true },
    { key: "quote", label: "Quote" },
    { key: "values_badge", label: "Values Section Badge" },
    { key: "values_title", label: "Values Section Title" },
    { key: "values_description", label: "Values Section Description", multiline: true },
    { key: "values", label: "Values (JSON array of objects)", multiline: true },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">About Page</h1>
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <div className="space-y-6 max-w-2xl">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
            {field.multiline ? (
              <Textarea value={form[field.key] || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} rows={3} />
            ) : (
              <Input value={form[field.key] || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAbout;

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminContact = () => {
  const { data: content, isLoading } = useSiteContent("contact");
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
          .eq("page", "contact")
          .eq("section", section);
      }
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast({ title: "Saved!", description: "Contact page updated." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  const fields = [
    { key: "badge", label: "Badge" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description", multiline: true },
    { key: "whatsapp_url", label: "WhatsApp URL" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Phone Number" },
    { key: "cta_title", label: "CTA Title" },
    { key: "cta_description", label: "CTA Description", multiline: true },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Contact Page</h1>
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

export default AdminContact;

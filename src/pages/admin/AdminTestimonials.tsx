import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAllTestimonials, type Testimonial } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

const AdminTestimonials = () => {
  const { data: testimonials, isLoading } = useAllTestimonials();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ quote: "", author: "", role: "" });

  const handleAdd = async () => {
    const maxOrder = testimonials?.reduce((max, t) => Math.max(max, t.sort_order), 0) ?? 0;
    const { error } = await supabase.from("testimonials" as any).insert({
      quote: form.quote || "New testimonial",
      author: form.author || "Author",
      role: form.role || "Role",
      sort_order: maxOrder + 1,
    } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setForm({ quote: "", author: "", role: "" });
      toast({ title: "Added!" });
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials" as any).delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    toast({ title: "Deleted!" });
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    await supabase.from("testimonials" as any).update({ is_active: !isActive } as any).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
  };

  const handleUpdate = async (t: Testimonial) => {
    await supabase.from("testimonials" as any).update({
      quote: t.quote, author: t.author, role: t.role,
    } as any).eq("id", t.id);
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    setEditingId(null);
    toast({ title: "Updated!" });
  };

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Testimonials</h1>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border shadow-card mb-8">
        <h3 className="font-semibold text-foreground mb-4">Add New Testimonial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input placeholder="Author name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <Input placeholder="Role / Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </div>
        <Textarea placeholder="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="mb-4" />
        <Button variant="accent" onClick={handleAdd}><Plus className="w-4 h-4" /> Add</Button>
      </div>

      <div className="space-y-4">
        {testimonials?.map((t) => (
          <div key={t.id} className="p-4 rounded-xl bg-card border border-border shadow-card">
            {editingId === t.id ? (
              <EditForm t={t} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-foreground text-sm italic">"{t.quote}"</p>
                  <p className="text-xs text-muted-foreground mt-1">— {t.author}, {t.role}</p>
                </div>
                <Switch checked={t.is_active} onCheckedChange={() => handleToggle(t.id, t.is_active)} />
                <Button variant="ghost" size="sm" onClick={() => setEditingId(t.id)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function EditForm({ t, onSave, onCancel }: { t: Testimonial; onSave: (t: Testimonial) => void; onCancel: () => void }) {
  const [form, setForm] = useState(t);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" />
        <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" />
      </div>
      <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="Quote" />
      <div className="flex gap-2">
        <Button variant="accent" size="sm" onClick={() => onSave(form)}><Save className="w-4 h-4" /> Save</Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default AdminTestimonials;

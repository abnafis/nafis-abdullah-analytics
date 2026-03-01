import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAllServices, type Service } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

const AdminServices = () => {
  const { data: services, isLoading } = useAllServices();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", icon_name: "BarChart3" });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    setSaving(true);
    const maxOrder = services?.reduce((max, s) => Math.max(max, s.sort_order), 0) ?? 0;
    const { error } = await supabase.from("services" as any).insert({
      title: form.title || "New Service",
      description: form.description || "Description",
      icon_name: form.icon_name || "BarChart3",
      sort_order: maxOrder + 1,
    } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setForm({ title: "", description: "", icon_name: "BarChart3" });
      toast({ title: "Added!" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services" as any).delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Deleted!" });
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    await supabase.from("services" as any).update({ is_active: !isActive } as any).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["services"] });
  };

  const handleUpdate = async (service: Service) => {
    const { error } = await supabase
      .from("services" as any)
      .update({ title: service.title, description: service.description, icon_name: service.icon_name } as any)
      .eq("id", service.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setEditingId(null);
      toast({ title: "Updated!" });
    }
  };

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Services</h1>
      </div>

      {/* Add new */}
      <div className="p-6 rounded-xl bg-card border border-border shadow-card mb-8">
        <h3 className="font-semibold text-foreground mb-4">Add New Service</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Icon name (e.g. BarChart3)" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} />
          <Button variant="accent" onClick={handleAdd} disabled={saving}>
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>
        <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>

      {/* List */}
      <div className="space-y-4">
        {services?.map((service) => (
          <div key={service.id} className="p-4 rounded-xl bg-card border border-border shadow-card">
            {editingId === service.id ? (
              <EditServiceForm
                service={service}
                onSave={handleUpdate}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {service.icon_name}
                </span>
                <Switch
                  checked={service.is_active}
                  onCheckedChange={() => handleToggle(service.id, service.is_active)}
                />
                <Button variant="ghost" size="sm" onClick={() => setEditingId(service.id)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
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

function EditServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service;
  onSave: (s: Service) => void;
  onCancel: () => void;
}) {
  const [s, setS] = useState(service);
  return (
    <div className="space-y-3">
      <Input value={s.title} onChange={(e) => setS({ ...s, title: e.target.value })} placeholder="Title" />
      <Input value={s.icon_name} onChange={(e) => setS({ ...s, icon_name: e.target.value })} placeholder="Icon name" />
      <Textarea value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} placeholder="Description" />
      <div className="flex gap-2">
        <Button variant="accent" size="sm" onClick={() => onSave(s)}>
          <Save className="w-4 h-4" /> Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default AdminServices;

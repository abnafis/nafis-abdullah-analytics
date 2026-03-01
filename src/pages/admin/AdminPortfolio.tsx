import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAllCaseStudies, type CaseStudy } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

const AdminPortfolio = () => {
  const { data: studies, isLoading } = useAllCaseStudies();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = async () => {
    const maxOrder = studies?.reduce((max, s) => Math.max(max, s.sort_order), 0) ?? 0;
    const { error } = await supabase.from("case_studies" as any).insert({
      title: "New Case Study",
      goal: "Client goal",
      issues: ["Issue 1"],
      solutions: ["Solution 1"],
      result: "Result here",
      badge: "Category",
      sort_order: maxOrder + 1,
    } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      queryClient.invalidateQueries({ queryKey: ["case_studies"] });
      toast({ title: "Added!" });
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("case_studies" as any).delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["case_studies"] });
    toast({ title: "Deleted!" });
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    await supabase.from("case_studies" as any).update({ is_active: !isActive } as any).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["case_studies"] });
  };

  const handleUpdate = async (cs: CaseStudy) => {
    await supabase.from("case_studies" as any).update({
      title: cs.title, goal: cs.goal, issues: cs.issues,
      solutions: cs.solutions, result: cs.result, badge: cs.badge,
    } as any).eq("id", cs.id);
    queryClient.invalidateQueries({ queryKey: ["case_studies"] });
    setEditingId(null);
    toast({ title: "Updated!" });
  };

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Portfolio</h1>
        <Button variant="accent" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> Add Case Study
        </Button>
      </div>

      <div className="space-y-4">
        {studies?.map((cs) => (
          <div key={cs.id} className="p-4 rounded-xl bg-card border border-border shadow-card">
            {editingId === cs.id ? (
              <EditCaseStudyForm cs={cs} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full mr-2">{cs.badge}</span>
                  <span className="font-semibold text-foreground">{cs.title}</span>
                  <p className="text-sm text-muted-foreground mt-1">{cs.result}</p>
                </div>
                <Switch checked={cs.is_active} onCheckedChange={() => handleToggle(cs.id, cs.is_active)} />
                <Button variant="ghost" size="sm" onClick={() => setEditingId(cs.id)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(cs.id)}>
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

function EditCaseStudyForm({ cs, onSave, onCancel }: { cs: CaseStudy; onSave: (c: CaseStudy) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    ...cs,
    issues_text: JSON.stringify(cs.issues),
    solutions_text: JSON.stringify(cs.solutions),
  });

  const save = () => {
    try {
      onSave({
        ...form,
        issues: JSON.parse(form.issues_text),
        solutions: JSON.parse(form.solutions_text),
      });
    } catch {
      onSave({ ...form, issues: cs.issues, solutions: cs.solutions });
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" />
        <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Badge" />
      </div>
      <Input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Goal" />
      <Textarea value={form.issues_text} onChange={(e) => setForm({ ...form, issues_text: e.target.value })} placeholder='Issues (JSON array)' />
      <Textarea value={form.solutions_text} onChange={(e) => setForm({ ...form, solutions_text: e.target.value })} placeholder='Solutions (JSON array)' />
      <Input value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} placeholder="Result" />
      <div className="flex gap-2">
        <Button variant="accent" size="sm" onClick={save}><Save className="w-4 h-4" /> Save</Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default AdminPortfolio;

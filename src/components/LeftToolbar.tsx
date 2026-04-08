import { Layers, BarChart3, Pencil, Download, Plus, X, FileText, Image, Table } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onToggleLayerPanel: () => void;
  showLayerPanel: boolean;
}

const LeftToolbar = ({ onToggleLayerPanel, showLayerPanel }: Props) => {
  const [activeId, setActiveId] = useState("layers");
  const [showAnnotate, setShowAnnotate] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleClick = (id: string) => {
    setActiveId(id);
    if (id === "layers") {
      onToggleLayerPanel();
      setShowAnnotate(false);
      setShowExport(false);
    } else if (id === "analytics") {
      setShowAnnotate(false);
      setShowExport(false);
    } else if (id === "annotate") {
      setShowAnnotate((p) => !p);
      setShowExport(false);
    } else if (id === "export") {
      setShowExport((p) => !p);
      setShowAnnotate(false);
    }
  };

  const tools = [
    { icon: Layers, label: "Layers", id: "layers" },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Pencil, label: "Annotate", id: "annotate" },
    { icon: Download, label: "Export", id: "export" },
  ];

  return (
    <div className="fixed left-4 top-20 z-40 flex flex-col gap-2">
      <div className="glass-panel p-1.5 flex flex-col gap-1">
        <div className="label-caps text-center py-1.5 px-2">Command</div>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeId === tool.id && (
            (tool.id === "layers" && showLayerPanel) ||
            tool.id === "annotate" && showAnnotate ||
            tool.id === "export" && showExport ||
            tool.id === "analytics"
          );
          return (
            <div key={tool.id} className="relative">
              {tool.id === "analytics" ? (
                <Link
                  to="/analytics"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all text-muted-foreground hover:text-foreground hover:bg-secondary`}
                  title={tool.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={() => handleClick(tool.id)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  title={tool.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Annotate dropdown */}
      {showAnnotate && (
        <div className="glass-panel-strong p-3 w-44 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <p className="label-caps">Annotations</p>
            <button onClick={() => setShowAnnotate(false)} className="text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>
          </div>
          <div className="space-y-1">
            {["Add Pin", "Draw Region", "Add Label", "Measure Distance"].map((item) => (
              <button key={item} className="w-full text-left px-3 py-2 text-xs text-secondary-foreground rounded-md hover:bg-secondary/60 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Export dropdown */}
      {showExport && (
        <div className="glass-panel-strong p-3 w-44 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <p className="label-caps">Export Data</p>
            <button onClick={() => setShowExport(false)} className="text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>
          </div>
          <div className="space-y-1">
            {[
              { label: "PDF Report", icon: FileText },
              { label: "PNG Screenshot", icon: Image },
              { label: "CSV Data", icon: Table },
            ].map(({ label, icon: ItemIcon }) => (
              <button key={label} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-secondary-foreground rounded-md hover:bg-secondary/60 transition-colors">
                <ItemIcon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="glass-panel w-[52px] h-10 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors" title="Add Custom Layer">
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default LeftToolbar;

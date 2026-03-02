import { MoreHorizontal } from "lucide-react";

// Mock data to match the design snippet roughly
const newsItems = [
  {
    id: 1,
    flag: "https://flagcdn.com/w40/us.png",
    country: "USA",
    tags: [
      { label: "Defense", color: "bg-[#1c2e4a] text-[#5b8cda] border border-[#2b4c7e]" },
      { label: "Economy", color: "bg-[#3d2b24] text-[#dca568] border border-[#5d4030]" }
    ],
    time: "3h ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
    highlight: "imstiiniing, eaotteen, keywords.",
  },
  {
    id: 2,
    flag: "https://flagcdn.com/w40/za.png",
    country: "South Africa",
    tags: [
      { label: "Defense", color: "bg-[#1c2e4a] text-[#5b8cda] border border-[#2b4c7e]" },
      { label: "Ambar", color: "bg-[#3d3319] text-[#d6b048] border border-[#5d4f26]" }
    ],
    time: "3h ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
    highlight: "marnethane, eartnicing, nenoelatny, keywords.",
  },
  {
    id: 3,
    flag: "https://flagcdn.com/w40/ru.png",
    country: "Russia",
    tags: [
      { label: "Defense", color: "bg-[#1c2e4a] text-[#5b8cda] border border-[#2b4c7e]" },
      { label: "Economy", color: "bg-[#3d2b24] text-[#dca568] border border-[#5d4030]" }
    ],
    time: "3h ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
    highlight: "earioicmg, imeiciet.",
  },
  {
    id: 4,
    flag: "https://flagcdn.com/w40/ro.png", // Roughly trying to match flags in design (Romania/Chad or similar tricolor)
    country: "Romania",
    tags: [
      { label: "Defense", color: "bg-[#1c2e4a] text-[#5b8cda] border border-[#2b4c7e]" },
      { label: "Ambar", color: "bg-[#3d3319] text-[#d6b048] border border-[#5d4f26]" }
    ],
    time: "3h ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore magna, ",
    highlight: "metteiidurg, vartlasa.",
  },
  {
    id: 5,
    flag: "https://flagcdn.com/w40/de.png",
    country: "Germany",
    tags: [
      { label: "Defense", color: "bg-[#1c2e4a] text-[#5b8cda] border border-[#2b4c7e]" },
      { label: "Economy", color: "bg-[#3d2b24] text-[#dca568] border border-[#5d4030]" }
    ],
    time: "3h ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna, ",
    highlight: "censsetetur, nenocistos, renwordsa.",
  },
  {
    id: 6,
    flag: "https://flagcdn.com/w40/co.png",
    country: "Colombia",
    tags: [
      { label: "Defense", color: "bg-[#1c2e4a] text-[#5b8cda] border border-[#2b4c7e]" },
      { label: "Ambar", color: "bg-[#3d3319] text-[#d6b048] border border-[#5d4f26]" }
    ],
    time: "3h ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna, eatncina, ",
    highlight: "eonsectetur, seyweats.",
  }
];

export default function NewsList() {
  return (
    <div className="flex flex-col h-full bg-[#141d2b] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-medium text-sm">News intelligence</h2>
        <button className="text-dash-text-muted hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#192436] border border-dash-border/60 rounded-lg p-3 hover:border-dash-border transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <img 
                    src={item.flag} 
                    alt={item.country} 
                    className="w-5 h-3.5 object-cover rounded-sm border border-dash-border/50"
                  />
                  {item.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-dash-text-muted">{item.time}</span>
              </div>
              
              <p className="text-xs text-dash-text leading-relaxed">
                {item.text}
                <span className="text-dash-yellow font-medium">{item.highlight}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

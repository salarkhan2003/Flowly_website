import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  ChevronRight, 
  Folder, 
  Sparkles, 
  Calendar, 
  Search, 
  Pin, 
  Archive, 
  Star, 
  Plus, 
  Send, 
  Bot, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Check, 
  CloudOff, 
  FileText, 
  X,
  Lock,
  ArrowUpRight,
  Sparkle,
  MoreVertical,
  Laptop
} from 'lucide-react';
import { Project, Task, Note, ChatMessage } from '../types';

export default function InteractiveAppMockup() {
  // Mockup theme state (Dark / Light) independent of landing page
  const [mockTheme, setMockTheme] = useState<'dark' | 'light'>('dark');
  
  // Navigation tabs in mockery
  type Tab = 'brief' | 'notes' | 'tasks' | 'calendar' | 'ai';
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  
  // States of mockup
  const [projects] = useState<Project[]>([
    { id: 'p1', name: 'Website Redesign', color: 'bg-rose-500 text-rose-500' },
    { id: 'p2', name: 'Marketing Launch', color: 'bg-sky-500 text-sky-500' },
    { id: 'p3', name: 'Personal Finances', color: 'bg-emerald-500 text-emerald-500' },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'n1',
      title: 'Marketing Strategy Pitch',
      content: '## Launch Plan\n\n1. Launch completely off-grid.\n2. Leverage Reddit communities focused on offline-first advocates, privacy enthusiasts, and local AI enthusiasts.\n3. Distribute an early alpha build via GitHub Releases.\n4. Highlight the Groq llama-3.3 local context integration.',
      projectId: 'p2',
      tags: ['marketing', 'pitch', 'draft'],
      pinned: true,
      archived: false,
      updatedAt: 'May 24, 2026'
    },
    {
      id: 'n2',
      title: 'Website Interface Concepts',
      content: '# Flowly Mockup Design Principles\n\n- Dark mode default with high-contrast slate.\n- Extremely compact and data-dense typography.\n- Monospace accents for labels.\n- Micro-animations on list interactions.',
      projectId: 'p1',
      tags: ['design', 'v1'],
      pinned: true,
      archived: false,
      updatedAt: 'May 22, 2026'
    },
    {
      id: 'n3',
      title: 'Tax Deductions & Subscriptions',
      content: 'Remember that Flowly is 100% database-free and offline, meaning zero storage subscription write-offs! \n\nCheck if local llama servers are eligible for hardware tax credits under regional tech R&D bylaws.',
      projectId: 'p3',
      tags: ['finance', 'taxes'],
      pinned: false,
      archived: false,
      updatedAt: 'May 18, 2026'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'Review marketing vector assets with designer', projectId: 'p2', priority: 'High', completed: false, starred: true, dueDate: '2026-05-25' },
    { id: 't2', title: 'Setup GitHub offline deployment script', projectId: 'p1', priority: 'High', completed: true, starred: false, dueDate: '2026-05-24' },
    { id: 't3', title: 'Draft release notes v1.0.0-rc1', projectId: 'p1', priority: 'Medium', completed: false, starred: true, dueDate: '2026-05-28' },
    { id: 't4', title: 'Audit local AsyncStorage backup encryption', projectId: 'p3', priority: 'High', completed: false, starred: false, dueDate: '2026-05-26' },
    { id: 't5', title: 'Schedule community launch on ProductHunt', projectId: 'p2', priority: 'Low', completed: false, starred: false, dueDate: '2026-06-02' },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'm1', sender: 'assistant', text: "Hello! I am Flowly, your private offline AI processor. I analyze your notes, tasks, and projects on-device. Ask me anything, or try creating some items using voice/text prompts!", timestamp: '14:44' }
  ]);

  // Selected details
  const [selectedNoteId, setSelectedNoteId] = useState<string>('n1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newTaskProject, setNewTaskProject] = useState<string>('p1');
  
  // Custom user input in Chat
  const [userChatInput, setUserChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  // Read filtered items
  const activeNote = useMemo(() => notes.find(n => n.id === selectedNoteId) || notes[0], [notes, selectedNoteId]);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchSearch = searchQuery ? (
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) : true;
      const matchProject = selectedProjectId ? n.projectId === selectedProjectId : true;
      return matchSearch && matchProject && !n.archived;
    });
  }, [notes, searchQuery, selectedProjectId]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchSearch = searchQuery ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      const matchProject = selectedProjectId ? t.projectId === selectedProjectId : true;
      return matchSearch && matchProject;
    });
  }, [tasks, searchQuery, selectedProjectId]);

  // Handlers
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleToggleStarTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, starred: !t.starred } : t));
  };

  const handleTogglePinNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const handleArchiveNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n));
    if (selectedNoteId === id) {
      const activeRemaining = notes.find(n => n.id !== id && !n.archived);
      if (activeRemaining) setSelectedNoteId(activeRemaining.id);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: newTaskTitle.trim(),
      projectId: newTaskProject || undefined,
      priority: newTaskPriority,
      completed: false,
      starred: false,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] // 2 days from now
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const handleInlineAiAction = (actionType: 'summary' | 'extract') => {
    if (!activeNote) return;
    setIsAiTyping(true);
    setActiveTab('ai');
    
    // Create prompt message mimicking local AI trigger
    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: actionType === 'summary' 
        ? `Summarize note "${activeNote.title}"` 
        : `Extract action tasks from note "${activeNote.title}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystemAction: true,
      actionDetails: activeNote.title
    };
    
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let responseText = "";
      if (actionType === 'summary') {
        responseText = `### Local AI Summary of "${activeNote.title}":\n\n**Main Objective:** Highlight the release framework for Flowly v1.0.0, emphasizing local-first distribution, offline Groq context index, and community seeding.\n\n**Key Takeaways:**\n- High leverage on off-grid communities.\n- Zero cloud telemetry enhances security and appeal for power-users.\n- Github Releases will serve as the trusted binary download host to bypass store sandboxing limitations.`;
      } else {
        responseText = `### Extracted Action Tasks:\n\nI've analyzed the note. Here are high-potential tasks to import:\n\n1. **[High Priority]** Build offline script for binary hashing (Added to your backlog!)\n2. **[Medium Priority]** Draft public announcement text for flight-deck offline devs.\n3. **[Low Priority]** Seed initial alpha test packages to initial community members.\n\nWould you like me to auto-assign any of these to your projects?`;
        
        // Add one of these dynamically to the task list
        const autoTask: Task = {
          id: `t_extracted`,
          title: "Build offline script for binary hashing",
          projectId: 'p1',
          priority: 'High',
          completed: false,
          starred: true,
          dueDate: '2026-05-26'
        };
        setTasks(prev => {
          if (!prev.some(t => t.id === 't_extracted')) {
            return [autoTask, ...prev];
          }
          return prev;
        });
      }

      setChatMessages(prev => [...prev, {
        id: `m_${Date.now()}_reply`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsAiTyping(false);
    }, 1200);
  };

  const simulateAiMessage = (promptText: string) => {
    setUserChatInput('');
    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    setTimeout(() => {
      let replyText = "";
      const textLower = promptText.toLowerCase();

      if (textLower.includes('review') || textLower.includes('tomorrow') || textLower.includes('domain')) {
        replyText = "Recognized Natural Language Instruction: **Task Creation**\n\nI have successfully executed this task trigger offline. \n- **Created Task:** `Buy domain names` · priority: High\n- **Project:** `Marketing Launch`\n- **Due Date:** Tomorrow.\n\nThe new task has been hot-loaded directly into your local database. You can see it live in your Tasks tab now!";
        
        // Actually insert the task in mock state!
        const generatedTask: Task = {
          id: `t_ai_${Date.now()}`,
          title: "Buy domain names for Flowly landing page",
          projectId: 'p2',
          priority: 'High',
          completed: false,
          starred: true,
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
        };
        setTasks(prev => [generatedTask, ...prev]);

      } else if (textLower.includes('summarize') || textLower.includes('marketing') || textLower.includes('audit')) {
        replyText = "Recognized Natural Language Query: **Notes Search & Summarization**\n\nAccording to your **Marketing Strategy Pitch** note, you plan to:\n1. Launch completely off-grid targeting local developers.\n2. Leverage specialized Reddit and GitHub channels.\n3. Keep 0% telemetry to win privacy-conscious early adopters.\n\nYou have **2 related tasks** pending:\n- *Review marketing vector assets with designer* (High priority)\n- *Schedule community launch on ProductHunt* (Low priority)";
      } else if (textLower.includes('project') || textLower.includes('website redesign') || textLower.includes('release notes')) {
        replyText = "Recognized Natural Language Instruction: **New Task on Class**\n\nDone! I've created the task **'Draft release notes for Website Redesign'**, categorized under *Website Redesign* with a due date of this coming Friday.\n\nEverything is recorded instantly. No central server was contacted!";
        
        const generatedTask: Task = {
          id: `t_ai_proj_${Date.now()}`,
          title: "Draft release notes for Website Redesign",
          projectId: 'p1',
          priority: 'Medium',
          completed: false,
          starred: false,
          dueDate: '2026-05-29'
        };
        setTasks(prev => [generatedTask, ...prev]);
      } else {
        replyText = `Recognized Off-Grid Inquiry: *"${promptText}"*\n\nSince I am running locally with direct memory indices, I mapped this across your 3 notes and 5 tasks. \n\n*Reflecting offline:* You are currently making rapid progress. 1 task is completed, 4 are remaining. Your primary hub is the **Website Redesign** project. Let me know if you want me to append a note, create a task constraint, or summarize regional files.`;
      }

      setChatMessages(prev => [...prev, {
        id: `m_${Date.now()}_reply`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsAiTyping(false);
    }, 1500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;
    simulateAiMessage(userChatInput.trim());
  };

  return (
    <div className="w-full" id="interactive-demo">
      {/* Simulation Window Frame */}
      <div className={`relative w-full rounded-2xl border ${
        mockTheme === 'dark' 
          ? 'bg-zinc-950/90 border-zinc-800 text-zinc-100 shadow-2xl shadow-violet-950/20' 
          : 'bg-white border-zinc-200 text-zinc-800 shadow-xl shadow-zinc-200/50'
      } overflow-hidden transition-all duration-300`}>
        
        {/* Mock Window Topbar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          mockTheme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
        }`}>
          {/* OS Windows Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className={`text-[11px] font-mono ml-2 ${mockTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              flowly_desktop_v1.0.app
            </span>
          </div>

          {/* Offline/Online indicators & Theme toggle */}
          <div className="flex items-center gap-3">
            {/* Local Badge */}
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono ${
              mockTheme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-150 text-zinc-600'
            }`}>
              <CloudOff className="w-3 h-3 text-amber-500" />
              <span>OFFLINE PORT</span>
            </div>

            {/* Simulated latency banner */}
            <span className={`text-[10px] font-mono hidden md:inline ${mockTheme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'}`}>
              ● Latency: 0ms (Local Storage)
            </span>

            {/* Toggle mock interface theme */}
            <button 
              onClick={() => setMockTheme(mockTheme === 'dark' ? 'light' : 'dark')}
              className={`p-1.5 rounded transition-colors ${
                mockTheme === 'dark' 
                  ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' 
                  : 'hover:bg-zinc-200 text-zinc-500 hover:text-black'
              }`}
              title="Toggle interactive dark/light app theme"
            >
              {mockTheme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Application Layout */}
        <div className="flex h-[550px] flex-col md:flex-row overflow-hidden font-sans">
          
          {/* Sidebar */}
          <div className={`w-full md:w-56 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r ${
            mockTheme === 'dark' ? 'bg-zinc-950/50 border-zinc-900' : 'bg-zinc-50/50 border-zinc-200'
          } p-3 overflow-y-auto`}>
                       {/* Mock User Node */}
            <div className="flex items-center gap-2.5 px-2 py-1 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#00FF94] flex items-center justify-center font-bold text-black text-xs">
                M
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold">My Second Brain</span>
                <span className={`text-[9px] font-mono ${mockTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Owner: Morgan (Local Host)
                </span>
              </div>
            </div>

            {/* Local Search Input */}
            <div className={`relative mb-4 flex items-center rounded-lg border ${
              mockTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
            } px-2.5 py-1.5`}>
              <Search className="w-3.5 h-3.5 text-zinc-500 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs w-full p-0 leading-none placeholder-zinc-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-0.5 text-zinc-500 hover:text-zinc-200">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Navigation Lists */}
            <div className="space-y-1 text-xs">
              <button 
                onClick={() => { setActiveTab('brief'); setSelectedProjectId(null); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  activeTab === 'brief' 
                    ? 'bg-[#00FF94]/10 text-[#00FF94] font-bold' 
                    : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkle className="w-3.5 h-3.5" />
                  <span>Daily Morning Brief</span>
                </div>
                <span className="px-1 text-[8px] font-mono bg-emerald-950/30 border border-emerald-800/20 text-[#00FF94] rounded uppercase font-bold">AI</span>
              </button>

              <button 
                onClick={() => { setActiveTab('notes'); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  activeTab === 'notes' && !selectedProjectId
                    ? 'bg-zinc-800 text-white font-medium' 
                    : (activeTab === 'notes' && selectedProjectId ? 'text-zinc-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50')
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Notes Catalog</span>
                </div>
                <span className="bg-zinc-800 text-zinc-500 text-[10px] px-1.5 py-0.1 rounded-full">{notes.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('tasks'); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  activeTab === 'tasks' && !selectedProjectId
                    ? 'bg-zinc-800 text-white font-medium' 
                    : (activeTab === 'tasks' && selectedProjectId ? 'text-zinc-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50')
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Task Deck</span>
                </div>
                <span className="bg-zinc-800 text-zinc-500 text-[10px] px-1.5 py-0.1 rounded-full">
                  {tasks.filter(t => !t.completed).length}
                </span>
              </button>

              <button 
                onClick={() => { setActiveTab('calendar'); setSelectedProjectId(null); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  activeTab === 'calendar' 
                    ? 'bg-zinc-800 text-white font-medium' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Local Calendar</span>
                </div>
              </button>

              <button 
                onClick={() => { setActiveTab('ai'); setSelectedProjectId(null); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left ${
                  activeTab === 'ai' 
                    ? 'bg-[#00FF94] text-black font-bold uppercase shadow-md shadow-[#00FF94]/20' 
                    : 'bg-black border border-zinc-850 text-zinc-300 hover:border-[#00FF94]/30 hover:text-[#00FF94]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5" />
                  <span className="font-semibold">Flowly AI Assistant</span>
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]"></span>
                </span>
              </button>
            </div>

            {/* Projects Divider */}
            <div className="mt-6 mb-2 px-2.5 flex items-center justify-between text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              <span>Color-Coded Projects</span>
              <Folder className="w-3 h-3 text-zinc-600" />
            </div>

            <div className="space-y-0.5 text-xs">
              <button
                onClick={() => setSelectedProjectId(null)}
                className={`w-full text-left px-2.5 py-1 rounded ${
                  selectedProjectId === null 
                    ? 'text-white font-medium underline underline-offset-4 decoration-zinc-600' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                All Projects
              </button>

              {projects.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                    if (activeTab === 'ai' || activeTab === 'brief' || activeTab === 'calendar') {
                      setActiveTab('notes');
                    }
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1 rounded transition-colors text-left ${
                    selectedProjectId === proj.id 
                      ? 'bg-zinc-800 text-white font-medium' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${proj.color.split(' ')[0]}`}></span>
                  <span className="truncate">{proj.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto pt-4 text-[10px] font-mono text-zinc-500 border-t border-zinc-900/50">
              <p>🗄️ Database: Local storage</p>
              <p className="mt-1">🔒 Sync Type: None (Private)</p>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* === TAB 1: DAILY BRIEF === */}
            {activeTab === 'brief' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 text-left">
                <div className="flex items-center justify-between border-b pb-3 border-zinc-800">
                  <div>
                    <h2 className="text-lg font-display font-semibold tracking-tight">Your Daily AI Morning Brief</h2>
                    <p className={`text-xs ${mockTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Compiled completely on route using on-device context keys</p>
                  </div>
                  <Sparkle className="w-5 h-5 text-[#00FF94] animate-pulse" />
                </div>

                <div className={`p-4 rounded-xl border ${
                  mockTheme === 'dark' ? 'bg-zinc-900/40 border-[#00FF94]/20' : 'bg-[#00FF94]/5 border-[#00FF94]/10'
                } space-y-3`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">☕</span>
                    <h3 className="font-semibold text-sm">Good morning, Morgan. Here is your offline telemetry summary:</h3>
                  </div>
                  
                  <p className="text-xs leading-relaxed text-zinc-400">
                    You have <strong className="text-[#00FF94]">4 active tasks</strong> scheduled or pending for today, including <strong className="text-rose-400">3 high-priority objectives</strong>. Everything remains locally preserved.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-800 space-y-1.5">
                      <span className="text-xs font-semibold text-zinc-400">💡 Today's Quick Focus Focus</span>
                      <p className="text-xs text-zinc-300">
                        Work is heavy on <span className="text-sky-400">#Marketing Launch</span>. The designer meeting requires review files. Consider resolving the local hashing script first to clear dependencies.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-800 space-y-1.5">
                      <span className="text-xs font-semibold text-zinc-400">🔥 Streak Status</span>
                      <p className="text-xs text-zinc-300">
                        7 Days Consistent Local Commits. You completed task <strong>Setup deploy script</strong> yesterday!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Unresolved Tasks List in brief */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">High Priority Action Items for Today</h4>
                  <div className="space-y-1">
                    {tasks.filter(t => !t.completed && t.priority === 'High').map(t => (
                      <div key={t.id} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/20 border border-zinc-800/60 hover:bg-zinc-900/40 transition-colors">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-xs font-medium">{t.title}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950/40 border border-rose-900/30 text-rose-400 font-semibold uppercase">{t.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 border border-dashed border-zinc-800 rounded-lg flex items-center justify-between text-xs text-zinc-500">
                  <span>How was this breakfast brief generated?</span>
                  <span className="font-mono text-[10px] text-zinc-500">Local Groq compilation (llama-3.3-70b-versatile)</span>
                </div>
              </div>
            )}

            {/* === TAB 2: NOTES CATALOG === */}
            {activeTab === 'notes' && (
              <div className="flex-1 flex overflow-hidden">
                {/* Notes list */}
                <div className={`w-48 flex-shrink-0 border-r ${
                  mockTheme === 'dark' ? 'border-zinc-900 bg-zinc-950/20' : 'border-zinc-200 bg-zinc-50/20'
                } flex flex-col`}>
                  <div className="p-2 border-b border-zinc-800/40 flex items-center justify-between text-[10px] uppercase font-semibold text-zinc-500">
                    <span>Notes ({filteredNotes.length})</span>
                    <button 
                      onClick={() => {
                        const newNote: Note = {
                          id: `n_${Date.now()}`,
                          title: 'Untitled Note',
                          content: '# Untitled Note\nType markdown content here...',
                          projectId: selectedProjectId || 'p1',
                          tags: ['new'],
                          pinned: false,
                          archived: false,
                          updatedAt: 'Just now'
                        };
                        setNotes([newNote, ...notes]);
                        setSelectedNoteId(newNote.id);
                      }}
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      title="Add a new note to local brain"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 p-1">
                    {filteredNotes.map(n => (
                      <button
                        key={n.id}
                        onClick={() => setSelectedNoteId(n.id)}
                        className={`w-full text-left p-2 rounded-md transition-all ${
                          selectedNoteId === n.id 
                            ? 'bg-zinc-800 text-white' 
                            : 'hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {n.pinned && <Pin className="w-2.5 h-2.5 text-[#00FF94] flex-shrink-0 transform rotate-45" />}
                          <p className="text-xs font-medium truncate">{n.title || 'Untitled'}</p>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1 truncate">{n.content.replace(/[#*`\n]/g, '')}</p>
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {n.tags.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[8px] px-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-zinc-400">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                    {filteredNotes.length === 0 && (
                      <div className="p-4 text-center text-xs text-zinc-600">No notes matched query.</div>
                    )}
                  </div>
                </div>

                {/* Active Note Editor Preview */}
                <div className="flex-1 flex flex-col overflow-hidden text-left bg-zinc-950/10">
                  {activeNote ? (
                    <>
                      {/* Editor top actions */}
                      <div className="flex items-center justify-between p-3 border-b border-zinc-900 bg-zinc-900/20">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                          <span>Updated: {activeNote.updatedAt}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {/* AI Assistant context shortcuts */}
                          <button 
                            onClick={() => handleInlineAiAction('summary')}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/30 border border-emerald-800/30 text-[#00FF94] hover:bg-emerald-950/65 transition-all text-[11px] font-medium"
                          >
                            <Sparkles className="w-3 h-3 text-[#00FF94]" />
                            <span>AI Summarize</span>
                          </button>
                          
                          <button 
                            onClick={() => handleInlineAiAction('extract')}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/50 border border-blue-800/40 text-blue-400 hover:bg-blue-900/80 transition-all text-[11px] font-medium"
                          >
                            <Plus className="w-3 h-3 text-blue-400" />
                            <span>AI Actions Extract</span>
                          </button>

                          <button 
                            onClick={(e) => handleTogglePinNote(activeNote.id, e)}
                            className={`p-1.5 rounded hover:bg-zinc-800 transition-colors ${activeNote.pinned ? 'text-[#00FF94]' : 'text-zinc-500'}`}
                            title={activeNote.pinned ? "Pinned Note" : "Pin Note"}
                          >
                            <Pin className="w-3.5 h-3.5 transform rotate-45" />
                          </button>

                          <button 
                            onClick={(e) => handleArchiveNote(activeNote.id, e)}
                            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-rose-400 transition-colors"
                            title="Archive Note"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Editor Fields */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <input 
                          type="text" 
                          value={activeNote.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNotes(prev => prev.map(n => n.id === activeNote.id ? { ...n, title: val } : n));
                          }}
                          className={`w-full bg-transparent text-lg font-display font-semibold outline-none border-b border-transparent focus:border-zinc-800 pb-1.5 ${
                            mockTheme === 'dark' ? 'text-white' : 'text-zinc-900'
                          }`}
                          placeholder="Untitled Note Key"
                        />

                        {/* Tags */}
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <span className="text-zinc-500 font-mono text-[10px]">TAGS:</span>
                          {activeNote.tags.map((tag, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] flex items-center gap-1">
                              #{tag}
                              <button 
                                onClick={() => {
                                  setNotes(prev => prev.map(n => n.id === activeNote.id ? { ...n, tags: n.tags.filter(t => t !== tag) } : n));
                                }}
                                className="text-zinc-600 hover:text-rose-400"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                          <button 
                            onClick={() => {
                              const tagInput = prompt("Enter tag name (no #):");
                              if (tagInput) {
                                setNotes(prev => prev.map(n => n.id === activeNote.id ? { ...n, tags: [...n.tags, tagInput.trim().toLowerCase()] } : n));
                              }
                            }}
                            className="px-1.5 py-0.5 rounded border border-dashed border-zinc-800 text-zinc-500 hover:text-zinc-300 text-[10px] flex items-center gap-0.5"
                          >
                            <Plus className="w-2.5 h-2.5" /> Tag
                          </button>
                        </div>

                        {/* Rich text editing area preview */}
                        <textarea 
                          value={activeNote.content}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNotes(prev => prev.map(n => n.id === activeNote.id ? { ...n, content: val } : n));
                          }}
                          className={`w-full h-64 bg-transparent resize-none outline-none font-mono text-xs leading-relaxed ${
                            mockTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                          }`}
                          placeholder="Markdown files support..."
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8">
                      <FileText className="w-10 h-10 text-zinc-700 mb-2" />
                      <p className="text-xs">Select or add a local markdown note to begin offline compilation.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === TAB 3: TASK DECK === */}
            {activeTab === 'tasks' && (
              <div className="flex-1 flex flex-col overflow-hidden text-left p-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-zinc-800">
                  <div>
                    <h2 className="text-lg font-display font-semibold tracking-tight">Your Task Backlog</h2>
                    <p className={`text-xs ${mockTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {selectedProjectId ? `Filtered by ${projects.find(p=>p.id===selectedProjectId)?.name}` : 'Tracking tasks fully client-side'}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    Offline Lock Active
                  </span>
                </div>

                {/* Quick Add Form */}
                <form onSubmit={handleAddTask} className="flex gap-2 items-end bg-zinc-900/20 p-3 rounded-lg border border-zinc-800/80">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Add Task</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Audit sqlite indexes"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full bg-transparent text-xs rounded border border-zinc-800 px-3 py-2 text-zinc-200 outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  </div>
                  
                  <div className="w-24 space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Priority</label>
                    <select 
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                      className="w-full bg-zinc-950 text-xs rounded border border-zinc-800 p-1.5 text-zinc-300 outline-none focus:border-zinc-700"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="w-32 space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Project</label>
                    <select 
                      value={newTaskProject}
                      onChange={(e) => setNewTaskProject(e.target.value)}
                      className="w-full bg-zinc-950 text-xs rounded border border-zinc-800 p-1.5 text-zinc-300 outline-none focus:border-zinc-700"
                    >
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="p-2 px-3 rounded bg-[#00FF94] hover:bg-emerald-400 text-black text-xs font-bold uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> ADD
                  </button>
                </form>

                {/* Tasks List */}
                <div className="flex-1 overflow-y-auto space-y-1.5">
                  {filteredTasks.map(t => {
                    const matchedProj = projects.find(p => p.id === t.projectId);
                    return (
                      <div 
                        key={t.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          t.completed 
                            ? 'bg-zinc-950/20 border-zinc-950 opacity-40' 
                            : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleToggleTask(t.id)}
                            className="text-zinc-600 hover:text-[#00FF94] p-0.5"
                          >
                            <div className={`w-4 items-center justify-center flex h-4 rounded border ${
                              t.completed ? 'bg-zinc-850 border-[#00FF94] text-[#00FF94]' : 'border-zinc-700'
                            }`}>
                              {t.completed && <Check className="w-3 h-3 text-[#00FF94]" />}
                            </div>
                          </button>

                          <div>
                            <p className={`text-xs font-medium leading-normal ${
                              t.completed ? 'line-through text-zinc-500 font-normal' : ''
                            }`}>
                              {t.title}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-1">
                              {matchedProj && (
                                <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-500">
                                  <span className={`w-1.5 h-1.5 rounded-full ${matchedProj.color.split(' ')[0]}`}></span>
                                  {matchedProj.name}
                                </span>
                              )}
                              
                              {t.dueDate && (
                                <span className="text-[9px] font-mono text-zinc-500">
                                  📅 {t.dueDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right side priorities/actions */}
                        <div className="flex items-center gap-2.5">
                          {/* Priority tag */}
                          <span className={`text-[8px] px-1.5 py-0.1 border rounded font-mono font-semibold uppercase ${
                            t.priority === 'High' 
                              ? 'bg-rose-950/20 border-rose-900/30 text-rose-400' 
                              : t.priority === 'Medium' 
                                ? 'bg-amber-950/20 border-amber-900/30 text-amber-500' 
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                          }`}>
                            {t.priority}
                          </span>

                          {/* Star */}
                          <button 
                            onClick={() => handleToggleStarTask(t.id)}
                            className={`p-0.5 transition-colors ${t.starred ? 'text-amber-500' : 'text-zinc-600 hover:text-zinc-400'}`}
                          >
                            <Star className="w-3.5 h-3.5" fill={t.starred ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {filteredTasks.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 text-xs">No tasks matched search filter inside storage.</div>
                  )}
                </div>
              </div>
            )}

            {/* === TAB 4: CALENDAR VIEW === */}
            {activeTab === 'calendar' && (
              <div className="flex-1 flex flex-col text-left p-5 space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-3 border-zinc-800">
                  <div>
                    <h2 className="text-lg font-display font-semibold tracking-tight">Offline Calendar Timeline</h2>
                    <p className="text-xs text-zinc-400">Syncs locally to index task deadlines instantly</p>
                  </div>
                  <Calendar className="w-5 h-5 text-zinc-500" />
                </div>

                {/* Calendar Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Calendar main map */}
                  <div className="md:col-span-2 p-3 bg-zinc-900/40 rounded-xl border border-zinc-900">
                    <div className="flex items-center justify-between mb-3 text-xs font-semibold px-1">
                      <span>May 2026</span>
                      <div className="flex gap-2">
                        <span className="text-[10px] text-zinc-500 cursor-pointer hover:text-white">&larr; Pred</span>
                        <span className="text-[10px] text-zinc-500 cursor-pointer hover:text-white">Next &rarr;</span>
                      </div>
                    </div>
                    {/* Month Days mock */}
                    <div className="grid grid-cols-7 gap-1 text-[10px] font-mono text-center mb-1 text-zinc-500">
                      <div>SU</div><div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center font-mono">
                      {/* empty days */}
                      <div className="text-[10px] text-zinc-800 p-2 border border-zinc-950/20">26</div>
                      <div className="text-[10px] text-zinc-800 p-2 border border-zinc-950/20">27</div>
                      <div className="text-[10px] text-zinc-800 p-2 border border-zinc-950/20">28</div>
                      <div className="text-[10px] text-zinc-800 p-2 border border-zinc-950/20">29</div>
                      <div className="text-[10px] text-zinc-800 p-2 border border-zinc-950/20">30</div>
                      <div className="text-[10px] text-zinc-500 p-2 border border-zinc-950/20">1</div>
                      <div className="text-[10px] text-zinc-500 p-2 border border-zinc-950/20">2</div>
                      {/* Row 2 */}
                      {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(d => (
                        <div key={d} className="text-[10px] p-2 hover:bg-zinc-800 text-zinc-400 rounded-md cursor-pointer border border-transparent">
                          {d}
                        </div>
                      ))}
                      {/* Active Day May 24 */}
                      <div className="text-[10px] p-2 bg-[#00FF94] font-black text-black rounded-md cursor-pointer relative">
                        24
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      </div>
                      {/* May 25 with tasks */}
                      <div className="text-[10px] p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md cursor-pointer relative">
                        25
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                      </div>
                      {/* Remaining month */}
                      {[26, 27, 28, 29, 30, 31].map(d => {
                        const hasTask = d === 26 || d === 28;
                        return (
                          <div key={d} className="text-[10px] p-2 hover:bg-zinc-800 text-zinc-300 rounded-md cursor-pointer relative">
                            {d}
                            {hasTask && (
                              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#00FF94] rounded-full"></span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Task Timeline details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Scheduled Tasks</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-zinc-900 border-l-2 border-emerald-500 text-xs">
                        <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">MAY 24 (TODAY)</span>
                        <span className="font-semibold line-through text-zinc-400">Setup GitHub offline deployment</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-900 border-l-2 border-sky-500 text-xs">
                        <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">MAY 25 (TOMORROW)</span>
                        <span className="font-semibold text-zinc-200">Review marketing vector assets</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-900 border-l-2 border-[#00FF94] text-xs">
                        <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">MAY 28</span>
                        <span className="font-semibold text-zinc-200 font-medium">Draft release notes v1.0.0-rc1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === TAB 5: AI ASSISTANT CHAT === */}
            {activeTab === 'ai' && (
              <div className="flex-1 flex flex-col overflow-hidden text-left bg-zinc-950/30">
                {/* Chat Top Info Banner */}
                <div className="p-3 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4.5 h-4.5 text-[#00FF94]" />
                    <div>
                      <h3 className="text-xs font-semibold leading-none">Flowly Local Intelligence</h3>
                      <p className="text-[9px] font-mono text-emerald-500 mt-1">
                        ● Preserved memory scope: 3 notes, 5 tasks, 3 projects active
                      </p>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Groq Llama-3.3-70B
                  </span>
                </div>

                {/* Chat Logs */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      {/* Meta */}
                      <span className="text-[9px] font-mono text-zinc-500 mb-0.5 px-1 flex items-center gap-1">
                        {msg.sender === 'user' ? 'You' : 'Flowly AI'} 
                        <span>·</span> 
                        {msg.timestamp}
                      </span>
                      
                      {/* Body */}
                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-[#00FF94] border-[#00FF94]/50 text-black font-semibold shadow-sm animate-fade-in' 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      }`}>
                        {msg.isSystemAction && (
                          <div className="p-1 px-2 mb-2 rounded bg-zinc-950 border border-zinc-800 text-[#00FF94] text-[10px] font-mono flex items-center gap-1.5 uppercase font-bold tracking-wider">
                            <Sparkles className="w-3 h-3 text-[#00FF94] inline" />
                            <span>System Trigger Action context: "{msg.actionDetails}"</span>
                          </div>
                        )}
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex flex-col items-start max-w-[80%]">
                      <span className="text-[9px] font-mono text-zinc-500 mb-0.5">Flowly agent is compiling...</span>
                      <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs flex items-center gap-2">
                        <span className="animate-ping block w-2 h-2 rounded-full bg-[#00FF94]"></span>
                        <span>Reading on-device SQLite database. Syncing context maps...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatBottomRef} />
                </div>

                {/* Suggestions Quick Command Tags */}
                <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-950/20 flex items-center gap-1.5 overflow-x-auto flex-nowrap scrollbar-none scroll-smooth">
                  <span className="text-[9px] font-mono text-zinc-500 font-semibold mr-1 flex-shrink-0 uppercase">Try clicks:</span>
                  <button 
                    onClick={() => simulateAiMessage("Create a task to buy domain names tomorrow")}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-[10px] transition-all"
                  >
                    "Create task: Buy domain..."
                  </button>
                  <button 
                    onClick={() => simulateAiMessage("Summarize my marketing launch notes")}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-[10px] transition-all"
                  >
                    "Summarize marketing..."
                  </button>
                  <button 
                    onClick={() => simulateAiMessage("Generate a task to draft release notes for Website Redesign")}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-[10px] transition-all"
                  >
                    "Make task: Website Redesign..."
                  </button>
                </div>

                {/* Input form */}
                <form onSubmit={handleSendChat} className="p-3 border-t border-zinc-900 bg-zinc-900/10 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask Flowly AI to summarize, search, or build transactions..."
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    disabled={isAiTyping}
                    className="flex-grow bg-transparent text-xs rounded border border-zinc-850 px-3.5 py-2.5 placeholder-zinc-500 outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 text-zinc-100"
                  />
                  <button 
                    type="submit" 
                    disabled={isAiTyping || !userChatInput.trim()}
                    className="p-2.5 rounded bg-[#00FF94] text-black font-extrabold hover:bg-emerald-450 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Send natural language command to Llama-3 local agent"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Under-dashboard status bar */}
      <div className="flex flex-wrap items-center justify-between mt-3 px-2 text-[11px] font-mono text-zinc-500 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Local Storage encryption key: SHA-256 enabled </span>
        </div>
        <div className="flex items-center gap-3">
          <span>📅 System Time: 2026-05-24</span>
          <span>🧠 Context Model: llama-3.3-70b-local</span>
        </div>
      </div>
    </div>
  );
}

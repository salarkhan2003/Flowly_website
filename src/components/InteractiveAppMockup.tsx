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
  Laptop,
  ArrowLeft,
  Wifi,
  Battery,
  Smartphone
} from 'lucide-react';
import { Project, Task, Note, ChatMessage } from '../types';

export default function InteractiveAppMockup() {
  // Mockup theme state (Dark / Light) independent of landing page
  const [mockTheme, setMockTheme] = useState<'dark' | 'light'>('dark');
  
  // Navigation tabs in mockery
  type Tab = 'brief' | 'notes' | 'tasks' | 'calendar' | 'ai';
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  
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
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 md:py-6" id="interactive-demo">
      {/* 
        PREMIUM PHYSICAL ANDROID TOUCH DEVICE FRAME
        This implements the requested stylish mobile mockup structure with hardware physical ridges, rounded bezel,
        camera punch-hole notch, realistic status bar, dynamic light/dark modes, and bottom gestural navigation.
      */}
      <div className={`relative w-[340px] h-[670px] rounded-[48px] bg-[#0c0c0c] text-white shadow-2xl flex flex-col overflow-hidden border-[10px] border-zinc-900 ${
        mockTheme === 'dark' ? 'shadow-[#00FF94]/5 ring-1 ring-zinc-800' : 'shadow-zinc-300/40 ring-1 ring-zinc-200 border-zinc-350 bg-white'
      }`}>
        
        {/* physical tactile tactile ridge power buttons */}
        <div className="absolute top-24 -left-[11px] w-[2px] h-10 bg-zinc-800 rounded-l" />
        <div className="absolute top-36 -left-[11px] w-[2px] h-14 bg-zinc-800 rounded-l" />

        {/* Dynamic front camera punch hole cutout notch */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border border-zinc-950 z-50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-850" />
        </div>

        {/* High fidelity Native Android Mobile Status Bar */}
        <div className={`flex justify-between items-center px-6 pt-3 pb-1 text-[9.5px] font-mono tracking-tight font-black z-40 select-none ${
          mockTheme === 'dark' ? 'text-zinc-500 bg-[#0c0c0c]' : 'text-zinc-600 bg-zinc-100 border-b border-zinc-200/50'
        }`}>
          <div className="flex items-center gap-1">
            <span>14:56</span>
            <span className="text-[7.5px] px-1 py-[0.5px] bg-[#00FF94]/20 text-[#00FF94] font-black rounded-sm border border-[#00FF94]/30">5G</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-[#00FF94] font-extrabold uppercase tracking-widest flex items-center gap-0.5">
              <CloudOff className="w-2.5 h-2.5 text-[#00FF94]" /> local
            </span>
            <Wifi className="w-3 h-3 text-[#00FF94]" />
            <Battery className="w-3.5 h-3.5 text-[#00FF94]" />
          </div>
        </div>

        {/* Dynamic Android Header */}
        <div className={`flex items-center justify-between px-4.5 py-3 border-b z-40 select-none ${
          mockTheme === 'dark' ? 'bg-[#0f0f0f] border-zinc-900 border-b-[1.5px]' : 'bg-zinc-55 border-zinc-205 border-b bg-zinc-50'
        }`}>
          <div className="flex items-center gap-1.5 font-display font-black text-xs">
            <Bot className="w-4 h-4 text-[#00FF52]" />
            <span className="text-[10px] font-mono tracking-widest text-[#00FF94] uppercase font-black">Flowly Android</span>
          </div>

          <button 
            onClick={() => setMockTheme(mockTheme === 'dark' ? 'light' : 'dark')}
            className={`p-1.5 rounded-xl transition-all ${
              mockTheme === 'dark' ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-200 text-zinc-700'
            }`}
            title="Toggle theme on mobile"
          >
            {mockTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#00FF94]" /> : <Moon className="w-3.5 h-3.5 text-zinc-800" />}
          </button>
        </div>

        {/* Dynamic App Mockup Stage viewport layout */}
        <div className={`flex-grow flex flex-col overflow-hidden ${
          mockTheme === 'dark' ? 'bg-[#060606]' : 'bg-white text-zinc-900'
        }`}>

          {/* TAB 1: MORNING SUMMARY */}
          {activeTab === 'brief' && (
            <div className="flex-grow overflow-y-auto p-4 space-y-4 text-left">
              <div className="flex items-center justify-between border-b pb-2 border-zinc-900">
                <div>
                  <h2 className="text-xs font-display font-black text-white uppercase tracking-wider">Morning Brief</h2>
                  <p className="text-[8px] text-[#00FF94] font-mono">On-device SQLite database</p>
                </div>
                <Sparkle className="w-3.5 h-3.5 text-[#00FF94] animate-pulse" />
              </div>

              <div className={`p-3 rounded-2xl border ${
                mockTheme === 'dark' ? 'bg-zinc-950/70 border-zinc-900' : 'bg-[#00FF94]/5 border-emerald-100'
              } space-y-2.5`}>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Morgan, your private SQLite logs confirm <strong className="text-[#00FF94]">{tasks.filter(t => !t.completed).length} pending tasks</strong> scheduled, with <strong className="text-rose-450 font-bold">3 High priority objectives</strong> active today.
                </p>

                <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-900">
                  <span className="text-[8px] font-mono font-bold text-[#00FF94] uppercase">💡 Sweep Priority</span>
                  <p className="text-[9.5px] text-zinc-400 mt-1">Website redesign requires designers review first for final layout assets.</p>
                </div>
              </div>

              {/* Tasks preview List */}
              <div className="space-y-1.5">
                <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Incomplete Priorities:</span>
                {tasks.filter(t => !t.completed && t.priority === 'High').map(t => (
                  <div key={t.id} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-[10px]">
                    <span className="text-zinc-200 truncate pr-3">{t.title}</span>
                    <span className="text-[7.5px] font-mono px-1 rounded bg-rose-950/40 text-rose-455 text-rose-400 border border-rose-900/30 font-bold">HIGH</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: NOTES VAULT CARD INDEX */}
          {activeTab === 'notes' && (
            <div className="flex-grow flex flex-col overflow-hidden">
              {!isEditingNote ? (
                <div className="flex-grow flex flex-col overflow-hidden p-4 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-display font-black text-white uppercase tracking-wider">Notes Vault</h2>
                      <p className="text-[8px] text-zinc-500 font-mono font-bold">Local notes ({notes.length})</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newNote: Note = {
                          id: `n_${Date.now()}`,
                          title: 'New Secure Entry',
                          content: '# New Secure Entry\nType secure notes details here...',
                          projectId: 'p1',
                          tags: ['ideas'],
                          pinned: false,
                          archived: false,
                          updatedAt: 'Just now'
                        };
                        setNotes([newNote, ...notes]);
                        setSelectedNoteId(newNote.id);
                        setIsEditingNote(true);
                      }}
                      className="p-1 px-3 rounded-lg bg-[#00FF94] text-black text-[9px] font-mono font-black uppercase tracking-wider"
                    >
                      <Plus className="w-3 h-3 text-black" /> WRITE
                    </button>
                  </div>

                  <div className="relative flex items-center rounded-lg border border-zinc-90 w-full border-zinc-900 bg-zinc-950 px-2.5 py-1.5 mb-1">
                    <Search className="w-3.5 h-3.5 text-zinc-600 mr-2 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search markdown keys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-[9.5px] w-full outline-none text-zinc-200 placeholder-zinc-550 text-zinc-500"
                    />
                  </div>

                  <div className="flex-grow overflow-y-auto space-y-2">
                    {filteredNotes.map(n => (
                      <button 
                        key={n.id}
                        onClick={() => {
                          setSelectedNoteId(n.id);
                          setIsEditingNote(true);
                        }}
                        className={`w-full text-left p-3 rounded-xl border ${
                          selectedNoteId === n.id ? 'bg-zinc-950 border-[#00FF94]' : 'bg-black/40 border-zinc-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-white truncate">{n.title}</span>
                          <span className="text-[7.5px] font-mono text-zinc-500 shrink-0">{n.updatedAt}</span>
                        </div>
                        <p className="text-[9px] text-zinc-550 text-zinc-500 line-clamp-1">{n.content.replace(/[#*`\n]/g, '')}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col overflow-hidden text-left bg-black/10 select-none">
                  <div className="flex items-center justify-between p-3 border-b border-zinc-910 border-zinc-900 bg-zinc-950">
                    <button 
                      onClick={() => setIsEditingNote(false)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[8px] font-mono font-bold uppercase"
                    >
                      <ArrowLeft className="w-3 h-3 text-[#00FF94]" /> Back
                    </button>
                    <button 
                      onClick={() => handleInlineAiAction('summary')}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900 text-[#00FF52] text-[8px] font-mono font-bold"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#00FF52]" /> Summarize
                    </button>
                  </div>

                  <div className="flex-grow overflow-y-auto p-4 space-y-3">
                    <input 
                      type="text" 
                      value={activeNote.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNotes(prev => prev.map(n => n.id === activeNote.id ? { ...n, title: val } : n));
                      }}
                      className="w-full bg-transparent text-xs font-display font-black uppercase text-white outline-none border-b border-zinc-900 pb-1"
                    />
                    <textarea 
                      value={activeNote.content}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNotes(prev => prev.map(n => n.id === activeNote.id ? { ...n, content: val } : n));
                      }}
                      className="w-full h-[220px] bg-transparent resize-none outline-none font-mono text-[9px] text-zinc-300"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TASKS BACKLOG DECK */}
          {activeTab === 'tasks' && (
            <div className="flex-grow flex flex-col overflow-hidden p-4 space-y-3 text-left">
              <div className="flex items-center justify-between border-b pb-2 border-zinc-900">
                <span className="text-xs font-display font-black text-white uppercase tracking-wider font-bold">Task deck</span>
                <span className="text-[7.5px] font-mono text-[#00FF52] font-semibold">SQLite Storage</span>
              </div>

              <form onSubmit={handleAddTask} className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-900 space-y-1.5 shrink-0">
                <input 
                  type="text" 
                  placeholder="Insert secure task..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-zinc-900 text-[10px] rounded-lg border border-zinc-800 px-2.5 py-1.5 outline-none text-zinc-200 placeholder-zinc-650"
                />
                
                <div className="flex justify-between items-center gap-1.5 pt-0.5">
                  <select 
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="bg-zinc-900 text-[8.5px] rounded border border-zinc-800 p-1 text-zinc-300 outline-none"
                  >
                    <option value="High">🔥 High</option>
                    <option value="Medium">⚡ Medium</option>
                    <option value="Low">💤 Low</option>
                  </select>

                  <button type="submit" className="p-1 px-3 rounded bg-[#00FF94] text-black font-mono font-black text-[9px] uppercase tracking-wider">
                    + ADD TASK
                  </button>
                </div>
              </form>

              <div className="flex-grow overflow-y-auto space-y-1">
                {filteredTasks.map(t => (
                  <div key={t.id} className="flex justify-between items-center p-2 rounded bg-black/40 border border-zinc-900 text-[9.5px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <button onClick={() => handleToggleTask(t.id)} className="w-3.5 h-3.5 rounded border border-zinc-700 flex items-center justify-center shrink-0">
                        {t.completed && <Check className="w-2.5 h-2.5 text-[#00FF94]" />}
                      </button>
                      <span className={`truncate text-zinc-200 ${t.completed ? 'line-through text-zinc-605 text-zinc-600' : ''}`}>{t.title}</span>
                    </div>
                    <span className="text-[7px] font-mono px-1 rounded bg-[#00FF94]/10 text-[#00FF94] shrink-0 font-bold">{t.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CALENDAR AGENDA MATRIX */}
          {activeTab === 'calendar' && (
            <div className="flex-grow overflow-y-auto p-4 space-y-4 text-left">
              <div className="flex items-center justify-between border-b pb-2 border-zinc-900">
                <span className="text-xs font-display font-black text-white uppercase">Planner matrix</span>
                <Calendar className="w-3.5 h-3.5 text-[#00FF94]" />
              </div>

              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-900 font-mono text-[8.5px] text-center">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white">MAY 2026</span>
                  <span className="text-zinc-[650] text-zinc-500 uppercase font-black">off-grid</span>
                </div>
                <div className="grid grid-cols-7 gap-1 font-bold text-zinc-500 mb-1">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 font-semibold text-zinc-600">
                  {Array(23).fill(0).map((x,i) => <span key={i} className="text-zinc-700">{i+1}</span>)}
                  <span className="bg-[#00FF94] text-black font-black rounded-sm">24</span>
                  <span className="bg-zinc-850 text-white rounded-sm">25</span>
                  {Array(6).fill(0).map((x,i) => <span key={i} className="text-zinc-400">{26+i}</span>)}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI CHAT CO-PILOT */}
          {activeTab === 'ai' && (
            <div className="flex-grow flex flex-col overflow-hidden text-left bg-[#050505]/40 select-none">
              <div className="p-2 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#00FF94]" />
                  <span className="text-[9.5px] font-mono font-extrabold uppercase tracking-widest text-[#00FF94]">Flowly Llama bot</span>
                </div>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-3 select-text text-[9px]">
                {chatMessages.map(m => (
                  <div key={m.id} className={`p-2 rounded-2xl max-w-[85%] border ${
                    m.sender === 'user' ? 'bg-[#00FF94] border-[#00FF94] text-black ml-auto font-bold animate-fade-in' : 'bg-zinc-950 border-zinc-900 text-zinc-300 mr-auto'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-90 w-full border-zinc-900 text-zinc-500 flex items-center gap-1">
                    <span className="animate-ping block w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                    <span>Llama scanning databases...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* prompts row shortcut layout */}
              <div className="p-1 px-3 border-t border-zinc-905 border-zinc-900 bg-zinc-950 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none flex-nowrap">
                <button 
                  onClick={() => simulateAiMessage("Add task to buy domains tomorrow")}
                  className="px-2 py-0.5 rounded-full bg-zinc-900 text-[8px] text-[#00FF94] font-bold shrink-0 font-mono"
                >
                  "Buy domains mock..."
                </button>
              </div>

              <form onSubmit={handleSendChat} className="p-2 border-t border-zinc-90 w-full border-zinc-900 bg-zinc-950 flex gap-1.5 shrink-0">
                <input 
                  type="text" 
                  placeholder="Ask Llama chatbot..."
                  value={userChatInput}
                  onChange={(e) => setUserChatInput(e.target.value)}
                  disabled={isAiTyping}
                  className="flex-grow bg-[#0c0c0c] text-[9.5px] rounded-lg border border-zinc-800 px-3 py-1.5 outline-none text-white placeholder-zinc-500"
                />
                <button type="submit" className="p-1 px-2 rounded-lg bg-[#00FF94] text-black font-black">
                  <Send className="w-3 h-3 text-black" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Android Native Navigation Footer Bar */}
        <div className={`flex justify-around items-center py-2 border-t select-none ${
          mockTheme === 'dark' ? 'bg-[#0a0a0a] border-zinc-900' : 'bg-zinc-100 border-zinc-200'
        }`}>
          {[
            { id: 'brief', icon: <Sparkle className="w-3.5 h-3.5" />, label: 'Brief' },
            { id: 'notes', icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Notes' },
            { id: 'tasks', icon: <CheckSquare className="w-3.5 h-3.5" />, label: 'Tasks' },
            { id: 'calendar', icon: <Calendar className="w-3.5 h-3.5" />, label: 'Calendar' },
            { id: 'ai', icon: <Bot className="w-3.5 h-3.5" />, label: 'AI' }
          ].map(it => {
            const isAct = activeTab === it.id;
            return (
              <button 
                key={it.id} 
                onClick={() => {
                  setActiveTab(it.id as any);
                  if (it.id === 'notes') setIsEditingNote(false);
                }}
                className={`flex flex-col items-center gap-0.5 outline-none ${isAct ? 'text-[#00FF94]' : 'text-zinc-500'}`}
              >
                <div className={`p-1 px-2.5 rounded-full transition-all ${isAct ? 'bg-[#00FF94]/10 text-[#00FF94]' : 'text-zinc-650 text-zinc-500'}`}>
                  {it.icon}
                </div>
                <span className="text-[7px] font-mono uppercase font-black tracking-wider leading-none">{it.label}</span>
              </button>
            );
          })}
        </div>

        {/* Home gesture indicator capsule */}
        <div className={`py-1 flex items-center justify-center select-none ${
          mockTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-zinc-100'
        }`}>
          <div className="w-16 h-1 bg-zinc-850 rounded-full" />
        </div>

      </div>

      {/* Under status bar telemetry label */}
      <div className="flex flex-wrap items-center justify-center mt-3 px-2 text-[10px] font-mono text-zinc-500 gap-2 w-full max-w-[340px] select-none text-center">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00FF94]" />
          <span>On-device SQLite SHA-256 Storage Enabled</span>
        </div>
      </div>
    </div>
  );
}

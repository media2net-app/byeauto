"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile,
  Check,
  CheckCheck,
  Clock,
  User,
  MessageCircle,
  Filter
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromMe: boolean;
  status: 'sent' | 'delivered' | 'read' | 'pending';
  type: 'text' | 'image' | 'file' | 'voice';
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'typing';
  isBusiness: boolean;
  businessName?: string;
}

interface Conversation {
  contactId: string;
  messages: Message[];
}

export default function MessagesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showContacts, setShowContacts] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dummy contacts data
  const dummyContacts: Contact[] = [
    {
      id: "1",
      name: "Ion Popescu",
      phone: "+40 721 123 456",
      avatar: "👨‍💼",
      lastMessage: "Salut! Am nevoie de o programare pentru BMW-ul meu",
      lastMessageTime: "14:30",
      unreadCount: 2,
      status: "online",
      isBusiness: false
    },
    {
      id: "2",
      name: "Maria Ionescu",
      phone: "+40 722 234 567",
      avatar: "👩‍💼",
      lastMessage: "Mulțumesc pentru serviciul excelent!",
      lastMessageTime: "13:45",
      unreadCount: 0,
      status: "offline",
      isBusiness: false
    },
    {
      id: "3",
      name: "BMW Service Center",
      phone: "+40 723 345 678",
      avatar: "🏢",
      lastMessage: "Piesele au ajuns. Puteți veni să le ridicați.",
      lastMessageTime: "12:20",
      unreadCount: 1,
      status: "online",
      isBusiness: true,
      businessName: "BMW Service Center"
    },
    {
      id: "4",
      name: "Alexandru Dumitrescu",
      phone: "+40 724 456 789",
      avatar: "👨‍🔧",
      lastMessage: "Cât costă o revizie completă?",
      lastMessageTime: "11:15",
      unreadCount: 0,
      status: "typing",
      isBusiness: false
    },
    {
      id: "5",
      name: "Auto Parts Romania",
      phone: "+40 725 567 890",
      avatar: "🔧",
      lastMessage: "Avem în stoc toate piesele necesare.",
      lastMessageTime: "10:30",
      unreadCount: 3,
      status: "online",
      isBusiness: true,
      businessName: "Auto Parts Romania"
    }
  ];

  // Dummy conversations data
  const dummyConversations: Conversation[] = [
    {
      contactId: "1",
      messages: [
        {
          id: "1",
          text: "Salut! Am nevoie de o programare pentru BMW-ul meu",
          timestamp: "14:30",
          isFromMe: false,
          status: "read",
          type: "text"
        },
        {
          id: "2",
          text: "Bună! Sigur, pentru ce model și an?",
          timestamp: "14:32",
          isFromMe: true,
          status: "read",
          type: "text"
        },
        {
          id: "3",
          text: "BMW X5 din 2020. Am o problemă cu motorul",
          timestamp: "14:35",
          isFromMe: false,
          status: "read",
          type: "text"
        },
        {
          id: "4",
          text: "Înțeleg. Vă pot programa pentru mâine la 10:00?",
          timestamp: "14:36",
          isFromMe: true,
          status: "delivered",
          type: "text"
        },
        {
          id: "5",
          text: "Perfect! Mulțumesc!",
          timestamp: "14:38",
          isFromMe: false,
          status: "sent",
          type: "text"
        }
      ]
    },
    {
      contactId: "3",
      messages: [
        {
          id: "1",
          text: "Piesele au ajuns. Puteți veni să le ridicați.",
          timestamp: "12:20",
          isFromMe: false,
          status: "read",
          type: "text"
        },
        {
          id: "2",
          text: "Excelent! Voi veni în 30 de minute",
          timestamp: "12:25",
          isFromMe: true,
          status: "read",
          type: "text"
        }
      ]
    },
    {
      contactId: "4",
      messages: [
        {
          id: "1",
          text: "Cât costă o revizie completă?",
          timestamp: "11:15",
          isFromMe: false,
          status: "read",
          type: "text"
        },
        {
          id: "2",
          text: "Pentru BMW, o revizie completă costă 800 RON",
          timestamp: "11:20",
          isFromMe: true,
          status: "read",
          type: "text"
        },
        {
          id: "3",
          text: "Include schimbul de ulei, filtre și verificări generale",
          timestamp: "11:21",
          isFromMe: true,
          status: "delivered",
          type: "text"
        }
      ]
    }
  ];

  useEffect(() => {
    setContacts(dummyContacts);
    setConversations(dummyConversations);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    router.push("/");
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unreadCount: 0 } : c
    ));
    // On mobile, hide contacts list when a contact is selected
    if (isMobile) {
      setShowContacts(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isFromMe: true,
      status: 'sent',
      type: 'text'
    };

    // Add message to conversation
    setConversations(prev => {
      const existingConv = prev.find(c => c.contactId === selectedContact.id);
      if (existingConv) {
        return prev.map(c => 
          c.contactId === selectedContact.id 
            ? { ...c, messages: [...c.messages, newMsg] }
            : c
        );
      } else {
        return [...prev, { contactId: selectedContact.id, messages: [newMsg] }];
      }
    });

    // Update contact's last message
    setContacts(prev => prev.map(c => 
      c.id === selectedContact.id 
        ? { 
            ...c, 
            lastMessage: newMessage, 
            lastMessageTime: new Date().toLocaleTimeString('ro-RO', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          }
        : c
    ));

    setNewMessage("");
    
    // Simulate message delivery and read status
    setTimeout(() => {
      setConversations(prev => prev.map(c => 
        c.contactId === selectedContact.id 
          ? {
              ...c,
              messages: c.messages.map(m => 
                m.id === newMsg.id ? { ...m, status: 'delivered' as const } : m
              )
            }
          : c
      ));
    }, 1000);

    setTimeout(() => {
      setConversations(prev => prev.map(c => 
        c.contactId === selectedContact.id 
          ? {
              ...c,
              messages: c.messages.map(m => 
                m.id === newMsg.id ? { ...m, status: 'read' as const } : m
              )
            }
          : c
      ));
    }, 2000);
  };

  const getCurrentConversation = () => {
    if (!selectedContact) return [];
    return conversations.find(c => c.contactId === selectedContact.id)?.messages || [];
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    (contact.businessName && contact.businessName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {selectedContact && isMobile && (
                  <button
                    onClick={() => {
                      setSelectedContact(null);
                      setShowContacts(true);
                    }}
                    className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <MessageCircle className="w-6 h-6 text-purple-500" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">Messages</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <LanguageSwitcher />
                <div className="hidden sm:block text-sm text-gray-400">
                  WhatsApp Business Integration
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Contacts List */}
          <div className={`${
            selectedContact && isMobile ? 'hidden' : 'flex'
          } lg:flex w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-700 flex-col`}>
            {/* Search */}
            <div className="p-3 sm:p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className={`p-3 sm:p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg sm:text-xl">
                        {contact.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-900 ${
                        contact.status === 'online' ? 'bg-green-500' : 
                        contact.status === 'typing' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-medium truncate text-sm sm:text-base">
                            {contact.name}
                            {contact.isBusiness && (
                              <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                                Business
                              </span>
                            )}
                          </h3>
                          {contact.businessName && (
                            <p className="text-xs sm:text-sm text-gray-400 truncate">{contact.businessName}</p>
                          )}
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-xs text-gray-400">{contact.lastMessageTime}</p>
                          {contact.unreadCount > 0 && (
                            <div className="mt-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                              {contact.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 truncate mt-1">
                        {contact.status === 'typing' ? (
                          <span className="text-purple-400">typing...</span>
                        ) : (
                          contact.lastMessage
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${
            !selectedContact && isMobile ? 'hidden' : 'flex'
          } lg:flex flex-1 flex-col min-h-0`}>
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-gray-700 bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm sm:text-lg">
                          {selectedContact.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-gray-800 ${
                          selectedContact.status === 'online' ? 'bg-green-500' : 
                          selectedContact.status === 'typing' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-medium text-sm sm:text-base truncate">
                          {selectedContact.name}
                          {selectedContact.isBusiness && (
                            <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                              Business
                            </span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">
                          {selectedContact.status === 'typing' ? 'typing...' : selectedContact.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {getCurrentConversation().map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                        message.isFromMe 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-end space-x-1 mt-1 ${
                          message.isFromMe ? 'text-purple-200' : 'text-gray-400'
                        }`}>
                          <span className="text-xs">{message.timestamp}</span>
                          {message.isFromMe && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                      <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white">
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-1 sm:p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Welcome Screen */
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">
                    Welcome to Messages
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Select a contact to start chatting
                  </p>
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      WhatsApp Business Integration Features:
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Real-time messaging with customers</li>
                      <li>• Business profile integration</li>
                      <li>• Message status tracking</li>
                      <li>• Contact management</li>
                      <li>• Quick responses and templates</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
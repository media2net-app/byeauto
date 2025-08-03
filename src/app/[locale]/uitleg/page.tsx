"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useWork } from "@/contexts/WorkContext";
import { useOpeningHours } from "@/contexts/OpeningHoursContext";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { 
  Tv, 
  Clock, 
  Users, 
  BarChart3, 
  Wrench, 
  Calendar,
  Play,
  Pause,
  Square,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Info,
  Settings,
  Smartphone
} from "lucide-react";

export default function UitlegPage() {
  const router = useRouter();
  const t = useTranslations();
  const { workItems, getTotalWorkHours, getTotalActualHours, getOverTimeHours } = useWork();
  const { getCurrentDayHours, isCurrentlyOpen, getRemainingHoursToday } = useOpeningHours();
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = () => {
    router.push("/");
  };

  const sections = [
    { id: 'overview', name: 'Overzicht Systeem', icon: Info },
    { id: 'tvdashboard', name: 'TV Dashboard', icon: Tv },
    { id: 'workmanagement', name: 'Werkbeheer', icon: Wrench },
    { id: 'vehicles', name: 'Voertuigen', icon: Wrench },
    { id: 'clients', name: 'Klanten', icon: Users },
    { id: 'messages', name: 'Berichten', icon: AlertTriangle },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Instellingen', icon: Settings },
    { id: 'worktimer', name: 'Work Timer', icon: Clock },
    { id: 'openinghours', name: 'Openingstijden', icon: Calendar },
    { id: 'integration', name: 'Integratie', icon: ArrowRight }
  ];

  const currentDayHours = getCurrentDayHours();
  const isWorkTime = isCurrentlyOpen();
  const remainingHours = getRemainingHoursToday();

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Systeem Uitleg & Handleiding</h1>
            <p className="text-gray-300 mt-1">Complete gids voor alle BYE AUTO systeem functies</p>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Navigation Sidebar */}
          <div className="w-64 bg-gray-900 border-r border-gray-700 p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </nav>

            {/* Current Status */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-white font-semibold mb-3">Huidige Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Werk items:</span>
                  <span className="text-white font-medium">{workItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Openingstijden:</span>
                  <span className="text-white font-medium">
                    {currentDayHours ? `${currentDayHours.open} - ${currentDayHours.close}` : 'Gesloten'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className={`font-medium ${isWorkTime ? 'text-green-400' : 'text-red-400'}`}>
                    {isWorkTime ? 'Open' : 'Gesloten'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Restaande uren:</span>
                  <span className="text-white font-medium">{remainingHours.toFixed(1)}h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2" />
                    Systeem Overzicht
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Het BYE AUTO systeem bestaat uit verschillende onderdelen die samenwerken om de werkplaats 
                    efficiënt te beheren. Hieronder vind je een overzicht van alle functies.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Tv className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-white font-semibold">TV Dashboard</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Live overzicht op TV met tijden, planning en Kanban bord voor medewerkers
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Wrench className="w-5 h-5 text-green-400 mr-2" />
                        <h3 className="text-white font-semibold">Werkbeheer</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Kanban-stijl werkbeheer voor het toewijzen en beheren van taken
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Clock className="w-5 h-5 text-orange-400 mr-2" />
                        <h3 className="text-white font-semibold">Work Timer</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Tablet timer voor het registreren van werkuren per auto/klant
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                        <h3 className="text-white font-semibold">Openingstijden</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Configureerbare openingstijden met automatische overuren berekening
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <BarChart3 className="w-5 h-5 text-yellow-400 mr-2" />
                        <h3 className="text-white font-semibold">Tijdtracking</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Automatische registratie van werkuren, overuren en efficiëntie
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Smartphone className="w-5 h-5 text-red-400 mr-2" />
                        <h3 className="text-white font-semibold">Real-time Sync</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Alle onderdelen synchroniseren real-time tussen verschillende apparaten
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'tvdashboard' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Tv className="w-6 h-6 mr-2" />
                    TV Dashboard - Workshop Overzicht
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Wat wordt getoond?</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🕐 Live Tijd & Datum</h4>
                          <p className="text-gray-300 text-sm">
                            Real-time klok met uren, minuten, seconden en volledige datum in het Roemeens
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📅 Dagelijkse Planning</h4>
                          <p className="text-gray-300 text-sm">
                            Overzicht van totaal werk, klaar, in uitvoering en wachtend
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">👥 Team Workload</h4>
                          <p className="text-gray-300 text-sm">
                            Aantal taken per teamlid (Marius, Alexandru, Vasile)
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⚡ Efficiëntie Metrics</h4>
                          <p className="text-gray-300 text-sm">
                            Gemiddelde tijd, bespaarde tijd, klanttevredenheid
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Werkuren & Overuren</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⏰ Resterende Werkuren</h4>
                          <p className="text-gray-300 text-sm">
                            Toont hoeveel uren er nog over zijn vandaag volgens openingstijden
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🎯 Verwachtte Eindtijd</h4>
                          <p className="text-gray-300 text-sm">
                            Berekent wanneer alle werk klaar is op basis van geschatte tijden
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⚠️ Overuren Waarschuwing</h4>
                          <p className="text-gray-300 text-sm">
                            Toont automatisch als er overuren nodig zijn met exacte eindtijd
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📊 Tijdtracking</h4>
                          <p className="text-gray-300 text-sm">
                            Totalen van geschatte, werkelijke en overuren van de dag
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Kanban Bord</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-3">
                        <h4 className="text-yellow-200 font-medium mb-2">🟡 Wachtend</h4>
                        <p className="text-yellow-300 text-sm">
                          Taken die nog niet zijn gestart, met prioriteit en geschatte tijd
                        </p>
                      </div>
                      <div className="bg-blue-900 border border-blue-700 rounded-lg p-3">
                        <h4 className="text-blue-200 font-medium mb-2">🔵 In Uitvoering</h4>
                        <p className="text-blue-300 text-sm">
                          Taken die actief bezig zijn, met starttijd en lopende timer
                        </p>
                      </div>
                      <div className="bg-green-900 border border-green-700 rounded-lg p-3">
                        <h4 className="text-green-200 font-medium mb-2">🟢 Klaar</h4>
                        <p className="text-green-300 text-sm">
                          Voltooide taken met werkelijke tijd, overuren en efficiëntie
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'workmanagement' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Wrench className="w-6 h-6 mr-2" />
                    Werkbeheer - Kanban Stijl
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Hoe werkt het?</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📋 Taak Toevoegen</h4>
                          <p className="text-gray-300 text-sm">
                            Klik op "Nieuwe Taak" om een werk item toe te voegen met auto, klant, werktype en geschatte tijd
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🔄 Status Wijzigen</h4>
                          <p className="text-gray-300 text-sm">
                            Sleep taken tussen kolommen of gebruik de knoppen om status te wijzigen
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⏱️ Automatische Tijdtracking</h4>
                          <p className="text-gray-300 text-sm">
                            Bij status wijziging wordt automatisch start- en eindtijd geregistreerd
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📊 Real-time Updates</h4>
                          <p className="text-gray-300 text-sm">
                            Alle wijzigingen worden direct gesynchroniseerd met TV dashboard
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Kolommen & Statussen</h3>
                      <div className="space-y-4">
                        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                          <h4 className="text-yellow-200 font-medium mb-2">🟡 Wachtend (Pending)</h4>
                          <ul className="text-yellow-300 text-sm space-y-1">
                            <li>• Nieuwe taken die nog niet zijn gestart</li>
                            <li>• Toont prioriteit (Hoog/Medium/Laag)</li>
                            <li>• Geschatte tijd en toegewezen medewerker</li>
                            <li>• Kan naar "In Uitvoering" worden verplaatst</li>
                          </ul>
                        </div>

                        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                          <h4 className="text-blue-200 font-medium mb-2">🔵 In Uitvoering (In Progress)</h4>
                          <ul className="text-blue-300 text-sm space-y-1">
                            <li>• Actieve taken die bezig zijn</li>
                            <li>• Automatische starttijd registratie</li>
                            <li>• Lopende timer voor werkelijke tijd</li>
                            <li>• Kan naar "Klaar" of terug naar "Wachtend"</li>
                          </ul>
                        </div>

                        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                          <h4 className="text-green-200 font-medium mb-2">🟢 Klaar (Completed)</h4>
                          <ul className="text-green-300 text-sm space-y-1">
                            <li>• Voltooide taken</li>
                            <li>• Automatische eindtijd registratie</li>
                            <li>• Vergelijking geschatte vs werkelijke tijd</li>
                            <li>• Overuren berekening en efficiëntie</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'worktimer' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Work Timer - Tablet Interface
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Hoe te gebruiken?</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📱 Tablet Optimalisatie</h4>
                          <p className="text-gray-300 text-sm">
                            Ga naar /worktimer op een tablet voor fullscreen timer interface
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🚗 Auto Selectie</h4>
                          <p className="text-gray-300 text-sm">
                            Timer selecteert automatisch eerste beschikbare werk item uit werkbeheer
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🎨 Visuele Feedback</h4>
                          <p className="text-gray-300 text-sm">
                            Achtergrond verandert van kleur: Groen (klaar) → Oranje (actief) → Rood (gepauzeerd)
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⏱️ Timer Controles</h4>
                          <p className="text-gray-300 text-sm">
                            Grote knoppen voor Start, Pause, Resume en Stop voor eenvoudige bediening
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Timer Statussen</h3>
                      <div className="space-y-4">
                        <div className="bg-green-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Play className="w-5 h-5 mr-2" />
                            Klaar om te Starten (Groen)
                          </h4>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Auto geselecteerd en klaar</li>
                            <li>• Groene achtergrond</li>
                            <li>• Start knop beschikbaar</li>
                            <li>• Timer op 00:00:00</li>
                          </ul>
                        </div>

                        <div className="bg-orange-500 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Pause className="w-5 h-5 mr-2" />
                            Werk in Uitvoering (Oranje)
                          </h4>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Timer loopt live</li>
                            <li>• Oranje achtergrond</li>
                            <li>• Pause en Stop knoppen</li>
                            <li>• Auto status: "In Uitvoering"</li>
                          </ul>
                        </div>

                        <div className="bg-red-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Square className="w-5 h-5 mr-2" />
                            Gepauzeerd (Rood)
                          </h4>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Timer gestopt maar niet voltooid</li>
                            <li>• Rode achtergrond</li>
                            <li>• Resume en Stop knoppen</li>
                            <li>• Tijd blijft behouden</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Automatische Integratie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-white font-medium mb-2">🔄 Status Updates</h4>
                        <p className="text-gray-300 text-sm">
                          Bij Start: Pending → In Progress<br/>
                          Bij Stop: In Progress → Completed
                        </p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-white font-medium mb-2">⏰ Tijdtracking</h4>
                        <p className="text-gray-300 text-sm">
                          Automatische registratie van start- en eindtijd bij status wijzigingen
                        </p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-white font-medium mb-2">📺 TV Sync</h4>
                        <p className="text-gray-300 text-sm">
                          Alle wijzigingen worden direct getoond op TV dashboard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'openinghours' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-2" />
                    Openingstijden & Overuren Berekening
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Configuratie</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⚙️ Instellingen</h4>
                          <p className="text-gray-300 text-sm">
                            Ga naar Dashboard → Settings → Opening Hours om tijden per dag in te stellen
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📅 Per Dag Configuratie</h4>
                          <p className="text-gray-300 text-sm">
                            Maandag t/m zondag individueel instelbaar met open/gesloten tijden
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🚀 Quick Actions</h4>
                          <p className="text-gray-300 text-sm">
                            Snelle presets: Alle dagen 08:00-18:00, alleen werkdagen, alles gesloten
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">💾 Automatische Opslag</h4>
                          <p className="text-gray-300 text-sm">
                            Instellingen worden automatisch opgeslagen en gesynchroniseerd
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Overuren Berekening</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⏰ Resterende Uren</h4>
                          <p className="text-gray-300 text-sm">
                            Berekent automatisch hoeveel werkuren er nog over zijn vandaag
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🎯 Eindtijd Voorspelling</h4>
                          <p className="text-gray-300 text-sm">
                            Voorspelt wanneer alle werk klaar is op basis van geschatte tijden
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⚠️ Overuren Detectie</h4>
                          <p className="text-gray-300 text-sm">
                            Toont automatisch waarschuwing als werk na sluitingstijd eindigt
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📊 Exacte Overuren</h4>
                          <p className="text-gray-300 text-sm">
                            Berekent precies hoeveel overuren nodig zijn (bijv. "2.5 uur overwerk")
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Voorbeeld Scenario</h3>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">📋 Situatie</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Openingstijden: 08:00 - 18:00</li>
                            <li>• Huidige tijd: 14:30</li>
                            <li>• Resterende werk: 6 uur</li>
                            <li>• Verwachtte eindtijd: 20:30</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">⚠️ Resultaat</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Resterende uren: 3.5 uur</li>
                            <li>• Overuren nodig: 2.5 uur</li>
                            <li>• Waarschuwing: "⚠️ Lucru Până La 20:30"</li>
                            <li>• Overuren: "2.5 ore suplimentare"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'vehicles' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Wrench className="w-6 h-6 mr-2" />
                    Voertuigen Beheer
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Voertuig Database</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🚗 Voertuig Registratie</h4>
                          <p className="text-gray-300 text-sm">
                            Voeg nieuwe voertuigen toe met merk, model, jaar en kenteken
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📋 Onderhoud Historie</h4>
                          <p className="text-gray-300 text-sm">
                            Bekijk alle eerdere werkzaamheden en onderhoud per voertuig
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🔍 Zoek & Filter</h4>
                          <p className="text-gray-300 text-sm">
                            Zoek snel door voertuigen op kenteken, klant of werkzaamheden
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📊 Statistieken</h4>
                          <p className="text-gray-300 text-sm">
                            Bekijk werk statistieken en kosten per voertuig
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Functies</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                          <h4 className="text-blue-200 font-medium mb-2">➕ Nieuwe Voertuigen</h4>
                          <p className="text-blue-300 text-sm">
                            Registreer nieuwe voertuigen met volledige details
                          </p>
                        </div>

                        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                          <h4 className="text-green-200 font-medium mb-2">✏️ Bewerken</h4>
                          <p className="text-green-300 text-sm">
                            Update voertuig informatie en details
                          </p>
                        </div>

                        <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                          <h4 className="text-purple-200 font-medium mb-2">📈 Rapportages</h4>
                          <p className="text-purple-300 text-sm">
                            Genereer rapporten over voertuig onderhoud en kosten
                          </p>
                        </div>

                        <div className="bg-orange-900 border border-orange-700 rounded-lg p-4">
                          <h4 className="text-orange-200 font-medium mb-2">🔗 Koppeling</h4>
                          <p className="text-orange-300 text-sm">
                            Koppel voertuigen aan klanten en werkzaamheden
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'clients' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Klanten Beheer
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Klant Database</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">👤 Klant Profielen</h4>
                          <p className="text-gray-300 text-sm">
                            Beheer klantgegevens inclusief contact informatie en voorkeuren
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🚗 Voertuig Overzicht</h4>
                          <p className="text-gray-300 text-sm">
                            Bekijk alle voertuigen die bij een klant horen
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📞 Communicatie</h4>
                          <p className="text-gray-300 text-sm">
                            Beheer klant communicatie en notities
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">💰 Facturatie</h4>
                          <p className="text-gray-300 text-sm">
                            Bekijk facturatie geschiedenis en openstaande bedragen
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Functies</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                          <h4 className="text-blue-200 font-medium mb-2">➕ Nieuwe Klanten</h4>
                          <p className="text-blue-300 text-sm">
                            Registreer nieuwe klanten met volledige contactgegevens
                          </p>
                        </div>

                        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                          <h4 className="text-green-200 font-medium mb-2">📊 Klant Historie</h4>
                          <p className="text-green-300 text-sm">
                            Bekijk complete werk geschiedenis per klant
                          </p>
                        </div>

                        <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                          <h4 className="text-purple-200 font-medium mb-2">🔔 Notificaties</h4>
                          <p className="text-purple-300 text-sm">
                            Stel herinneringen in voor onderhoud en afspraken
                          </p>
                        </div>

                        <div className="bg-orange-900 border border-orange-700 rounded-lg p-4">
                          <h4 className="text-orange-200 font-medium mb-2">📈 Loyaliteit</h4>
                          <p className="text-orange-300 text-sm">
                            Track klant loyaliteit en terugkerende bezoeken
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'messages' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Berichten & Notificaties
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Berichten Systeem</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📨 Interne Berichten</h4>
                          <p className="text-gray-300 text-sm">
                            Communiceer tussen teamleden over werk en updates
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🔔 Notificaties</h4>
                          <p className="text-gray-300 text-sm">
                            Ontvang meldingen over urgente taken en deadlines
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📞 Klant Communicatie</h4>
                          <p className="text-gray-300 text-sm">
                            Beheer berichten naar en van klanten
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📋 Taak Updates</h4>
                          <p className="text-gray-300 text-sm">
                            Automatische updates over taak status wijzigingen
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Bericht Types</h3>
                      <div className="space-y-4">
                        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                          <h4 className="text-red-200 font-medium mb-2">🚨 Urgent</h4>
                          <p className="text-red-300 text-sm">
                            Dringende berichten die direct aandacht nodig hebben
                          </p>
                        </div>

                        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                          <h4 className="text-yellow-200 font-medium mb-2">⚠️ Waarschuwing</h4>
                          <p className="text-yellow-300 text-sm">
                            Belangrijke updates en herinneringen
                          </p>
                        </div>

                        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                          <h4 className="text-blue-200 font-medium mb-2">ℹ️ Informatie</h4>
                          <p className="text-blue-300 text-sm">
                            Algemene informatie en updates
                          </p>
                        </div>

                        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                          <h4 className="text-green-200 font-medium mb-2">✅ Bevestiging</h4>
                          <p className="text-green-300 text-sm">
                            Bevestigingen van voltooide taken
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Analytics & Rapportages
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Data Analyse</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📊 Werk Statistieken</h4>
                          <p className="text-gray-300 text-sm">
                            Analyse van werkuren, efficiëntie en productiviteit
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">💰 Financiële Rapportages</h4>
                          <p className="text-gray-300 text-sm">
                            Omzet, kosten en winstmarge analyses
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">👥 Team Performance</h4>
                          <p className="text-gray-300 text-sm">
                            Individuele en team prestaties tracking
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📈 Trends & Voorspellingen</h4>
                          <p className="text-gray-300 text-sm">
                            Patronen herkennen en toekomstige planning
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Rapport Types</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                          <h4 className="text-blue-200 font-medium mb-2">📅 Dagelijkse Overzichten</h4>
                          <p className="text-blue-300 text-sm">
                            Dagelijkse werk statistieken en prestaties
                          </p>
                        </div>

                        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                          <h4 className="text-green-200 font-medium mb-2">📊 Maandelijkse Rapportages</h4>
                          <p className="text-green-300 text-sm">
                            Uitgebreide maandelijkse analyses en trends
                          </p>
                        </div>

                        <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                          <h4 className="text-purple-200 font-medium mb-2">🎯 KPI Dashboards</h4>
                          <p className="text-purple-300 text-sm">
                            Key Performance Indicators en doelen tracking
                          </p>
                        </div>

                        <div className="bg-orange-900 border border-orange-700 rounded-lg p-4">
                          <h4 className="text-orange-200 font-medium mb-2">📋 Export Functies</h4>
                          <p className="text-orange-300 text-sm">
                            Exporteer data naar PDF, Excel of andere formaten
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Settings className="w-6 h-6 mr-2" />
                    Systeem Instellingen
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Algemene Instellingen</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🏢 Bedrijfsprofiel</h4>
                          <p className="text-gray-300 text-sm">
                            Configureer bedrijfsnaam, logo en contactgegevens
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">👥 Team Beheer</h4>
                          <p className="text-gray-300 text-sm">
                            Beheer teamleden, rollen en toegangsrechten
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🎨 Interface</h4>
                          <p className="text-gray-300 text-sm">
                            Pas kleuren, thema's en layout aan
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🔔 Notificaties</h4>
                          <p className="text-gray-300 text-sm">
                            Configureer notificatie instellingen en voorkeuren
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Geavanceerde Instellingen</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                          <h4 className="text-blue-200 font-medium mb-2">🔐 Beveiliging</h4>
                          <p className="text-blue-300 text-sm">
                            Wachtwoord beleid en toegangscontrole
                          </p>
                        </div>

                        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                          <h4 className="text-green-200 font-medium mb-2">💾 Backup & Sync</h4>
                          <p className="text-green-300 text-sm">
                            Data backup en synchronisatie instellingen
                          </p>
                        </div>

                        <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                          <h4 className="text-purple-200 font-medium mb-2">🔧 Integraties</h4>
                          <p className="text-purple-300 text-sm">
                            Koppeling met externe systemen en API's
                          </p>
                        </div>

                        <div className="bg-orange-900 border border-orange-700 rounded-lg p-4">
                          <h4 className="text-orange-200 font-medium mb-2">📊 Rapportages</h4>
                          <p className="text-orange-300 text-sm">
                            Configureer automatische rapportages en exports
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'integration' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <ArrowRight className="w-6 h-6 mr-2" />
                    Systeem Integratie & Synchronisatie
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Real-time Synchronisatie</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🔄 Cross-Device Sync</h4>
                          <p className="text-gray-300 text-sm">
                            Alle wijzigingen worden direct gesynchroniseerd tussen TV, tablet en computer
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📺 TV Dashboard Updates</h4>
                          <p className="text-gray-300 text-sm">
                            TV toont automatisch "🔄 Date actualizate" bij wijzigingen
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">💾 Local Storage</h4>
                          <p className="text-gray-300 text-sm">
                            Alle data wordt lokaal opgeslagen en gesynchroniseerd via browser events
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🌐 Multi-Tab Support</h4>
                          <p className="text-gray-300 text-sm">
                            Werkt tussen verschillende browser tabs en vensters
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Data Flow</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📱 Work Timer → Work Context</h4>
                          <p className="text-gray-300 text-sm">
                            Timer wijzigingen worden direct doorgegeven aan centraal werkbeheer
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">⚙️ Settings → Opening Hours</h4>
                          <p className="text-gray-300 text-sm">
                            Openingstijden worden gebruikt voor overuren berekeningen
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">📊 Work Context → TV Dashboard</h4>
                          <p className="text-gray-300 text-sm">
                            Alle werk data wordt real-time getoond op TV dashboard
                          </p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">🔄 Bi-directional Sync</h4>
                          <p className="text-gray-300 text-sm">
                            Wijzigingen kunnen van elk onderdeel komen en worden overal getoond
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Voordelen van het Systeem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-green-900 border border-green-700 rounded-lg p-3">
                        <h4 className="text-green-200 font-medium mb-2">⏰ Tijdbesparing</h4>
                        <p className="text-green-300 text-sm">
                          Automatische tijdtracking en status updates besparen handmatige invoer
                        </p>
                      </div>
                      <div className="bg-blue-900 border border-blue-700 rounded-lg p-3">
                        <h4 className="text-blue-200 font-medium mb-2">👁️ Transparantie</h4>
                        <p className="text-blue-300 text-sm">
                          Iedereen ziet real-time wat er gebeurt via TV dashboard
                        </p>
                      </div>
                      <div className="bg-purple-900 border border-purple-700 rounded-lg p-3">
                        <h4 className="text-purple-200 font-medium mb-2">📊 Inzichten</h4>
                        <p className="text-purple-300 text-sm">
                          Overuren voorspelling en efficiëntie metrics voor betere planning
                        </p>
                      </div>
                      <div className="bg-orange-900 border border-orange-700 rounded-lg p-3">
                        <h4 className="text-orange-200 font-medium mb-2">💰 Facturatie</h4>
                        <p className="text-orange-300 text-sm">
                          Precieze werkuren registratie voor accurate facturatie
                        </p>
                      </div>
                      <div className="bg-red-900 border border-red-700 rounded-lg p-3">
                        <h4 className="text-red-200 font-medium mb-2">⚠️ Proactief</h4>
                        <p className="text-red-300 text-sm">
                          Overuren waarschuwingen helpen bij planning en communicatie
                        </p>
                      </div>
                      <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-3">
                        <h4 className="text-yellow-200 font-medium mb-2">🔄 Flexibiliteit</h4>
                        <p className="text-yellow-300 text-sm">
                          Werkt op alle apparaten: TV, tablet, computer, smartphone
                        </p>
                      </div>
                    </div>
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
import React, { useState } from 'react';
import { User, Parcel, ParcelStatus } from '../types';
import { sheetService } from '../services/sheetService';
import { Language, translations } from '../utils/translations';
import { 
  Package, 
  Search, 
  LogOut, 
  MapPin, 
  Copy, 
  Check, 
  Truck, 
  Box, 
  Plane, 
  Home 
} from 'lucide-react';

interface ClientDashboardProps {
  language: Language;
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ language, onLogout }) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Hardcoded Warehouse Address (This should eventually come from config/constants)
  const WAREHOUSE = {
    address: "广东省 广州市 白云区 石井街道 庆丰村 (HappyBox Warehouse) YourCode",
    recipient: "HappyBox Recipient",
    phone: "+86 138 0000 0000",
    zip: "510000"
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await sheetService.login(email);
      if (data) {
        setUser(data.user);
        setParcels(data.parcels);
      } else {
        setError(language === 'en' ? 'Email not found. Are you a registered client?' : 'Email не найден. Вы зарегистрированный клиент?');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusColor = (status: ParcelStatus) => {
    switch (status) {
      case 'registered': return 'bg-gray-100 text-gray-600';
      case 'warehouse': return 'bg-yellow-100 text-yellow-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'customs': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: ParcelStatus) => {
    const labels: Record<string, string> = {
      registered: language === 'en' ? 'Expected' : 'Ожидается',
      warehouse: language === 'en' ? 'In Warehouse' : 'На складе',
      shipped: language === 'en' ? 'Shipped' : 'Отправлено',
      customs: language === 'en' ? 'Customs' : 'Таможня',
      delivered: language === 'en' ? 'Delivered' : 'Доставлено',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: ParcelStatus) => {
    switch (status) {
        case 'registered': return <Box size={16} />;
        case 'warehouse': return <Home size={16} />;
        case 'shipped': return <Plane size={16} />;
        case 'customs': return <Search size={16} />;
        case 'delivered': return <Check size={16} />;
    }
  };

  // --- LOGIN VIEW ---
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-cream">
        <div className="max-w-md w-full bg-white rounded-[30px] p-8 md:p-12 shadow-xl border border-gray-100 text-center animate-fade-in">
          <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
            <Package size={32} />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark mb-2">
            {language === 'en' ? 'Client Dashboard' : 'Личный Кабинет'}
          </h2>
          <p className="text-gray-500 mb-8">
            {language === 'en' 
              ? 'Enter your email to track your parcels' 
              : 'Введите email, чтобы отследить посылки'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-blue focus:ring-0 outline-none transition-all bg-gray-50 text-lg"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white p-4 rounded-2xl font-bold text-lg hover:bg-black transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                language === 'en' ? 'Check Parcels' : 'Войти'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
             Test Account: <span className="font-mono bg-gray-100 px-2 py-1 rounded">ivan@test.com</span>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  const filteredParcels = parcels.filter(p => 
    activeTab === 'active' ? p.status !== 'delivered' : p.status === 'delivered'
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-brand-dark">{user.name}</h1>
              <p className="text-gray-500 text-sm font-mono">ID: {user.clientCode}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title={language === 'en' ? "Logout" : "Выйти"}
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* 1. Warehouse Address Card */}
        <div className="bg-brand-blue rounded-[25px] p-6 md:p-8 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 opacity-90">
              <MapPin size={20} />
              {language === 'en' ? 'Your China Warehouse Address' : 'Ваш адрес склада в Китае'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider opacity-70">{language === 'en' ? 'Address' : 'Адрес'}</span>
                <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group" onClick={() => copyToClipboard(WAREHOUSE.address, 'addr')}>
                  <p className="font-medium text-lg leading-snug flex-1">{WAREHOUSE.address}</p>
                  {copiedField === 'addr' ? <Check size={20} /> : <Copy size={20} className="opacity-50 group-hover:opacity-100" />}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider opacity-70">{language === 'en' ? 'Recipient' : 'Получатель'}</span>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group" onClick={() => copyToClipboard(WAREHOUSE.recipient, 'rec')}>
                        <p className="font-medium text-lg flex-1">{WAREHOUSE.recipient}</p>
                        {copiedField === 'rec' ? <Check size={20} /> : <Copy size={20} className="opacity-50 group-hover:opacity-100" />}
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider opacity-70">{language === 'en' ? 'Phone' : 'Телефон'}</span>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group" onClick={() => copyToClipboard(WAREHOUSE.phone, 'phone')}>
                        <p className="font-mono text-lg flex-1">{WAREHOUSE.phone}</p>
                        {copiedField === 'phone' ? <Check size={20} /> : <Copy size={20} className="opacity-50 group-hover:opacity-100" />}
                    </div>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-sm opacity-80 bg-black/20 inline-block px-3 py-1 rounded-lg">
                ⚠️ {language === 'en' ? `Don't forget to add your code: ${user.clientCode}` : `Не забудьте указать код: ${user.clientCode}`}
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-400/30 rounded-full blur-3xl"></div>
        </div>

        {/* 2. Parcel List */}
        <div>
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button 
              className={`pb-3 px-2 font-bold text-lg transition-colors relative ${activeTab === 'active' ? 'text-brand-dark' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab('active')}
            >
              {language === 'en' ? 'Active Parcels' : 'Активные посылки'}
              {activeTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue rounded-t-full"></div>}
            </button>
            <button 
              className={`pb-3 px-2 font-bold text-lg transition-colors relative ${activeTab === 'history' ? 'text-brand-dark' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab('history')}
            >
              {language === 'en' ? 'History' : 'История'}
              {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue rounded-t-full"></div>}
            </button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredParcels.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[25px] border border-gray-100 border-dashed">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Box size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">
                        {language === 'en' ? 'No parcels found here.' : 'Посылок пока нет.'}
                    </p>
                </div>
            ) : (
                filteredParcels.map((parcel) => (
                    <div key={parcel.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5">
                        
                        {/* Image */}
                        <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                            {parcel.imageUrl ? (
                                <img src={parcel.imageUrl} alt="Parcel" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Package size={24} />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                                <h3 className="font-bold text-lg text-brand-dark truncate pr-2">{parcel.description}</h3>
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap ${getStatusColor(parcel.status)}`}>
                                    {getStatusIcon(parcel.status)}
                                    {getStatusLabel(parcel.status)}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                <div>
                                    <span className="text-gray-400 block text-xs">{language === 'en' ? 'Tracking (CN)' : 'Трек (Китай)'}</span>
                                    <span className="font-mono">{parcel.trackingNumber}</span>
                                </div>
                                {parcel.weight && (
                                    <div>
                                        <span className="text-gray-400 block text-xs">{language === 'en' ? 'Weight' : 'Вес'}</span>
                                        <span className="font-medium">{parcel.weight} kg</span>
                                    </div>
                                )}
                                {parcel.internationalTracking && (
                                    <div className="col-span-2 mt-1">
                                         <span className="text-gray-400 block text-xs">{language === 'en' ? 'Intl Tracking' : 'Межд. Трек'}</span>
                                         <span className="font-mono text-brand-blue font-bold">{parcel.internationalTracking}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Area (Price, etc) */}
                        {parcel.price && (
                             <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5 flex flex-row sm:flex-col justify-between items-center sm:justify-center min-w-[100px]">
                                <span className="text-xs text-gray-400 sm:hidden">{language === 'en' ? 'Delivery Cost' : 'Стоимость'}</span>
                                <div className="text-xl font-black text-brand-dark">${parcel.price}</div>
                             </div>
                        )}
                    </div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
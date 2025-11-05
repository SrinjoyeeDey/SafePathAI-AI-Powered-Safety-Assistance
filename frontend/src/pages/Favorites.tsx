import { useState, useEffect } from "react";
import { Heart, Phone, Mail, User, Trash2, Edit, Plus, X, Star, Users } from "lucide-react";

// Mock API for demonstration
const api = {
  get: async (url: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: [] };
  },
  post: async (url: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data };
  },
  put: async (url: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data };
  },
  delete: async (url: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: {} };
  }
};

interface Favorite {
  _id: string;
  name: string;
  phone: string;
  email?: string;
}

const Favorites = () => {

   useEffect(() => {
      document.title = "Favourites | SafePathAI";
    }, []);

  const [contacts, setContacts] = useState<Favorite[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/favorites");
      setContacts(res.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching favorites:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/favorites", form);
      setForm({ name: "", phone: "", email: "" });
      setIsAdding(false);
      fetchContacts();
    } catch (err: any) {
      console.error("Error adding favorite:", err.response || err.message);
      alert(err.response?.data?.message || "Failed to add favorite");
    }
  };

  const updateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    try {
      await api.put(`/favorites/${editingId}`, form);
      setForm({ name: "", phone: "", email: "" });
      setEditingId(null);
      fetchContacts();
    } catch (err: any) {
      console.error("Error updating favorite:", err.response || err.message);
      alert(err.response?.data?.message || "Failed to update favorite");
    }
  };

  const deleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }
    
    try {
      await api.delete(`/favorites/${id}`);
      fetchContacts();
    } catch (err: any) {
      console.error("Error deleting favorite:", err.response || err.message);
      alert("Failed to delete contact");
    }
  };

  const startEditing = (contact: Favorite) => {
    setEditingId(contact._id);
    setForm({ name: contact.name, phone: contact.phone, email: contact.email || "" });
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm({ name: "", phone: "", email: "" });
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setForm({ name: "", phone: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
              Favorite Contacts
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your emergency and favorite contacts. Keep your loved ones just a tap away for quick access during emergencies.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg backdrop-blur-sm">
            <p className="text-red-700 dark:text-red-300 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Add Contact Button */}
        {!isAdding && !editingId && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Contact</span>
            </button>
          </div>
        )}

        {/* Add/Edit Contact Form - Glassmorphism */}
        {(isAdding || editingId) && (
          <div className="mb-8 p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>{editingId ? "Edit Contact" : "Add New Contact"}</span>
              </h3>
              <button
                onClick={editingId ? cancelEditing : cancelAdding}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Name Input - Glassmorphism */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Input - Glassmorphism */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Email Input - Glassmorphism */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (editingId) {
                      updateContact(e);
                    } else {
                      addContact(e);
                    }
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                >
                  {editingId ? "Update Contact" : "Save Contact"}
                </button>
                <button
                  type="button"
                  onClick={editingId ? cancelEditing : cancelAdding}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Loading favorite contacts...
          </div>
        )}

        {/* Contacts List */}
        {contacts.length === 0 ? (
          // Empty State
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Star className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              No Favorite Contacts Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start building your emergency contact list by adding your first favorite contact. Keep your loved ones close at hand.
            </p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Contact</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="group p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform"
              >
                {/* Contact Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {contact.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-pink-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Favorite</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                    <a 
                      href={`tel:${contact.phone}`}
                      className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  {contact.email && (
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 truncate"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <button
                    onClick={() => startEditing(contact)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Count */}
        {contacts.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Total Contacts: <span className="font-semibold text-purple-600 dark:text-purple-400">{contacts.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
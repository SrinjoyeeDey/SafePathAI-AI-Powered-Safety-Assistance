import { useState, useEffect } from "react";
import api from "../services/api";
import {
  FaHeart,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaTrash,
  FaEdit,
  FaPlus,
  FaTimes,
  FaStar,
  FaUserFriends
} from "react-icons/fa";

interface Favorite {
  _id: string;
  name: string;
  phone: string;
  email?: string;
}

const Favorites = () => {
  const [contacts, setContacts] = useState<Favorite[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "Favourites | SafePathAI";
  }, []);

  // Fetch contacts function
  const fetchContacts = async () => {
    try {
      const res = await api.get("/favorites");
      setContacts(res.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching favorites:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to load favorites");
    }
  };

  // Fetch contacts on mount
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await api.get("/favorites");
        if (mounted) {
          setContacts(res.data);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.response?.data?.message || "Failed to load favorites");
        }
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  // Add new contact
  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Name and phone are required.");
      return;
    }
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

  // Update existing contact
  const updateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Name and phone are required.");
      return;
    }
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

  // Delete contact
  const deleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await api.delete(`/favorites/${id}`);
      // Update local state instead of refetch
      setContacts(prev => prev.filter(c => c._id !== id));
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
              <FaHeart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
              Favorite Contacts
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your emergency and favorite contacts. Keep your loved ones just a tap away for quick access during emergencies.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg backdrop-blur-sm">
            <p className="text-red-700 dark:text-red-300 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Add Button */}
        {!isAdding && !editingId && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
            >
              <FaPlus className="w-5 h-5" />
              <span>Add New Contact</span>
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="mb-8 p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
                <FaUserFriends className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>{editingId ? "Edit Contact" : "Add New Contact"}</span>
              </h3>
              <button
                onClick={editingId ? cancelEditing : cancelAdding}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <form onSubmit={editingId ? updateContact : addContact} className="space-y-5">
              {/* Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="w-5 h-5 text-purple-500 dark:text-purple-400" />
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

              {/* Phone */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="w-5 h-5 text-purple-500 dark:text-purple-400" />
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

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="w-5 h-5 text-purple-500 dark:text-purple-400" />
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
                  type="submit"
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
            </form>
          </div>
        )}

        {/* Contact List */}
        {contacts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <FaStar className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              No Favorite Contacts Yet
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="group p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {contact.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaPhone className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                    <a href={`tel:${contact.phone}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                      {contact.phone}
                    </a>
                  </div>
                  {contact.email && (
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <FaEnvelope className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                      <a href={`mailto:${contact.email}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 truncate">
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <button
                    onClick={() => startEditing(contact)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                  >
                    <FaEdit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                  >
                    <FaTrash className="w-4 h-4" />
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

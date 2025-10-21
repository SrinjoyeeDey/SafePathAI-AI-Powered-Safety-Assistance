import React, { useState, useEffect } from 'react';
import type { Discussion, CommunityFilter } from '../types/Community';
import { DEFAULT_CATEGORIES } from '../constants/community';
// Import the real API functions
import { getDiscussions, createDiscussion } from '../services/api';
import SearchFilterBar from '../components/Community/SearchFilterBar';
import DiscussionCard from '../components/Community/DiscussionCard';
import CreateThreadModal from '../components/Community/CreateThreadModal';

const CommunityHub: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [filter, setFilter] = useState<CommunityFilter>({
    sortBy: 'latest',
    timeRange: 'all'
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Define fetchDiscussions function outside useEffect so it can be reused
  const fetchDiscussions = async () => {
    try {
      setLoading(true); // Set loading before the request
      const response = await getDiscussions();
      // Ensure you access the data correctly based on your API response structure
      setDiscussions(response.data.data.discussions || []);
      setError(null); // Clear any previous errors on success
    } catch (err) {
      setError('Failed to fetch discussions. Please try again later.');
      console.error(err);
      setDiscussions([]); // Clear discussions on error
    } finally {
      setLoading(false); // Set loading false after request finishes (success or fail)
    }
  };

  // useEffect now calls the fetchDiscussions function on component mount
  useEffect(() => {
    fetchDiscussions();
  }, []); // Empty dependency array means this runs only once

  // --- Filtering Logic (Keep your existing code) ---
  const filteredDiscussions = discussions.filter((discussion: Discussion) => {
    if (filter.category && discussion.category.id !== filter.category) {
      return false;
    }
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      return discussion.title.toLowerCase().includes(query) ||
             discussion.content.toLowerCase().includes(query) ||
             discussion.tags?.some((tag: string) => tag.toLowerCase().includes(query));
    }
    return true;
  });

  // --- Sorting Logic (Keep your existing code) ---
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    switch (filter.sortBy) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'most-replies':
        return b.replyCount - a.replyCount;
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'latest':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  // Update this function in CommunityHub.tsx
const handleCreateThread = async (threadData: { title: string; content: string; categoryId: string; tags: string[] }) => {
  try {
    // Pass the entire threadData object
    await createDiscussion(threadData);
    setIsCreateModalOpen(false);
    fetchDiscussions(); // Refresh the list
  } catch (err) {
    console.error("Failed to create discussion:", err);
    alert('Failed to create discussion. Please check the details and try again.');
  }
};

  // Display error message if the initial fetch fails
  if (error && discussions.length === 0) { // Check discussions length to avoid hiding the page on create/vote errors
    return (
      <div className="min-h-screen bg-background dark:bg-darkbg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg text-text dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section (Keep existing JSX) */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Community Hub 💭
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Connect, discuss, and help each other build better safety solutions
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 self-start md:self-center"
            >
              <span className="text-lg">➕</span>
              New Discussion
            </button>
          </div>
        </div>

        {/* Search and Filter Bar (Keep existing JSX) */}
        <div className="mb-8">
          <SearchFilterBar
            filter={filter}
            onFilterChange={setFilter}
            categories={DEFAULT_CATEGORIES}
          />
        </div>

        {/* Statistics Cards (Keep existing JSX, but data source is now real) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-primary">{discussions.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Discussions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-secondary">
              {discussions.reduce((sum: number, d: Discussion) => sum + d.replyCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Replies</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-green-600">
              {discussions.reduce((sum: number, d: Discussion) => sum + d.upvotes, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Upvotes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-purple-600">
              {DEFAULT_CATEGORIES.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton (Keep existing JSX)
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-soft animate-pulse">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="flex space-x-4">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedDiscussions.length > 0 ? (
                sortedDiscussions.map((discussion, index) => ( // Add 'index' here
                <DiscussionCard
                key={discussion.id || `discussion-${index}`} // Use index as a fallback if id is missing
                discussion={discussion}
                // Pass fetchDiscussions as the prop for refreshing after a vote
                onVoteSuccess={fetchDiscussions}
                onDiscussionClick={(discussion) => {
                  // TODO: Navigate to discussion detail page
                  console.log('Discussion clicked:', discussion.id);
                }}
              />
            ))
          ) : (
            // No discussions found message (Keep existing JSX)
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-soft text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No discussions found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {filter.searchQuery || filter.category
                  ? "Try adjusting your search or filter criteria"
                  : "Be the first to start a discussion!"
                }
              </p>
              {!filter.searchQuery && !filter.category && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Start a Discussion
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination (Keep existing JSX) */}
        {sortedDiscussions.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {sortedDiscussions.length} of {discussions.length} discussions
            </div>
          </div>
        )}
      </div>

      {/* Create Thread Modal (Keep existing JSX) */}
      <CreateThreadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateThread}
        categories={DEFAULT_CATEGORIES}
      />
    </div>
  );
};

export default CommunityHub;
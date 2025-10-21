import express from 'express';
import { Request, Response } from 'express';
import Discussion from '../models/Discussion';
import Reply from '../models/Reply';
import Vote from '../models/Vote';
import { verifyAccessToken } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

// Extended Request interface to include user from auth middleware
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// GET /api/community/discussions - Get all discussions with optional filters
router.get('/discussions', async (req: Request, res: Response) => {
  try {
    const { 
      category, 
      search, 
      sortBy = 'latest', 
      page = 1, 
      limit = 10 
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    let query: any = {};
    let sort: any = {};

    // Apply category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Apply search filter
    if (search) {
      query.$text = { $search: search as string };
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        sort = { netScore: -1, isPinned: -1 };
        break;
      case 'most-replies':
        sort = { replyCount: -1, isPinned: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1, isPinned: -1 };
        break;
      case 'latest':
      default:
        sort = { isPinned: -1, lastActivity: -1 };
    }

    const discussions = await Discussion.find(query)
      .populate('author', 'name email avatar')
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Discussion.countDocuments(query);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        discussions,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch discussions'
    });
  }
});

// GET /api/community/discussions/:id - Get single discussion with replies
router.get('/discussions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findById(id)
      .populate('author', 'name email avatar');

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    // Increment view count
    // @ts-ignore
    await discussion?.incrementViews();

    // Get replies for this discussion
    // @ts-ignore
    const replies = await Reply?.findByDiscussion(id);

    res.json({
      success: true,
      data: {
        discussion,
        replies
      }
    });
  } catch (error) {
    console.error('Error fetching discussion:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch discussion'
    });
  }
});

// POST /api/community/discussions - Create new discussion (protected)
router.post('/discussions', verifyAccessToken, async (req: AuthenticatedRequest, res: Response) => {
router.post('/discussions',verifyAccessToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content, categoryId:category, tags } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and category are required'
      });
    }

    if (title.length < 10 || title.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Title must be between 10 and 200 characters'
      });
    }

    if (content.length < 20 || content.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Content must be between 20 and 5000 characters'
      });
    }

    const discussion = new Discussion({
      title,
      content,
      author: userId,
      category,
      tags: tags || []
    });

    await discussion.save();
    
    // Populate author information
    await discussion.populate('author', 'name email avatar');

res.status(201).json({
  success: true,
  data: discussion
});
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create discussion'
    });
  }
});

// POST /api/community/discussions/:id/replies - Add reply to discussion (protected)
router.post('/discussions/:id/replies', verifyAccessToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content, parentReplyId } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply content is required'
      });
    }

    if (content.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Reply content cannot exceed 2000 characters'
      });
    }

    // Check if discussion exists
    const discussion = await Discussion.findById(id);
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    // Check if discussion is closed
    if (discussion.isClosed) {
      return res.status(400).json({
        success: false,
        message: 'Cannot reply to a closed discussion'
      });
    }

    const reply = new Reply({
      content,
      author: userId,
      discussionId: id,
      parentReplyId: parentReplyId || null
    });

    await reply.save();
    await reply.populate('author', 'name email avatar');

    // Update discussion reply count and last activity
    // @ts-ignore

    await discussion.updateReplyCount();

    res.status(201).json({
      success: true,
      data: reply
    });
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reply'
    });
  }
});

// POST /api/community/vote - Toggle vote on discussion or reply (protected)
router.post('/vote', verifyAccessToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { targetId, targetType, voteType } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Validation
    if (!targetId || !targetType || !voteType) {
      return res.status(400).json({
        success: false,
        message: 'Target ID, type, and vote type are required'
      });
    }

    if (!['discussion', 'reply'].includes(targetType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid target type'
      });
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vote type'
      });
    }
    // @ts-ignore

    const result = await Vote.toggleVote(userId, targetId, targetType, voteType);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error toggling vote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process vote'
    });
  }
});

// GET /api/community/user-votes/:targetType - Get user's votes for specific targets (protected)
router.get('/user-votes/:targetType', verifyAccessToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { targetType } = req.params;
    const { targetIds } = req.query;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!targetIds) {
      return res.status(400).json({
        success: false,
        message: 'Target IDs are required'
      });
    }

    const targetIdArray = (targetIds as string).split(',');
    // @ts-ignore
    const userVotes = await Vote.getUserVotesForTargets(userId, targetIdArray, targetType);

    res.json({
      success: true,
      data: userVotes
    });
  } catch (error) {
    console.error('Error fetching user votes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user votes'
    });
  }
});

// GET /api/community/categories - Get available categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = [
      { id: 'frontend', name: 'Frontend', icon: '🎨', color: '#32CD32' },
      { id: 'backend', name: 'Backend', icon: '⚙️', color: '#1E90FF' },
      { id: 'ai', name: 'AI & ML', icon: '🤖', color: '#9333EA' },
      { id: 'safety', name: 'Safety', icon: '🛡️', color: '#DC2626' },
      { id: 'general', name: 'General', icon: '💭', color: '#6B7280' },
      { id: 'bugs', name: 'Bug Reports', icon: '🐛', color: '#F59E0B' }
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// GET /api/community/stats - Get community statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalDiscussions = await Discussion.countDocuments();
    const totalReplies = await Reply.countDocuments();
    const totalUpvotes = await Vote.countDocuments({ voteType: 'upvote' });
    
    // Get discussions by category
    const discussionsByCategory = await Discussion.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalDiscussions,
        totalReplies,
        totalUpvotes,
        discussionsByCategory
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

export default router;
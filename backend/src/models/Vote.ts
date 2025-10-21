import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  targetType: {
    type: String,
    required: true,
    enum: ['discussion', 'reply']
  },
  voteType: {
    type: String,
    required: true,
    enum: ['upvote', 'downvote']
  }
}, {
  timestamps: true
});

// Compound indexes to ensure one vote per user per target
voteSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });
voteSchema.index({ targetId: 1, targetType: 1, voteType: 1 });

// Static methods
voteSchema.statics.toggleVote = async function(userId: string, targetId: string, targetType: string, voteType: string) {
  const existingVote = await this.findOne({ user: userId, targetId, targetType });
  
  if (existingVote) {
    if (existingVote.voteType === voteType) {
      // Remove vote if clicking the same vote type
      await existingVote.deleteOne();
      await this.updateTargetVoteCounts(targetId, targetType);
      return { action: 'removed', vote: null };
    } else {
      // Update vote type if different
      existingVote.voteType = voteType;
      await existingVote.save();
      await this.updateTargetVoteCounts(targetId, targetType);
      return { action: 'updated', vote: existingVote };
    }
  } else {
    // Create new vote
    const newVote = await this.create({
      user: userId,
      targetId,
      targetType,
      voteType
    });
    await this.updateTargetVoteCounts(targetId, targetType);
    return { action: 'created', vote: newVote };
  }
};

voteSchema.statics.updateTargetVoteCounts = async function(targetId: string, targetType: string) {
  const upvoteCount = await this.countDocuments({ 
    targetId, 
    targetType, 
    voteType: 'upvote' 
  });
  
  const downvoteCount = await this.countDocuments({ 
    targetId, 
    targetType, 
    voteType: 'downvote' 
  });

  if (targetType === 'discussion') {
    const Discussion = mongoose.model('Discussion');
    await Discussion.findByIdAndUpdate(targetId, {
      upvotes: upvoteCount,
      downvotes: downvoteCount
    });
  } else if (targetType === 'reply') {
    const Reply = mongoose.model('Reply');
    await Reply.findByIdAndUpdate(targetId, {
      upvotes: upvoteCount,
      downvotes: downvoteCount
    });
  }
};

voteSchema.statics.getUserVotesForTargets = async function(userId: string, targetIds: string[], targetType: string) {
  const votes = await this.find({
    user: userId,
    targetId: { $in: targetIds },
    targetType
  });

  const voteMap: { [key: string]: string } = {};
  votes.forEach(vote => {
    voteMap[vote.targetId.toString()] = vote.voteType;
  });

  return voteMap;
};

export default mongoose.model('Vote', voteSchema);
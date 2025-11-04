# SafePathAI Database Documentation

## Overview

SafePathAI uses MongoDB as its primary database with Mongoose ODM for schema management. The database is designed to handle geospatial data, user authentication, AI interactions, and emergency services with optimal performance and scalability.

**Database**: MongoDB 8.19+  
**ODM**: Mongoose 8.19+  
**Geospatial Support**: 2dsphere indexing for location-based queries

## Database Architecture

### Connection Configuration

```typescript
// Backend connection setup
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      // Connection options
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
```

### Environment Variables

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/safepathai
# Or for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/safepathai?retryWrites=true&w=majority
```

## Schema Definitions

### User Schema

**Collection**: `users`  
**Purpose**: User authentication, profile management, and location tracking

```typescript
import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  refreshTokens: string[];
  lastLocation?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  refreshTokens: { 
    type: [String], 
    default: [] 
  },
  lastLocation: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: { 
      type: [Number], 
      index: "2dsphere", 
      required: false 
    }
  }
}, { timestamps: true });

// Geospatial index for location queries
UserSchema.index({ "lastLocation": "2dsphere" });

export default model<IUser>("User", UserSchema);
```

**Key Features:**
- **Unique email constraint** with automatic indexing
- **Geospatial indexing** for location-based queries
- **Refresh token management** for secure authentication
- **Role-based access control** (user/admin)
- **Automatic timestamps** (createdAt, updatedAt)

**Indexes:**
- `email` (unique)
- `lastLocation` (2dsphere)

### Place Schema

**Collection**: `places`  
**Purpose**: Safe locations (hospitals, police stations, pharmacies, etc.)

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IPlace extends Document {
  _id: Types.ObjectId;
  name: string;
  type: string;
  address?: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: { 
      type: [Number], 
      index: "2dsphere" 
    }
  },
  source: { type: String }
}, { timestamps: true });

// Geospatial index for location queries
PlaceSchema.index({ "location": "2dsphere" });

export default model<IPlace>("Place", PlaceSchema);
```

**Key Features:**
- **Geospatial indexing** for efficient location queries
- **Flexible type system** for different location categories
- **Source tracking** for data provenance
- **Address storage** for human-readable locations

**Indexes:**
- `location` (2dsphere)

**Location Types:**
- `hospital` - Medical facilities
- `police_station` - Law enforcement
- `pharmacy` - Medical supplies
- `fire_station` - Emergency services
- `atm` - Banking services
- `gas_station` - Fuel stations

### SOS Schema

**Collection**: `sos`  
**Purpose**: Emergency alerts and SOS requests

```typescript
import { Schema, model, Document } from 'mongoose';

export interface ISOS extends Document {
  _id: Types.ObjectId;
  user?: Schema.Types.ObjectId;
  message?: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  contactsSentTo?: string[];
  status: "pending" | "notified" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const SOSSchema = new Schema<ISOS>({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  message: { type: String },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: { 
      type: [Number], 
      index: "2dsphere" 
    }
  },
  contactsSentTo: { type: [String] },
  status: { 
    type: String, 
    enum: ["pending", "notified", "closed"],
    default: "pending" 
  }
}, { timestamps: true });

// Geospatial index for location queries
SOSSchema.index({ "location": "2dsphere" });
// Index for user queries
SOSSchema.index({ "user": 1 });
// Index for status queries
SOSSchema.index({ "status": 1 });

export default model<ISOS>("SOS", SOSSchema);
```

**Key Features:**
- **User reference** for tracking SOS requests
- **Geospatial indexing** for location-based emergency queries
- **Status tracking** for emergency response workflow
- **Contact notification tracking** for audit purposes

**Indexes:**
- `location` (2dsphere)
- `user` (single field)
- `status` (single field)

### Chat Schema

**Collection**: `chats`  
**Purpose**: AI conversation history and user interactions

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IChat extends Document {
  _id: Types.ObjectId;
  user: Schema.Types.ObjectId;
  prompt: string;
  response: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  prompt: { 
    type: String, 
    required: true 
  },
  response: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Index for user queries
ChatSchema.index({ "user": 1 });
// Index for date queries
ChatSchema.index({ "createdAt": -1 });

export default model<IChat>("Chat", ChatSchema);
```

**Key Features:**
- **User reference** for conversation tracking
- **Full conversation storage** for AI training and analysis
- **Timestamp indexing** for chronological queries
- **Text search capability** for conversation analysis

**Indexes:**
- `user` (single field)
- `createdAt` (descending)

### FavoriteContact Schema (To be implemented)

**Collection**: `favoritecontacts`  
**Purpose**: Emergency contacts and favorite people

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IFavoriteContact extends Document {
  _id: Types.ObjectId;
  user: Schema.Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  relationship?: string;
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteContactSchema = new Schema<IFavoriteContact>({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { type: String },
  relationship: { 
    type: String,
    enum: ["family", "friend", "colleague", "emergency", "other"]
  },
  priority: { 
    type: Number, 
    default: 1,
    min: 1,
    max: 5 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

// Index for user queries
FavoriteContactSchema.index({ "user": 1 });
// Compound index for active contacts
FavoriteContactSchema.index({ "user": 1, "isActive": 1 });
// Index for priority sorting
FavoriteContactSchema.index({ "priority": -1 });

export default model<IFavoriteContact>("FavoriteContact", FavoriteContactSchema);
```

**Key Features:**
- **User reference** for contact ownership
- **Priority system** for emergency contact ordering
- **Relationship categorization** for better organization
- **Active/inactive status** for contact management
- **Compound indexing** for efficient queries

**Indexes:**
- `user` (single field)
- `user + isActive` (compound)
- `priority` (descending)

## Geospatial Queries

### Finding Nearby Places

```typescript
// Find hospitals within 5km of user location
const findNearbyHospitals = async (userLat: number, userLng: number) => {
  const hospitals = await Place.find({
    type: "hospital",
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [userLng, userLat] },
        $maxDistance: 5000 // 5km in meters
      }
    }
  }).limit(10);
  
  return hospitals;
};
```

### Finding Users in Area

```typescript
// Find users within 1km of emergency location
const findNearbyUsers = async (emergencyLat: number, emergencyLng: number) => {
  const users = await User.find({
    lastLocation: {
      $near: {
        $geometry: { type: "Point", coordinates: [emergencyLng, emergencyLat] },
        $maxDistance: 1000 // 1km in meters
      }
    }
  }).select('name email lastLocation');
  
  return users;
};
```

### Geospatial Aggregation

```typescript
// Count places by type within radius
const getPlaceStats = async (centerLat: number, centerLng: number, radius: number) => {
  const stats = await Place.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [centerLng, centerLat] },
        distanceField: "distance",
        maxDistance: radius,
        spherical: true
      }
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
        avgDistance: { $avg: "$distance" }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
  
  return stats;
};
```

## Database Operations

### User Operations

```typescript
// Create new user
const createUser = async (userData: {
  name: string;
  email: string;
  passwordHash: string;
  lat?: number;
  lng?: number;
}) => {
  const user = new User({
    name: userData.name,
    email: userData.email,
    passwordHash: userData.passwordHash,
    ...(userData.lat && userData.lng && {
      lastLocation: {
        type: "Point",
        coordinates: [userData.lng, userData.lat]
      }
    })
  });
  
  return await user.save();
};

// Update user location
const updateUserLocation = async (userId: string, lat: number, lng: number) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      lastLocation: {
        type: "Point",
        coordinates: [lng, lat]
      }
    },
    { new: true }
  );
};

// Add refresh token
const addRefreshToken = async (userId: string, tokenId: string) => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { refreshTokens: tokenId } },
    { new: true }
  );
};

// Remove refresh token
const removeRefreshToken = async (userId: string, tokenId: string) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { refreshTokens: tokenId } },
    { new: true }
  );
};
```

### Place Operations

```typescript
// Create new place
const createPlace = async (placeData: {
  name: string;
  type: string;
  address?: string;
  lat: number;
  lng: number;
  source?: string;
}) => {
  const place = new Place({
    name: placeData.name,
    type: placeData.type,
    address: placeData.address,
    location: {
      type: "Point",
      coordinates: [placeData.lng, placeData.lat]
    },
    source: placeData.source
  });
  
  return await place.save();
};

// Find places by type
const findPlacesByType = async (type: string, limit: number = 10) => {
  return await Place.find({ type })
    .limit(limit)
    .sort({ createdAt: -1 });
};

// Bulk insert places (for seeding)
const bulkInsertPlaces = async (places: Array<{
  name: string;
  type: string;
  address?: string;
  lat: number;
  lng: number;
  source?: string;
}>) => {
  const placeDocs = places.map(place => ({
    name: place.name,
    type: place.type,
    address: place.address,
    location: {
      type: "Point",
      coordinates: [place.lng, place.lat]
    },
    source: place.source
  }));
  
  return await Place.insertMany(placeDocs, { ordered: false });
};
```

### SOS Operations

```typescript
// Create SOS alert
const createSOS = async (sosData: {
  userId: string;
  message?: string;
  lat: number;
  lng: number;
}) => {
  const sos = new SOS({
    user: sosData.userId,
    message: sosData.message,
    location: {
      type: "Point",
      coordinates: [sosData.lng, sosData.lat]
    },
    status: "pending"
  });
  
  return await sos.save();
};

// Update SOS status
const updateSOSStatus = async (sosId: string, status: "pending" | "notified" | "closed") => {
  return await SOS.findByIdAndUpdate(
    sosId,
    { status },
    { new: true }
  );
};

// Get user's SOS history
const getUserSOSHistory = async (userId: string, limit: number = 10) => {
  return await SOS.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Find recent SOS alerts in area
const findRecentSOSInArea = async (lat: number, lng: number, radius: number = 1000) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  return await SOS.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radius
      }
    },
    createdAt: { $gte: oneHourAgo },
    status: { $in: ["pending", "notified"] }
  }).populate('user', 'name email');
};
```

### Chat Operations

```typescript
// Save chat conversation
const saveChat = async (chatData: {
  userId: string;
  prompt: string;
  response: string;
}) => {
  const chat = new Chat({
    user: chatData.userId,
    prompt: chatData.prompt,
    response: chatData.response
  });
  
  return await chat.save();
};

// Get user's chat history
const getUserChatHistory = async (userId: string, limit: number = 50) => {
  return await Chat.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Search chat history
const searchChatHistory = async (userId: string, searchTerm: string) => {
  return await Chat.find({
    user: userId,
    $or: [
      { prompt: { $regex: searchTerm, $options: 'i' } },
      { response: { $regex: searchTerm, $options: 'i' } }
    ]
  }).sort({ createdAt: -1 });
};
```

## Database Seeding

### Sample Places Seeding

```typescript
// samplePlaces.ts
import mongoose from "mongoose";
import Place from "./models/Place";

const samplePlaces = [
  {
    name: "Central Park",
    type: "park",
    address: "New York, NY",
    location: { type: "Point", coordinates: [-73.970, 40.770] },
    source: "seed"
  },
  {
    name: "New York Hospital",
    type: "hospital",
    address: "123 Main St, New York, NY",
    location: { type: "Point", coordinates: [-73.980, 40.790] },
    source: "seed"
  },
  {
    name: "NYPD Precinct 1",
    type: "police_station",
    address: "456 Broadway, New York, NY",
    location: { type: "Point", coordinates: [-73.960, 40.780] },
    source: "seed"
  }
];

async function seedPlaces() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    
    // Clear existing places (optional)
    // await Place.deleteMany({ source: "seed" });
    
    // Insert sample places
    await Place.insertMany(samplePlaces, { ordered: false });
    
    console.log("✅ Sample places seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding places:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run seeding
seedPlaces();
```

### Usage

```bash
# Run seeding script
cd backend
npm run seed

# Or run directly
npx ts-node src/samplePlaces.ts
```

## Performance Optimization

### Indexing Strategy

```typescript
// Compound indexes for common queries
UserSchema.index({ "email": 1, "role": 1 });
PlaceSchema.index({ "type": 1, "location": "2dsphere" });
SOSSchema.index({ "user": 1, "status": 1, "createdAt": -1 });
ChatSchema.index({ "user": 1, "createdAt": -1 });

// Text search indexes
ChatSchema.index({ "prompt": "text", "response": "text" });
PlaceSchema.index({ "name": "text", "address": "text" });
```

### Query Optimization

```typescript
// Efficient user lookup with projection
const getUserProfile = async (userId: string) => {
  return await User.findById(userId)
    .select('-passwordHash -refreshTokens')
    .lean(); // Returns plain JavaScript object
};

// Paginated queries
const getPaginatedPlaces = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  
  return await Place.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();
};

// Aggregation for statistics
const getPlaceStatistics = async () => {
  return await Place.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
        latest: { $max: "$createdAt" }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};
```

### Connection Pooling

```typescript
// mongoose connection with pooling
mongoose.connect(process.env.MONGO_URI!, {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
});
```

## Data Migration

### Migration Script Template

```typescript
// migrations/001-add-user-location-index.ts
import mongoose from 'mongoose';
import User from '../models/User';

export async function up() {
  try {
    // Add geospatial index to existing users
    await User.collection.createIndex({ "lastLocation": "2dsphere" });
    console.log('✅ Added geospatial index to users');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

export async function down() {
  try {
    // Remove geospatial index
    await User.collection.dropIndex({ "lastLocation": "2dsphere" });
    console.log('✅ Removed geospatial index from users');
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  }
}
```

### Running Migrations

```bash
# Create migration
npm run migrate:create add-user-location-index

# Run migrations
npm run migrate:up

# Rollback migration
npm run migrate:down
```

## Backup and Recovery

### Backup Strategy

```bash
# Full database backup
mongodump --uri="mongodb://localhost:27017/safepathai" --out=./backups/$(date +%Y%m%d)

# Specific collection backup
mongodump --uri="mongodb://localhost:27017/safepathai" --collection=users --out=./backups/

# Compressed backup
mongodump --uri="mongodb://localhost:27017/safepathai" --gzip --out=./backups/
```

### Recovery

```bash
# Restore from backup
mongorestore --uri="mongodb://localhost:27017/safepathai" ./backups/20250101/safepathai/

# Restore specific collection
mongorestore --uri="mongodb://localhost:27017/safepathai" --collection=users ./backups/users.bson
```

## Monitoring and Maintenance

### Health Checks

```typescript
// Database health check
const checkDatabaseHealth = async () => {
  try {
    // Check connection
    await mongoose.connection.db.admin().ping();
    
    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Check indexes
    const userIndexes = await User.collection.getIndexes();
    
    return {
      status: 'healthy',
      collections: collections.length,
      indexes: Object.keys(userIndexes).length,
      timestamp: new Date()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date()
    };
  }
};
```

### Performance Monitoring

```typescript
// Query performance monitoring
const monitorQueryPerformance = async () => {
  const stats = await mongoose.connection.db.stats();
  
  return {
    collections: stats.collections,
    dataSize: stats.dataSize,
    indexSize: stats.indexSize,
    storageSize: stats.storageSize,
    objects: stats.objects
  };
};
```

## Security Considerations

### Data Validation

```typescript
// Input validation middleware
const validateLocation = (lat: number, lng: number) => {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error('Invalid coordinates');
  }
  
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error('Coordinates out of range');
  }
  
  return true;
};

// Schema validation
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Access Control

```typescript
// User access control
const checkUserAccess = async (userId: string, resourceId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Admin users have access to all resources
  if (user.role === 'admin') {
    return true;
  }
  
  // Regular users can only access their own resources
  return userId === resourceId;
};
```

## Troubleshooting

### Common Issues

#### Connection Issues
```typescript
// Connection error handling
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});
```

#### Index Issues
```bash
# Check index usage
db.users.getIndexes()

# Rebuild indexes
db.users.reIndex()

# Drop unused indexes
db.users.dropIndex("index_name")
```

#### Performance Issues
```typescript
// Enable query logging
mongoose.set('debug', true);

// Monitor slow queries
db.setProfilingLevel(2, { slowms: 100 });

// Check query execution stats
db.users.find({ email: "test@example.com" }).explain("executionStats");
```

### Best Practices

1. **Always use indexes** for frequently queried fields
2. **Use projections** to limit returned data
3. **Implement pagination** for large datasets
4. **Use lean queries** when possible for better performance
5. **Monitor query performance** regularly
6. **Implement proper error handling** for all operations
7. **Use transactions** for multi-document operations
8. **Regular backups** and testing of recovery procedures

---

**Last Updated**: January 2025  
**Database Version**: MongoDB 8.19+  
**ODM Version**: Mongoose 8.19+  
**Maintainer**: SafePathAI Team

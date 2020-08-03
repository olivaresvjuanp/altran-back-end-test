import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gnomeSchema = new Schema({
  age: {
    type: Number,
    required: true
  },
  friends: {
    type: [String],
    required: true
  },
  hairColor: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  professions: {
    type: [String],
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

export interface GnomeDocument extends mongoose.Document {
  age: number;
  friends: string[];
  hairColor: string;
  height: number;
  id: number;
  name: string;
  professions: string[];
  thumbnail: string;
  weight: number;
};

export const Gnome = mongoose.model<GnomeDocument>('Gnome', gnomeSchema);

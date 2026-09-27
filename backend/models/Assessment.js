import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    claim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      required: true,
      index: true,
    },

    evidence: {
      type: String,
      required: true,
    },

    justified: {
      type: Boolean,
      required: true,
    },

    confidenceScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    reasoning: {
      type: String,
      required: true,
    },

    limitations: {
      type: [String],
      default: [],
    },

    model: {
      type: String,
      required: true,
    },

    assessedBy: {
      type: String,
      default: "AI",
    },

    humanReview: {
      status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "OVERRIDDEN"],
        default: "PENDING",
      },

      reviewer: String,

      comments: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Assessment", assessmentSchema)
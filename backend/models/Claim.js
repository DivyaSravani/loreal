import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    claimText: {
      type: String,
      required: true,
      trim: true,
    },

    claimType: {
      type: String,
      enum: [
        "EFFICACY",
        "SAFETY",
        "COSMETIC",
        "CLINICAL",
        "SUSTAINABILITY",
        "OTHER",
      ],
      default: "CLINICAL",
    },

    proposedBy: {
      type: String,
      default: "Business Team",
    },

    scientist: {
      type: String,
    },

    formulaReference: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "PROPOSED",
        "FILTERED",
        "FORMULATION_TESTING",
        "EVALUATION",
        "ASSESSED",
        "APPROVED",
        "REJECTED",
      ],
      default: "PROPOSED",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Claim", claimSchema);
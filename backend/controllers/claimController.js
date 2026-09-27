import Claim from "../models/Claim.js";
import Assessment from "../models/Assessment.js";
import { assessClaimWithAI } from "../services/claimAssessmentService.js";

export const assessClaim = async (req, res) => {
  try {
    const {
      productName,
      claimText,
      evidence,
      claimType = "CLINICAL",
    } = req.body;

    // -------------------------
    // 1. Input validation
    // -------------------------

    if (!productName || !claimText || !evidence) {
      return res.status(400).json({
        success: false,
        message:
          "productName, claimText and evidence are required.",
      });
    }

    // -------------------------
    // 2. Create claim
    // -------------------------

    const claim = await Claim.create({
      productName,
      claimText,
      claimType,
      scientist: "Paris R&I",
      status: "EVALUATION",
    });

    // -------------------------
    // 3. Ask LLM
    // -------------------------

    const aiAssessment = await assessClaimWithAI({
      productName,
      claimText,
      evidence,
    });
console.log("This is aisesssment",aiAssessment);
    // -------------------------
    // 4. Save assessment
    // -------------------------

    // const assessment = await Assessment.create({
    //   claim: claim._id,

    //   evidence,

    //   justified: aiAssessment.justified,

    //   confidenceScore:
    //     aiAssessment.confidenceScore,

    //   reasoning:
    //     aiAssessment.reasoning,

    //   limitations:
    //     aiAssessment.limitations,

    //   model: "gpt-5.6-terra",

    //   assessedBy: "AI",
    // });
     const assessment = await Assessment.create({
      claim: claim._id,

      evidence,

      justified: aiAssessment.assessment.justified,

      confidenceScore:
        aiAssessment.assessment.confidenceScore,

      reasoning:
        aiAssessment.assessment.reasoning,

      limitations:
        aiAssessment.assessment.limitations,

      model: "gpt-5.6-terra",

      assessedBy: "AI",
    });


    // -------------------------
    // 5. Update workflow
    // -------------------------

    claim.status = "ASSESSED";

    await claim.save();

    // -------------------------
    // 6. Return to React
    // -------------------------

    return res.status(201).json({
      success: true,

      claim: {
        id: claim._id,
        productName: claim.productName,
        claimText: claim.claimText,
        status: claim.status,
      },

      assessment: {
        id: assessment._id,
        justified: assessment.justified,
        confidenceScore:
          assessment.confidenceScore,
        reasoning: assessment.reasoning,
        limitations: assessment.limitations,
        humanReview:
          assessment.humanReview.status,
      },
      


    });
  } catch (error) {
    console.error("Claim assessment error:", error);
    console.log("you are stupid");

    return res.status(500).json({
      success: false,
      // message: error.message || "Unable to assess claim.",
         message: "Unable to assess claim.",
      // error:
      //   process.env.NODE_ENV === "development"
      //     ? error.message
      //     : undefined,
    });
    
  }
};
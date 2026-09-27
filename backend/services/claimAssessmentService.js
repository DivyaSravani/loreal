import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function assessClaimWithAI({
  productName,
  claimText,
  evidence,
}) {
//   const response = await openai.responses.create({
//     model: "gpt-5.6-terra",

//     instructions: `
// You are a scientific claims assessment assistant for a cosmetics
// research and innovation organisation.

// Your job is to assess whether the supplied study evidence supports
// the exact claim being proposed.

// Evaluate:

// 1. Whether the measured endpoint matches the claim.
// 2. Whether the numerical result supports the claimed magnitude.
// 3. Whether the study duration supports the claimed duration.
// 4. Whether the studied population is relevant.
// 5. Whether a comparator/control exists where relevant.
// 6. Whether statistical evidence is adequate when supplied.
// 7. Whether the wording is stronger than the evidence.
// 8. Any important scientific limitations.

// Do not invent missing evidence.

// A high confidence score means the provided evidence clearly allows
// you to determine whether the claim is supported.

// Return only the requested structured result.
// `,

//     input: `
// PRODUCT:
// ${productName}

// PROPOSED CLAIM:
// ${claimText}

// STUDY / CLINICAL EVIDENCE:
// ${evidence}
// `,

//     text: {
//       format: {
//         type: "json_schema",
//         name: "claim_assessment",
//         strict: true,

//         schema: {
//           type: "object",

//           properties: {
//             justified: {
//               type: "boolean",
//             },

//             confidenceScore: {
//               type: "number",
//               minimum: 0,
//               maximum: 100,
//             },

//             reasoning: {
//               type: "string",
//             },

//             limitations: {
//               type: "array",
//               items: {
//                 type: "string",
//               },
//             },
//           },

//           required: [
//             "justified",
//             "confidenceScore",
//             "reasoning",
//             "limitations",
//           ],

//           additionalProperties: false,
//         },
//       },
//     },
//   });

//   return JSON.parse(response.output_text);
const response = {
  "success": true,
  "claim": {
    "id": "68d7abc123",
    "productName": "Revitalift Clinical Serum",
    "claimText": "Reduces wrinkles by 20% in 4 weeks",
    "status": "ASSESSED"
  },
  "assessment": {
    "id": "68d7def456",
    "justified": true,
    "confidenceScore": 94,
    "reasoning": "The reported clinical outcome directly measures wrinkle reduction and exceeds the claimed 20% reduction after the specified four-week period.",
    "limitations": [
      "Long-term effectiveness beyond four weeks was not evaluated."
    ],
    "humanReview": "PENDING"
  }
}
return response; 
}
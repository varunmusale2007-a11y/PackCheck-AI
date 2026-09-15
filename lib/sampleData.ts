import { SamplePreset } from "./types";

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: "sample-1",
    product_name: "Aashirvaad Superior MP Atta (5 kg)",
    category: "Food & FMCG",
    image_filename: "aashirvaad_atta_5kg.jpg",
    ocr_confidence: 98.4,
    expected_score: 100,
    text: `AASHIRVAAD SUPERIOR MP ATTA (Whole Wheat Flour)
Net Quantity: 5 kg
MRP ₹ 245.00 (Inclusive of all taxes)
Unit Sale Price: ₹ 49.00 / kg
Date of Mfg: 12/2024
Best Before 6 months from packaging
Batch No: ASH2024B12
Manufactured by: ITC Limited, 37 J.L. Nehru Road, Kolkata, West Bengal - 700071
fssai Lic. No. 10012031000012
Country of Origin: India
Consumer Care Cell: For feedback contact ITC Executive at 1800-425-4444 or email itccares@itc.in or post at ITC Infotech Park, Bengaluru 560005`
  },
  {
    id: "sample-2",
    product_name: "Britannia Good Day Butter Cookies",
    category: "Food & FMCG",
    image_filename: "britannia_good_day.jpg",
    ocr_confidence: 97.2,
    expected_score: 100,
    text: `BRITANNIA GOOD DAY BUTTER COOKIES
Net Content: 120 g
MRP: Rs 30.00 (incl. of all taxes)
USP: Rs 0.25/g
Packed On: 10/2024
Best Before 9 Months from date of packaging
Batch No: BNT-GD-994
Mfg by: Britannia Industries Ltd., 5/1A Hungerford Street, Kolkata - 700017
fssai Lic. No. 10015043001129
Made in India
For queries, contact Customer Service Officer: Toll Free 1800-425-4449 / feedback@britindia.com`
  },
  {
    id: "sample-3",
    product_name: "Dabur 100% Pure Honey (500 g)",
    category: "Food & FMCG",
    image_filename: "dabur_honey_500g.jpg",
    ocr_confidence: 96.8,
    expected_score: 100,
    text: `DABUR 100% PURE HONEY
Net Quantity: 500 g
MRP ₹ 199.00 (Inclusive of all taxes)
MFG Date: 11/2024
Best Before 24 Months from Mfg Date
Batch No: DBH-2024-88
Manufactured By: Dabur India Ltd., 8/3 Asaf Ali Road, New Delhi - 110002
fssai Lic No: 10014011001923
Country of Origin: India
Customer Care: Call 1800-103-1644 / Email: daburcares@dabur.com / Write to Dabur Consumer Care, New Delhi - 110002`
  },
  {
    id: "sample-4",
    product_name: "Samsung 25W Fast Type-C Charger",
    category: "Electronics",
    image_filename: "samsung_adapter_25w.jpg",
    ocr_confidence: 95.1,
    expected_score: 91,
    text: `SAMSUNG 25W POWER ADAPTER (Type-C)
Generic Name: Power Adapter / Battery Charger
Net Quantity: 1 Unit
MRP: ₹ 1,299.00 (Inclusive of all taxes)
Month & Year of Import: 01/2025
Country of Origin: Vietnam
Imported & Marketed by: Samsung India Electronics Pvt. Ltd., 6th Floor, DLF Centre, Sansad Marg, New Delhi - 110001
Consumer Care: 1800-40-7267864 / support.india@samsung.com / Head - Customer Service, Samsung India Electronics, New Delhi 110001
Model / Batch Code: EP-TA800NBEGIN / SN: R37MC019293`
  },
  {
    id: "sample-5",
    product_name: "Non-Compliant Mango Crunch (Sample Violations)",
    category: "Food & FMCG",
    image_filename: "non_compliant_snack.jpg",
    ocr_confidence: 84.5,
    expected_score: 36,
    text: `DELICIOUS MANGO CRUNCH BISCUITS
Weight: 100
Price: 20
MFG: 2024
Packed by Sunshine Foods
Batch 101`
  }
];
